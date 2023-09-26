const Agent = require('../models/agentModel');

class AgentController {
  async getAgent(req, res) {
    try {
      const allAgents = await Agent.getAllAgent();
      res.json(allAgents);
    } catch (error) {
      console.error('Error retrieving agent data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  // Filter Function
  async getAgentsByCountryAndStatus(req, res) {
    try {
      const { country } = req.query;
      const { status } = req.query;
      
      const agents = await Agent.getAgentsByCountryAndStatus(country, status);
      
      res.json({ agents });
    } catch (error) {
      console.error('Error retrieving agents:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = AgentController;
