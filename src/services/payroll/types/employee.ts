export enum EmploymentType {
    FULL_TIME = 'full_time',
    PART_TIME = 'part_time',
    CONTRACTOR = 'contractor'
}

export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    hire_date: string;
    employment_type: EmploymentType;
    base_salary: number;
    is_active: boolean;
    tax_id?: string;
    tax_filing_status?: string;
    bank_name?: string;
    bank_account_number?: string;
    bank_routing_number?: string;
}

export interface EmployeeCreate {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    hire_date: string;
    employment_type: EmploymentType;
    base_salary: number;
    tax_id?: string;
    tax_filing_status?: string;
    bank_name?: string;
    bank_account_number?: string;
    bank_routing_number?: string;
}

export interface EmployeeUpdate {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    employment_type?: EmploymentType;
    base_salary?: number;
    tax_id?: string;
    tax_filing_status?: string;
    bank_name?: string;
    bank_account_number?: string;
    bank_routing_number?: string;
}

export interface EmployeeDocument {
    id: number;
    filename: string;
    document_url: string;
    uploaded_at: string;
} 