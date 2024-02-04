const CareerModel = require('../models/careerModel');
const Razorpay = require('razorpay');

class CareerController {
    async dreamJob(req, res) {
        try {
            const careerModel = new CareerModel();
            const jobs = await careerModel.getAllJobs();
            res.status(200).json({ jobs });
        } catch (error) {
            console.error('Error getting job items:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    async initiateRazorpayPayment(req, res) {
        try {
          const razorpay = new Razorpay({
            key_id: 'rzp_test_sQIk3nO8AAvuGJ',
            key_secret: 'ycpPbAbXrfsA7EuGMDvvwZEi'
          });
    
          const { amount } = req.body; // Get the amount from the request body

          const orderOptions = {
                amount: parseInt(amount) * 100, // Convert amount to paise (1 INR = 100 paise)
                currency: 'INR',
                receipt: 'order_rcptid_11',
                payment_capture: 1 // Auto capture payment
          };
    
          const order = await razorpay.orders.create(orderOptions);
    
          const customerDetails = req.body;
          customerDetails.orderId = order.id; // Add order ID to customer details
    
          // Render a payment page or return the order details to the client
          res.json({
            orderId: order.id,
            amount: orderOptions.amount,
            currency: orderOptions.currency,
            key_id: razorpay.key_id,
            customerDetails: customerDetails
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error initiating Razorpay payment' });
        }
      }
    }

module.exports = CareerController;
