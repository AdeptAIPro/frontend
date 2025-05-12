/**
 * Logs an audit event to CloudWatch Logs (stdout).
 * @param {object} params - Audit log parameters.
 */
function logAuditEvent(params) {
  // Add timestamp and log event
  console.log(JSON.stringify({
    ...params,
    timestamp: new Date().toISOString()
  }));
}

module.exports = { logAuditEvent }; 