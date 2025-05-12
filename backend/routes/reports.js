const express = require('express');
const router = express.Router();
const { dynamoDB, s3 } = require('../index');
const { ScanCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const { PDFDocument } = require('pdf-lib');
const ExcelJS = require('exceljs');

// Generate payroll report
router.post('/payroll', async (req, res) => {
  try {
    const { orgId, startDate, endDate, format = 'pdf' } = req.body;

    // Get payroll data
    const params = {
      TableName: 'Payroll',
      FilterExpression: 'orgId = :orgId AND startDate BETWEEN :startDate AND :endDate',
      ExpressionAttributeValues: marshall({
        ':orgId': orgId,
        ':startDate': startDate,
        ':endDate': endDate
      })
    };

    const result = await dynamoDB.send(new ScanCommand(params));
    const payrolls = result.Items.map(item => unmarshall(item));

    if (format === 'pdf') {
      const pdfDoc = await generatePayrollPDF(payrolls);
      const pdfBytes = await pdfDoc.save();

      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=payroll-report-${startDate}-to-${endDate}.pdf`);
      res.send(pdfBytes);
    } else if (format === 'excel') {
      const workbook = await generatePayrollExcel(payrolls);
      const buffer = await workbook.xlsx.writeBuffer();

      // Set response headers
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=payroll-report-${startDate}-to-${endDate}.xlsx`);
      res.send(buffer);
    } else {
      res.status(400).json({ error: 'Unsupported format' });
    }
  } catch (error) {
    console.error('Error generating payroll report:', error);
    res.status(500).json({ error: 'Failed to generate payroll report' });
  }
});

// Generate tax report
router.post('/tax', async (req, res) => {
  try {
    const { orgId, year, format = 'pdf' } = req.body;

    // Get tax data
    const params = {
      TableName: 'Payroll',
      FilterExpression: 'orgId = :orgId AND startDate BETWEEN :startDate AND :endDate',
      ExpressionAttributeValues: marshall({
        ':orgId': orgId,
        ':startDate': `${year}-01-01`,
        ':endDate': `${year}-12-31`
      })
    };

    const result = await dynamoDB.send(new ScanCommand(params));
    const payrolls = result.Items.map(item => unmarshall(item));

    if (format === 'pdf') {
      const pdfDoc = await generateTaxPDF(payrolls, year);
      const pdfBytes = await pdfDoc.save();

      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=tax-report-${year}.pdf`);
      res.send(pdfBytes);
    } else if (format === 'excel') {
      const workbook = await generateTaxExcel(payrolls, year);
      const buffer = await workbook.xlsx.writeBuffer();

      // Set response headers
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=tax-report-${year}.xlsx`);
      res.send(buffer);
    } else {
      res.status(400).json({ error: 'Unsupported format' });
    }
  } catch (error) {
    console.error('Error generating tax report:', error);
    res.status(500).json({ error: 'Failed to generate tax report' });
  }
});

// Helper functions
async function generatePayrollPDF(payrolls) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 12;
  const lineHeight = 20;
  let y = height - 50;

  // Add report header
  page.drawText('Payroll Report', {
    x: 50,
    y,
    size: fontSize + 4
  });
  y -= lineHeight * 2;

  // Add payroll data
  payrolls.forEach(payroll => {
    page.drawText(`Payroll Period: ${payroll.startDate} to ${payroll.endDate}`, {
      x: 50,
      y,
      size: fontSize
    });
    y -= lineHeight;

    page.drawText(`Total Gross Pay: $${payroll.totalGrossPay.toFixed(2)}`, {
      x: 50,
      y,
      size: fontSize
    });
    y -= lineHeight;

    page.drawText(`Total Deductions: $${payroll.totalDeductions.toFixed(2)}`, {
      x: 50,
      y,
      size: fontSize
    });
    y -= lineHeight;

    page.drawText(`Total Net Pay: $${payroll.totalNetPay.toFixed(2)}`, {
      x: 50,
      y,
      size: fontSize
    });
    y -= lineHeight * 2;
  });

  return pdfDoc;
}

