const User = require('../models/userModel');

const UserController = {};

UserController.getAllUsers = (req, res) => {
  User.getAllUsers()
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

UserController.getAllContacts = (req, res) => {
  User.getAllContacts()
    .then(([contacts]) => {
      res.json(contacts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

UserController.createUser = (req, res) => {
  const userData = req.body;
  User.createUser(userData)
    .then(() => {
      res.json({ message: 'User created successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


// create contact 
UserController.postContact = (req, res) => {
  const contactData = req.body;
  
  User.postContact(contactData)
  // postcontact can make function in model to run the query
  .then(() => {
    res.json({msg : 'Contact data inserted !!'});
  }) 
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error : 'Internal error '});
  });
};

UserController.getUserById = (req, res) => {
  const userId = req.params.id;
  User.getUserById(userId)
    .then(([user]) => {
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

UserController.updateUserById = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  User.updateUserById(userId, userData)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

UserController.deleteUserById = (req, res) => {
  const userId = req.params.id;
  User.deleteUserById(userId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

UserController.getAllrecord = (req, res) => {
  const contactsPromise = User.getContacts();
  const ordersPromise = User.getOrders();
  const paymentsPromise = User.getPayments();

  Promise.all([contactsPromise, ordersPromise, paymentsPromise])
    .then(([contacts, orders, payments]) => {
      const data = {
        contacts: contacts[0],
        orders: orders[0],
        payments: payments[0]
      };
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports = UserController;
