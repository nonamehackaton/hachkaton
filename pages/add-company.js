import { useState } from 'react';
import axios from 'axios';

const AddCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/companies/create', formData);
      alert('Company added successfully');
    } catch (error) {
      console.error('Error adding company: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Company Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="text" name="country" placeholder="Country" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <button type="submit">Add Company</button>
    </form>
  );
};

export default AddCompany;
