const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const talentsRouter = require('./talents');
const resumeRouter = require('./resume');
const openaiRouter = require('./openai');
const atsRouter = require('./ats');
const taxRouter = require('./tax');

// In-memory mock DB for demonstration (replace with DynamoDB or other DB logic)
let agents = [];

const app = express();
app.use(cors());
app.use(express.json());

// GET all agents
app.get('/api/agents', (req, res) => {
  res.json(agents);
});

// GET agent by ID
app.get('/api/agents/:id', (req, res) => {
  const agent = agents.find(a => a.id === req.params.id);
  if (!agent) return res.status(404).json({ error: 'Agent not found' });
  res.json(agent);
});

// CREATE agent
app.post('/api/agents', (req, res) => {
  const { name, ...rest } = req.body;
  const newAgent = {
    id: uuidv4(),
    name,
    createdAt: new Date().toISOString(),
    ...rest
  };
  agents.push(newAgent);
  res.status(201).json(newAgent);
});

// UPDATE agent
app.put('/api/agents/:id', (req, res) => {
  const idx = agents.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Agent not found' });
  agents[idx] = { ...agents[idx], ...req.body };
  res.json(agents[idx]);
});

// DELETE agent
app.delete('/api/agents/:id', (req, res) => {
  const idx = agents.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Agent not found' });
  agents.splice(idx, 1);
  res.json({ success: true });
});

app.use('/api/talents', talentsRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/openai', openaiRouter);
app.use('/api/ats', atsRouter);
app.use('/api/tax', taxRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
}); 