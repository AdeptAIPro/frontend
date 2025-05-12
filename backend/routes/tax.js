const express = require('express');
const router = express.Router();
const { dynamoDB } = require('../index');
const { PutItemCommand, GetItemCommand, UpdateItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const axios = require('axios');

// Calculate taxes for an employee
router.post('/calculate', async (req, res) => {
  try {
    const { employeeId, grossPay, payPeriod } = req.body;

    // Get employee details
    const employeeParams = {
      TableName: 'Employees',
      Key: marshall({ employeeId })
    };

    const employeeResult = await dynamoDB.send(new GetItemCommand(employeeParams));
    if (!employeeResult.Item) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const employee = unmarshall(employeeResult.Item);

    // Calculate federal taxes
    const federalTax = await calculateFederalTax(grossPay, employee.taxInfo);

    // Calculate state taxes
    const stateTax = await calculateStateTax(grossPay, employee.taxInfo);

    // Calculate FICA taxes
    const ficaTax = calculateFICATax(grossPay);

    // Calculate local taxes if applicable
    const localTax = await calculateLocalTax(grossPay, employee.taxInfo);

    const totalTax = federalTax + stateTax + ficaTax + localTax;

    res.json({
      federalTax,
      stateTax,
      ficaTax,
      localTax,
      totalTax,
      netPay: grossPay - totalTax
    });
  } catch (error) {
    console.error('Error calculating taxes:', error);
    res.status(500).json({ error: 'Failed to calculate taxes' });
  }
});

// Get tax forms for an employee
router.get('/forms/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { year } = req.query;

    // Get employee details
    const employeeParams = {
      TableName: 'Employees',
      Key: marshall({ employeeId })
    };

    const employeeResult = await dynamoDB.send(new GetItemCommand(employeeParams));
    if (!employeeResult.Item) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const employee = unmarshall(employeeResult.Item);

    // Generate W-2 form
    const w2Form = await generateW2Form(employee, year);

    // Generate 1099 form if applicable
    let form1099 = null;
    if (employee.employeeType === 'contractor') {
      form1099 = await generate1099Form(employee, year);
    }

    res.json({
      w2: w2Form,
      form1099
    });
  } catch (error) {
    console.error('Error generating tax forms:', error);
    res.status(500).json({ error: 'Failed to generate tax forms' });
  }
});

// Helper functions
async function calculateFederalTax(grossPay, taxInfo) {
  // In a real system, you would:
  // 1. Use the IRS tax tables or API
  // 2. Consider filing status, allowances, etc.
  // 3. Apply the appropriate tax brackets
  return grossPay * 0.22; // Example rate
}

async function calculateStateTax(grossPay, taxInfo) {
  // In a real system, you would:
  // 1. Use state-specific tax tables or API
  // 2. Consider state-specific deductions
  // 3. Handle multiple states if applicable
  return grossPay * 0.05; // Example rate
}

function calculateFICATax(grossPay) {
  // Social Security (6.2%) and Medicare (1.45%)
  const socialSecurity = grossPay * 0.062;
  const medicare = grossPay * 0.0145;
  return socialSecurity + medicare;
}

async function calculateLocalTax(grossPay, taxInfo) {
  // In a real system, you would:
  // 1. Use local tax tables or API
  // 2. Consider local-specific deductions
  // 3. Handle multiple localities if applicable
  return grossPay * 0.02; // Example rate
}

async function generateW2Form(employee, year) {
  // In a real system, you would:
  // 1. Use a PDF generation library
  // 2. Format according to IRS specifications
  // 3. Include all required fields
  return {
    employeeId: employee.employeeId,
    year,
    wages: employee.salary,
    federalIncomeTax: employee.salary * 0.22,
    socialSecurityWages: employee.salary,
    socialSecurityTax: employee.salary * 0.062,
    medicareWages: employee.salary,
    medicareTax: employee.salary * 0.0145
  };
}

async function generate1099Form(employee, year) {
  // In a real system, you would:
  // 1. Use a PDF generation library
  // 2. Format according to IRS specifications
  // 3. Include all required fields
  return {
    employeeId: employee.employeeId,
    year,
    compensation: employee.salary,
    federalIncomeTax: employee.salary * 0.22
  };
}

module.exports = router; 