const express = require('express');
const router = express.Router();
const { bedrock } = require('../index');
const { InvokeModelCommand } = require('@aws-sdk/client-bedrock');

// Chatbot endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, context } = req.body;

    // Construct the prompt for the AI model
    const prompt = `You are a helpful payroll assistant. Use the following context to answer the user's question:
    ${JSON.stringify(context)}
    
    User question: ${message}
    
    Please provide a clear and accurate response.`;

    // Call Bedrock API
    const result = await bedrock.send(new InvokeModelCommand({
      modelId: 'anthropic.claude-v2',
      body: JSON.stringify({
        prompt,
        max_tokens_to_sample: 1000,
        temperature: 0.7,
        top_p: 0.9
      })
    }));

    const response = JSON.parse(result.body);
    res.json({ response: response.completion });
  } catch (error) {
    console.error('Error in chatbot:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Form processing endpoint
router.post('/process-form', async (req, res) => {
  try {
    const { formType, formData } = req.body;

    // Construct the prompt for form processing
    const prompt = `Process the following ${formType} form data and extract the relevant information:
    ${JSON.stringify(formData)}
    
    Return the extracted data in JSON format with the following structure:
    {
      "formType": "${formType}",
      "extractedFields": {
        // Form-specific fields
      },
      "validation": {
        "isValid": boolean,
        "errors": []
      }
    }`;

    // Call Bedrock API
    const result = await bedrock.send(new InvokeModelCommand({
      modelId: 'anthropic.claude-v2',
      body: JSON.stringify({
        prompt,
        max_tokens_to_sample: 1000,
        temperature: 0.3
      })
    }));

    const processedForm = JSON.parse(result.body);
    res.json(processedForm);
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ error: 'Failed to process form' });
  }
});

// Tax compliance check
router.post('/compliance-check', async (req, res) => {
  try {
    const { employeeData, payrollData } = req.body;

    // Construct the prompt for compliance check
    const prompt = `Analyze the following employee and payroll data for tax compliance:
    Employee Data: ${JSON.stringify(employeeData)}
    Payroll Data: ${JSON.stringify(payrollData)}
    
    Check for:
    1. Proper tax withholding
    2. Correct employee classification
    3. Benefits compliance
    4. Record-keeping requirements
    
    Return the analysis in JSON format with the following structure:
    {
      "complianceStatus": "compliant" | "warning" | "non-compliant",
      "issues": [
        {
          "type": string,
          "severity": "low" | "medium" | "high",
          "description": string,
          "recommendation": string
        }
      ],
      "recommendations": []
    }`;

    // Call Bedrock API
    const result = await bedrock.send(new InvokeModelCommand({
      modelId: 'anthropic.claude-v2',
      body: JSON.stringify({
        prompt,
        max_tokens_to_sample: 1000,
        temperature: 0.3
      })
    }));

    const complianceCheck = JSON.parse(result.body);
    res.json(complianceCheck);
  } catch (error) {
    console.error('Error performing compliance check:', error);
    res.status(500).json({ error: 'Failed to perform compliance check' });
  }
});

// Payroll automation suggestions
router.post('/automation-suggestions', async (req, res) => {
  try {
    const { payrollProcess, currentAutomation } = req.body;

    // Construct the prompt for automation suggestions
    const prompt = `Analyze the following payroll process and current automation:
    Payroll Process: ${JSON.stringify(payrollProcess)}
    Current Automation: ${JSON.stringify(currentAutomation)}
    
    Suggest improvements for automation, considering:
    1. AWS Step Functions
    2. EventBridge scheduling
    3. Lambda functions
    4. SNS notifications
    
    Return the suggestions in JSON format with the following structure:
    {
      "suggestions": [
        {
          "area": string,
          "currentProcess": string,
          "suggestedAutomation": string,
          "awsServices": string[],
          "benefits": string[],
          "implementationComplexity": "low" | "medium" | "high"
        }
      ],
      "estimatedTimeSavings": string,
      "implementationPriority": "low" | "medium" | "high"
    }`;

    // Call Bedrock API
    const result = await bedrock.send(new InvokeModelCommand({
      modelId: 'anthropic.claude-v2',
      body: JSON.stringify({
        prompt,
        max_tokens_to_sample: 1000,
        temperature: 0.3
      })
    }));

    const suggestions = JSON.parse(result.body);
    res.json(suggestions);
  } catch (error) {
    console.error('Error generating automation suggestions:', error);
    res.status(500).json({ error: 'Failed to generate automation suggestions' });
  }
});

module.exports = router; 