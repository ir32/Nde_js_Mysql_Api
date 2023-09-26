const db = require('../config/database');

class Agent {
  static async getAllAgent() {
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.query('SELECT * FROM agents');
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getAgentsByCountryAndStatus(country, status) {
    try {
      const connection = await db.getConnection();
      const query = 'SELECT * FROM agents WHERE COUNTRY = ? AND Status = ?';
      const values = [country, status];
      
      // Check a running query 
      // http://localhost:3000/agents?country=IND&status=1
      //console.log('Executing query:', query, values);
      
      const [rows] = await connection.query(query, values);
      connection.release();
      
      return rows;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = Agent;

/* ------------------------------------------ To Check a Query --------------------------------------------------------------*/

// class Agent {
//   static async getAllAgent() {
//     try {
//       const connection = await db.getConnection();
//       const query = 'SELECT * FROM agents';
      
//       console.log('Executing query:', query);
      
//       const [rows] = await connection.query(query);
//       connection.release();
      
//       return rows;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
 
