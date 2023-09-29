const student = require('../models/studentRegistrationModel');

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
}

module.exports = new StudentRegistrationController();
