const db = require('../config/database');

async function createPurchase(purchaseData) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Insert data into 'purchase' table
    const purchaseQuery = 'INSERT INTO purchase (purchase_date, customer_name) VALUES (?, ?)';
    const purchaseValues = [purchaseData.purchase_date, purchaseData.customer_name];
    const [purchaseResult] = await connection.execute(purchaseQuery, purchaseValues);
    const purchaseId = purchaseResult.insertId;

    // Insert data into 'purchase_items' table
    const itemsQuery = 'INSERT INTO purchase_items (purchase_id, item_name, quantity) VALUES (?, ?, ?)';
    const itemsPromises = purchaseData.items.map((item) => {
      const itemValues = [purchaseId, item.item_name, item.quantity];
      return connection.execute(itemsQuery, itemValues);
    });
    await Promise.all(itemsPromises);

    await connection.commit();

    return { purchaseId };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  createPurchase,
};
