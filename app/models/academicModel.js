
const db = require('../config/database');

class academic {
    static async getacademic() {
        try {
            const connection = await db.getConnection();
            const [rows] = await connection.query('SELECT * FROM academic_record');
            connection.release();
            return rows;


        } catch (error) {
            throw error;
        }
    }

    static async create_data(data) {
        try {
            const connection = await db.getConnection();
            const query = 'INSERT INTO academic_record (class_name, subject_name, subject_marks_obtain, total_marks) VALUES (?, ?, ?, ?)';
            const values = [data.class_name, data.subject_name, data.subject_marks_obtain, data.total_marks];
            const [result] = await connection.query(query, values);
            connection.release();
            return { id: result.insertId, ...data };
        } catch (error) {
            throw error;
        }
    }

    static async update_data(id, data) {
        try {
            const connection = await db.getConnection();
            const query = 'UPDATE academic_record SET class_name = ?, subject_name = ?, subject_marks_obtain = ?, total_marks = ? WHERE score_id = ?';
            const values = [data.class_name, data.subject_name, data.subject_marks_obtain, data.total_marks, id];
            await connection.query(query, values);
            connection.release();
            return { id, ...data };
        } catch (error) {
            throw error;
        }
    }

    static async delete_data(id) {
        try {
            const connection = await db.getConnection();
            const query = 'DELETE FROM academic_record WHERE score_id = ?';
            await connection.query(query, [id]);
            connection.release();
        } catch (error) {
            throw error;
        }
    }
    static async subject_data (data) {
        // try {
        //     const connection = await db.getConnection;
        // console.log(data_record);
        // const query = 'INSERT INTO subject (sub_code, teacher_name) VALUES (?,?);';
        // const values = [data_record.sub_code,data_record.teacher_name];
    
        //  await connection.query(query, values);
        // connection.release();

        // } catch(error) {
        //     throw error;
        // }
        try {
            const connection = await db.getConnection();
            const query = 'INSERT INTO subject (sub_code, teacher_name) VALUES (?, ?)';
            const values = [data.sub_code, data.teacher_name];
            const [result] = await connection.query(query, values);
            connection.release();
            return { id: result.insertId, ...data };
        } catch (error) {
            throw error;
        }
    }
    // static async submit_subject(dataArray) {
    //     try {
    //         const connection = await db.getConnection();
            
    //         // Create an array to store the results of each insert
    //         const results = [];

    //         for (const data of dataArray) {
    //             const query = 'INSERT INTO subject (sub_code, teacher_name) VALUES (?, ?)';
    //             const values = [data.sub_code, data.teacher_name];
    //             const [result] = await connection.query(query, values);

    //             results.push({ id: result.insertId, ...data });
    //         }

    //         connection.release();
    //         return results;
    //     } catch (error) {
    //         throw error;
    //     }
    // }


    static async joint_data() {
        try {
            const connection = await db.getConnection();
            const [rows] = await connection.query('SELECT academic_record.class_id, academic_record.class_name, academic_record.subject_name,academic_record.subject_marks_obtain,academic_record.total_marks,academic_record.sub_code,academic_record.passing_year,subject.sub_id,subject.sub_code,subject.teacher_name FROM `academic_record` INNER JOIN subject on subject.sub_code= academic_record.sub_code');
            connection.release();
            return rows;

        } catch (error) {
            throw error;
        }
    }
    // where condition with parameter pass from user 
    // static async join_data(sub_code) {
    //     try {
    //         const connection = await db.getConnection();
    //         const query = `
    //             SELECT 
    //                 academic_record.class_id,
    //                 academic_record.class_name,
    //                 academic_record.subject_name,
    //                 academic_record.subject_marks_obtain,
    //                 academic_record.total_marks,
    //                 academic_record.sub_code,
    //                 academic_record.passing_year,
    //                 subject.sub_id,
    //                 subject.sub_code,
    //                 subject.teacher_name
    //             FROM 
    //                 academic_record
    //             INNER JOIN 
    //                 subject on subject.sub_code = academic_record.sub_code
    //             WHERE 
    //                 academic_record.sub_code = ?`;
            
    //         const [rows] = await connection.query(query, [sub_code]);
    //         connection.release();
    //         return rows;
    
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    static async insertData(data) {
        try {
            const connection = await db.getConnection();

            // Insert data into academic_record table
            const academicQuery = 'INSERT INTO academic_record (class_name, subject_name, subject_marks_obtain, total_marks, sub_code, passing_year) VALUES (?, ?, ?, ?, ?, ?)';
            const academicValues = [data.class_name, data.subject_name, data.subject_marks_obtain, data.total_marks, data.sub_code, data.passing_year];
            await connection.query(academicQuery, academicValues);

            // Insert data into subject table
            const subjectQuery = 'INSERT INTO subject (sub_code, teacher_name) VALUES (?, ?)';
            const subjectValues = [data.sub_code, data.teacher_name];
            await connection.query(subjectQuery, subjectValues);

            connection.release();
        } catch (error) {
            throw error;
        }
    }

}
module.exports=academic