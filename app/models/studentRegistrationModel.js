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
    static async allstudent(){
        var connection = await db.getConnection();
        var data= await connection.query('Select * from students');
        connection.release();
        return data;
    }

    static async datadelete(data) {
        console.log(data);
        var conn = await db.getConnection();

        var query = `DELETE FROM students WHERE student_id = ${data}`;

        try {
        var result = await conn.query(query);
        conn.release();
        
        if (result.affectedRows === 1) {
            return { message: 'Data deleted successfully' };
        } else {
            return { message: 'Data deleted' };
        }
        } catch (error) {
        console.error(error);
        throw error;
        }

    }
      
}

module.exports = StudentRegistration;

