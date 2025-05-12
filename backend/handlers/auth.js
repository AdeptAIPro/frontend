const jwt = require('jsonwebtoken');

/**
 * Extracts tenantId, userId, and userRole from a JWT in the Authorization header.
 * @param {object} event - Lambda event object (API Gateway proxy event)
 * @returns {object} { tenantId, userId, userRole }
 */
function getAuthContext(event) {
  // Get the Authorization header
  const authHeader = event.headers?.Authorization || event.headers?.authorization;
  if (!authHeader) throw new Error('Missing Authorization header');
  const token = authHeader.replace('Bearer ', '');
  // Decode JWT (do not verify signature here for demo; in production, verify!)
  const decoded = jwt.decode(token);
  // Extract claims (customize claim names as needed)
  return {
    tenantId: decoded['tenantId'] || decoded['custom:tenantId'],
    userId: decoded['sub'],
    userRole: decoded['role'] || decoded['custom:role']
  };
}

module.exports = { getAuthContext }; 