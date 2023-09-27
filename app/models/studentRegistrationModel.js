const db = require('../config/database');

class StudentRegistration { 
    static async postData (
        first_name,
        last_name,
        date_of_birth,
        email,
        phone_number,
        address,
        program,
        graduation_year
    ) {
        try {
            const connection = await db.getConnection();

            const query = `
                INSERT INTO students (
                    first_name,
                    last_name,
                    date_of_birth,
                    email,
                    phone_number,
                    address,
                    program,
                    graduation_year
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                first_name,
                last_name,
                date_of_birth,
                email,
                phone_number,
                address,
                program,
                graduation_year
            ];

            const [result] = await connection.query(query, values);
            connection.release();

            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = StudentRegistration;

