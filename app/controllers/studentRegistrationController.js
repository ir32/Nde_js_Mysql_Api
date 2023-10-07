const student = require('../models/studentRegistrationModel');
const SubjectHelper = require('../helper/subjectHelper'); 

class StudentRegistrationController { 
    async studentRegistration(req, res) { 
        try {
            const {
                first_name,
                last_name,
                date_of_birth,
                email,
                phone_number,
                address,
                program,
                graduation_year
            } = req.body;

            // Call the model function to insert data
            const result = await student.postData(
                first_name,
                last_name,
                date_of_birth,
                email,
                phone_number,
                address,
                program,
                graduation_year
            );

            res.json({ message: 'Student data inserted successfully', result });
        } catch (error) {
            console.error('Error inserting student data:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    async getstudent(req,res){
        try{
            var data= await student.allstudent();
            res.json(data);
        }
        catch(err){
            console.log("Error");
            res.status(500).json({Msg:'Server error'});
        }
    }
    async deletestudent(req,res){
        try{
            var data= req.params.id;
            var result= await student.datadelete(data);
            if(result){
                res.json(result);
    
            }
        }
        catch (err){
            console.log(err);
            res.status(500).json({MSG:'Server error'});
        }
    }
    async editstudent(req,res){
        try{
            var data = req.params.id;
            var result= await student.editmodel_student(data);
            res.json(result);

        }
        catch(err){
            console.log(err);
            res.status(500).json({Msg: 'server error'});
        }
    }
    async updatestudent(req, res) {
        try {
          const student_id = req.params.id; // Assuming you have the student_id in the request body
          const updatedData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            program: req.body.program,
            graduation_year: req.body.graduation_year
          };
      
          const result = await student.update_student(student_id, updatedData);
      
          res.json(result);
        } catch (error) {
          console.error('Error updating student data:', error);
          res.status(500).json({ message: 'Server error' });
        }
    }
    async  getallsubject(req, res) {
        try {
            const tableName = 'subject'; // Replace with your desired table name
            //const whereCondition = 'category = "Science"'; // Replace with your desired WHERE condition
            // const results = await SubjectHelper.getDataByCondition(tableName, whereCondition);
            const results = await SubjectHelper.getDataByCondition(tableName);
            res.json(results);
          } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
      }
      
}

module.exports = new StudentRegistrationController();
