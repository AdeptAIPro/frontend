# Payroll System Backend

This is the backend service for the payroll system, built with Node.js and Express, and integrated with AWS services.

## Features

- Organization Management
- Employee Management
- Payroll Processing
- Tax Calculations
- Form Processing (W-4, I-9, W-2, 1099)
- Report Generation
- AI-powered Chatbot and Form Processing
- Compliance Checking
- Payroll Automation Suggestions

## Prerequisites

- Node.js (v14 or higher)
- AWS Account with appropriate permissions
- AWS CLI configured with credentials

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # AWS Configuration
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key

   # AWS Services
   S3_BUCKET_NAME=your-payroll-bucket
   DYNAMODB_TABLE_PREFIX=payroll_

   # Authentication
   JWT_SECRET=your_jwt_secret
   COGNITO_USER_POOL_ID=your_user_pool_id
   COGNITO_CLIENT_ID=your_client_id

   # External APIs
   TAX_API_KEY=your_tax_api_key
   TAX_API_URL=https://api.taxservice.com/v1

   # AI Configuration
   BEDROCK_MODEL_ID=anthropic.claude-v2
   BEDROCK_MAX_TOKENS=1000
   BEDROCK_TEMPERATURE=0.7
   ```

4. Create the required AWS resources:
   - DynamoDB tables
   - S3 bucket
   - Cognito user pool
   - IAM roles and policies

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Organizations
- `POST /api/orgs` - Create organization
- `GET /api/orgs/:orgId` - Get organization by ID
- `PUT /api/orgs/:orgId` - Update organization
- `DELETE /api/orgs/:orgId` - Delete organization
- `GET /api/orgs` - List all organizations

### Employees
- `POST /api/employees` - Create employee
- `GET /api/employees/:employeeId` - Get employee by ID
- `PUT /api/employees/:employeeId` - Update employee
- `POST /api/employees/:employeeId/forms` - Upload employee form
- `GET /api/employees/org/:orgId` - List employees by organization

### Payroll
- `POST /api/payroll/run` - Run payroll cycle
- `GET /api/payroll/:payrollId` - Get payroll by ID
- `GET /api/payroll/org/:orgId` - List payroll cycles by organization

### Tax
- `POST /api/tax/calculate` - Calculate taxes
- `GET /api/tax/forms/:employeeId` - Get tax forms for employee

### Forms
- `POST /api/forms/upload` - Upload and process form
- `GET /api/forms/:formId` - Get form by ID
- `GET /api/forms/employee/:employeeId` - List forms for employee
- `GET /api/forms/template/:formType` - Generate form template

### Reports
- `POST /api/reports/payroll` - Generate payroll report
- `POST /api/reports/tax` - Generate tax report

### AI
- `POST /api/ai/chat` - Chatbot endpoint
- `POST /api/ai/process-form` - Form processing
- `POST /api/ai/compliance-check` - Tax compliance check
- `POST /api/ai/automation-suggestions` - Payroll automation suggestions

## AWS Services Used

- DynamoDB - Data storage
- S3 - File storage
- Cognito - User authentication
- Textract - Form processing
- Bedrock - AI/ML capabilities
- Step Functions - Workflow automation
- EventBridge - Event scheduling
- SNS - Notifications

## Security

- JWT-based authentication
- AWS Cognito for user management
- Role-based access control
- Data encryption at rest and in transit
- Input validation and sanitization

## Error Handling

The API uses a consistent error response format:
```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

## Testing

Run tests:
```bash
npm test
```

## Deployment

The application can be deployed to AWS using:
- AWS Elastic Beanstalk
- AWS ECS
- AWS Lambda (serverless)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 