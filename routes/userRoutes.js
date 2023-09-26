// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();


const UserController = require('../app/controllers/userController');
const authController = require('../app/controllers/authController');
const EmployeeController = require('../app/controllers/employeeController');
const AgentController = require('../app/controllers/agentController');
const multer = require('multer'); // Assuming you're using multer for file uploads
const ProductController = require('../app/controllers/productController');

const AdmissionController = require('../app/controllers/admissionController');

const RegistrationController = require('../app/controllers/registrationController');

//const upload = multer({ dest: 'public/doc' }); // Destination folder for uploaded files

// const storage = multer.diskStorage({
//     destination: 'public', // Destination folder for uploaded files
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
// });

const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
  
const upload = multer({ storage: storage });

const purchaseController = require('../app/controllers/purchaseController');

const WorkshopController = require('../app/controllers/workshopController');

const TeacherController = require('../app/controllers/teacherController');


// Get all users
router.get('/users', UserController.getAllUsers);

router.get('/contacts', UserController.getAllContacts);


// Create a new user
router.post('/userscreate', UserController.createUser);

router.post('/contacts_us', UserController.postContact);


// Get user by ID
router.get('/users/:id', UserController.getUserById);

// Update user by ID
router.put('/usersUpdate/:id', UserController.updateUserById);

// Delete user by ID
router.delete('/usersDelete/:id', UserController.deleteUserById);

// get 3 table record

router.get('/getalldatarecord', UserController.getAllrecord);


// // Login route
// router.post('/login', authController.login);

// // Logout route
// router.post('/logout', authController.logout);

const employeeController = new EmployeeController();
router.post('/employees', employeeController.createEmployeeWithAge);

router.get('/all_employees', employeeController.getAllEmp);

router.get('/employees/:id', employeeController.getEmployeeById);

const agentController = new AgentController();

// router.get('/agent', agentController.getAgent);

router.get('/agent_data', agentController.getAgent);

router.get('/agents', agentController.getAgentsByCountryAndStatus);

router.post('/products', upload.single('product_image'), ProductController.createProduct);

router.get('/getproducts', ProductController.getProducts);

// Two table data inser at same time
router.post('/purchases', purchaseController.createPurchase);

// *********************************************************** //

const workshopController = new WorkshopController();

router.get('/workshop', workshopController.getWork);

router.post('/workshop/submit', workshopController.submitWorkshop);

//======================================================

// file upload get and post
// app.use(express.static(path.join(__dirname, 'public')));


  
router.post('/postpic', upload.single('image'), AdmissionController.createAdmission);
router.get('/getpic', AdmissionController.getAdmissions);

//====================================

router.post('/register', RegistrationController.registerUser);
router.post('/login', RegistrationController.loginUser);
router.post('/logout', RegistrationController.logoutUser);
router.get('/check-login', RegistrationController.checkLogin);


// ============================================================ Teacher


const teacherController = new TeacherController();

router.get('/get_teachers', teacherController.getTeachers);
router.post('/teachers', teacherController.createTeacher);

// ================================================================ Entrance

const entranceController = require('../app/controllers/entranceController');
const EntranceController = new entranceController();
router.get('/get_entrances', EntranceController.getAllEntrances);
router.post('/entrances', EntranceController.createEntrance);

// ====================================================================Acdemic
const academicController = require('../app/controllers/academicController');
const AcademicController = new academicController;
router.get('/academic', AcademicController.getacademic);
router.post('/academic', AcademicController.createacdemic);
router.put('/academic/:id', AcademicController.updateAcademic);
router.delete('/academic/:id', AcademicController.deleteAcademic);
router.post('/submit_subject', AcademicController.submit_subject);
// join two table 
router.get('/all_academic',AcademicController.join_data);

//router.get('/all_academic/:sub_code', AcademicController.join_data);


router.post('/insert-data', AcademicController.insertData);

//============================================================== Cart
const CartController = require('../app/controllers/cartController');
router.post('/cart', CartController.createCartItem);
router.get('/cart_get', CartController.getCartItems);
router.put('/:id', CartController.updateCartItem);
router.delete('/:id', CartController.deleteCartItem);


module.exports = router;
