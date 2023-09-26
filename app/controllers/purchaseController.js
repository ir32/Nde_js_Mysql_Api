const purchaseModel = require('../models/purchaseModel');

async function createPurchase(req, res, next) {
  try {
    const purchaseData = req.body;
    const result = await purchaseModel.createPurchase(purchaseData);
    res.json({ purchaseId: result.purchaseId });
    
  } catch (error) {
    next(error);
  }
}


module.exports = {
  createPurchase,
};
