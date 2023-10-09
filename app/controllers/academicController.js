const academic = require('../models/academicModel');

class academicController {
    async getacademic(req, res) {
        try {
            //const allEntrances = await entrance.getAllEntrances();

            const record = await academic.getacademic();
            res.json(record);

        }catch (error) {
            console.error('Error retrieving entrance data:', error);
            res.status(500).json({ message: 'Server error' });
        }

    }
    async createacdemic(req, res) {
        try {
            const { class_name, subject_name, subject_marks_obtain, total_marks } = req.body;
            const data_record = { class_name, subject_name, subject_marks_obtain, total_marks };
            const create_record = await academic.create_data(data_record);
            res.json({ message: 'data submitted successfully' });

            // res.json(create_record);
        } catch (error) {
            console.error('Error creating academic record:', error);
            res.status(500).json({ msg: 'Server error' });
        }
    }

    async updateAcademic(req, res) {
        try {
            const id = req.params.id;
            const { class_name, subject_name, subject_marks_obtain, total_marks } = req.body;
            const data_record = { class_name, subject_name, subject_marks_obtain, total_marks };
            
            const updated_record = await academic.update_data(id, data_record);
            res.json(updated_record);
        } catch (error) {
            console.error('Error updating academic record:', error);
            res.status(500).json({ msg: 'Server error' });
        }
    }

    async deleteAcademic(req, res) {
        try {
            const id = req.params.id;
            await academic.delete_data(id);
            res.json({ message: 'Academic record deleted successfully' });
        } catch (error) {
            console.error('Error deleting academic record:', error);
            res.status(500).json({ msg: 'Server error' });
        }
    }
    //working code
    async submit_subject (req,res) {
        try {
            const {sub_code,teacher_name} = req.body;
            const data_record1=  {sub_code,teacher_name};
            const data = await academic.subject_data(data_record1);
            res.json({ message: 'data submitted successfully' });

        } catch (error) {
            throw error;
        }
    }

    // Bulk data insert
    /* 
        [
        {
            "sub_code": "SUB001",
            "teacher_name": "John Doe"
        },
        {
            "sub_code": "SUB002",
            "teacher_name": "Jane Smith"
        },
        {
            "sub_code": "SUB003",
            "teacher_name": "Michael Johnson"
        }
        ] 
    */

    // async submit_subject(req, res) {
    //     try {
    //         const subjectDataArray = req.body; // Array of objects containing sub_code and teacher_name

    //         const result = await academic.submit_subject(subjectDataArray);

    //         res.json({ message: 'Data submitted successfully' });
    //     } catch (error) {
    //         console.error('Error submitting subject data:', error);
    //         res.status(500).json({ message: 'Server error' });
    //     }
    // }


    // changes

    async join_data (req,res) {
        try{
            const data = await academic.joint_data();
            res.json(data);

        }catch (error) {
            console.error('Error retrieving entrance data:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    // async join_data(req, res) {
    //     try {
    //         const sub_code = req.params.sub_code;
    
    //         const data = await academic.join_data(sub_code);
    //         res.json(data);
    //     } catch (error) {
    //         console.error('Error retrieving academic data:', error);
    //         res.status(500).json({ message: 'Server error' });
    //     }
    // }
    async insertData(req, res) {
        try {
            const { class_name, subject_name, subject_marks_obtain, total_marks, sub_code, passing_year, teacher_name } = req.body;

            await academic.insertData({
                class_name,
                subject_name,
                subject_marks_obtain,
                total_marks,
                sub_code,
                passing_year,
                teacher_name
            });

            res.json({ message: 'Data inserted successfully' });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

}
module.exports=academicController;