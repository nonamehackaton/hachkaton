exports.registerCompany = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const Company = req.db.Company; // assuming the model is attached to req.db
      let company = new Company({ name, email, password });
      await company.save();
      res.status(201).json({ message: 'Company registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  exports.loginCompany = async (req, res) => {
    try {
      const { email, password } = req.body;
      const Company = req.db.Company; // assuming the model is attached to req.db
      const company = await Company.findOne({ email });
      if (!company || company.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.status(200).json({ message: 'Company logged in successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  