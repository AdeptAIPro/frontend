import axios from 'axios';
import { API_BASE_URL } from '../config';

export interface W2Form {
  employee: {
    name: string;
    ssn: string;
    address: string;
  };
  employer: {
    name: string;
    ein: string;
    address: string;
  };
  wages: {
    federal_wages: number;
    social_security_wages: number;
    medicare_wages: number;
    state_wages: number;
  };
  taxes: {
    federal_income_tax: number;
    social_security_tax: number;
    medicare_tax: number;
    state_income_tax: number;
  };
}

export interface Form941 {
  quarter: number;
  tax_year: number;
  wages: {
    total_wages: number;
    federal_income_tax_withheld: number;
    social_security_tax: number;
    medicare_tax: number;
  };
  deposits: {
    total_deposits: number;
  };
}

export interface I9Document {
  document_id: number;
  verification_status: string;
  extracted_data: {
    document_type: string;
    document_number: string;
    expiration_date: string;
    issuing_country: string;
  };
}

export interface TaxForm {
  id: number;
  form_type: string;
  tax_year: number;
  quarter?: number;
  status: string;
  filing_date?: string;
  due_date: string;
  form_data: any;
  employee_id: number;
  created_at: string;
  updated_at: string;
}

export interface ComplianceDocument {
  id: number;
  document_type: string;
  document_url: string;
  verification_status: string;
  verification_date: string;
  expiration_date?: string;
  employee_id: number;
  created_at: string;
  updated_at: string;
}

export interface TaxFiling {
  id: number;
  form_type: string;
  tax_year: number;
  quarter?: number;
  status: string;
  filing_date?: string;
  due_date: string;
  total_amount: number;
  payment_status: string;
  form_data: any;
  created_at: string;
  updated_at: string;
}

class ComplianceService {
  private baseUrl = `${API_BASE_URL}/compliance`;

  async generateW2(employeeId: number, taxYear: number): Promise<W2Form> {
    try {
      const response = await axios.post(`${this.baseUrl}/w2/${employeeId}/${taxYear}`);
      return response.data;
    } catch (error) {
      console.error('Error generating W-2:', error);
      throw error;
    }
  }

  async generateForm941(quarter: number, taxYear: number): Promise<Form941> {
    try {
      const response = await axios.post(`${this.baseUrl}/form-941/${quarter}/${taxYear}`);
      return response.data;
    } catch (error) {
      console.error('Error generating Form 941:', error);
      throw error;
    }
  }

  async processI9Document(
    employeeId: number,
    documentType: string,
    document: File
  ): Promise<I9Document> {
    try {
      const formData = new FormData();
      formData.append('document', document);
      formData.append('document_type', documentType);

      const response = await axios.post(
        `${this.baseUrl}/i9/${employeeId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error processing I-9 document:', error);
      throw error;
    }
  }

  async getEmployeeTaxForms(employeeId: number): Promise<TaxForm[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/tax-forms/${employeeId}`);
      return response.data.forms;
    } catch (error) {
      console.error('Error fetching employee tax forms:', error);
      throw error;
    }
  }

  async getEmployeeComplianceDocuments(
    employeeId: number
  ): Promise<ComplianceDocument[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/compliance-documents/${employeeId}`
      );
      return response.data.documents;
    } catch (error) {
      console.error('Error fetching employee compliance documents:', error);
      throw error;
    }
  }

  async getTaxFilings(
    taxYear?: number,
    quarter?: number
  ): Promise<TaxFiling[]> {
    try {
      const params = new URLSearchParams();
      if (taxYear) params.append('tax_year', taxYear.toString());
      if (quarter) params.append('quarter', quarter.toString());

      const response = await axios.get(`${this.baseUrl}/tax-filings`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tax filings:', error);
      throw error;
    }
  }
}

export const complianceService = new ComplianceService(); 