async function generatePayrollExcel(payrolls) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Payroll Report');

  // Add headers
  worksheet.columns = [
    { header: 'Payroll Period', key: 'period' },
    { header: 'Total Gross Pay', key: 'grossPay' },
    { header: 'Total Deductions', key: 'deductions' },
    { header: 'Total Net Pay', key: 'netPay' }
  ];

  // Add data
  payrolls.forEach(payroll => {
    worksheet.addRow({
      period: `${payroll.startDate} to ${payroll.endDate}`,
      grossPay: payroll.totalGrossPay,
      deductions: payroll.totalDeductions,
      netPay: payroll.totalNetPay
    });
  });

  return workbook;
}

async function generateTaxPDF(payrolls, year) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 12;
  const lineHeight = 20;
  let y = height - 50;

  // Add report header
  page.drawText(`Tax Report - ${year}`, {
    x: 50,
    y,
    size: fontSize + 4
  });
  y -= lineHeight * 2;

  // Add tax data
  const taxSummary = calculateTaxSummary(payrolls);

  page.drawText('Federal Taxes:', {
    x: 50,
    y,
    size: fontSize
  });
  y -= lineHeight;

  page.drawText(`Total Withheld: $${taxSummary.federalTax.toFixed(2)}`, {
    x: 70,
    y,
    size: fontSize
  });
  y -= lineHeight;

  page.drawText('State Taxes:', {
    x: 50,
    y,
    size: fontSize
  });
  y -= lineHeight;

  page.drawText(`Total Withheld: $${taxSummary.stateTax.toFixed(2)}`, {
    x: 70,
    y,
    size: fontSize
  });
  y -= lineHeight;

  page.drawText('FICA Taxes:', {
    x: 50,
    y,
    size: fontSize
  });
  y -= lineHeight;

  page.drawText(`Social Security: $${taxSummary.socialSecurity.toFixed(2)}`, {
    x: 70,
    y,
    size: fontSize
  });
  y -= lineHeight;

  page.drawText(`Medicare: $${taxSummary.medicare.toFixed(2)}`, {
    x: 70,
    y,
    size: fontSize
  });
  y -= lineHeight;

  page.drawText(`Total FICA: $${taxSummary.totalFICA.toFixed(2)}`, {
    x: 70,
    y,
    size: fontSize
  });
  y -= lineHeight * 2;

  return pdfDoc;
}

async function generateTaxExcel(payrolls, year) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Tax Report');

  // Add headers
  worksheet.columns = [
    { header: 'Tax Type', key: 'type' },
    { header: 'Amount', key: 'amount' }
  ];

  // Add data
  const taxSummary = calculateTaxSummary(payrolls);

  worksheet.addRow({ type: 'Federal Taxes', amount: taxSummary.federalTax });
  worksheet.addRow({ type: 'State Taxes', amount: taxSummary.stateTax });
  worksheet.addRow({ type: 'Social Security', amount: taxSummary.socialSecurity });
  worksheet.addRow({ type: 'Medicare', amount: taxSummary.medicare });
  worksheet.addRow({ type: 'Total FICA', amount: taxSummary.totalFICA });

  return workbook;
}

function calculateTaxSummary(payrolls) {
  let federalTax = 0;
  let stateTax = 0;
  let socialSecurity = 0;
  let medicare = 0;

  payrolls.forEach(payroll => {
    payroll.items.forEach(item => {
      federalTax += item.deductions.federalTax;
      stateTax += item.deductions.stateTax;
      socialSecurity += item.deductions.socialSecurity;
      medicare += item.deductions.medicare;
    });
  });

  return {
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    totalFICA: socialSecurity + medicare
  };
}

module.exports = router; 