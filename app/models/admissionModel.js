const db = require('../config/database');

class Admission {
  static async createAdmission(data) {
  try {
    const connection = await db.getConnection();
    const query = 'INSERT INTO addmision (name, image) VALUES (?, ?)';
    // const imagePath = data.image.replace('public/uploads/', ''); // Modify the image path
    const imagePath = data.image.replace('public\\', ''); // Modify the image path

    const values = [data.name, imagePath];

    const [result] = await connection.query(query, values);
    connection.release();

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

  static async getAllAdmissions() {
    try {
      const [rows] = await db.query('SELECT * FROM addmision');
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        // image: `/uploads/${row.image.replace(/\\/g, '/')}`, // Replace backslashes with forward slashes
        image: `/${row.image.replace(/\\/g, '/')}`, // Remove the additional '/uploads' segment

      }));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Admission;
