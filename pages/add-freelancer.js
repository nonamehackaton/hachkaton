import { useState } from 'react';
import axios from 'axios';

const AddFreelancer = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    country: '',
    skills: '',
    bio: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/freelancers/create', formData);
      alert('Freelancer added successfully');
    } catch (error) {
      console.error('Error adding freelancer: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="text" name="country" placeholder="Country" onChange={handleChange} />
      <input type="text" name="skills" placeholder="Skills" onChange={handleChange} />
      <textarea name="bio" placeholder="Bio" onChange={handleChange} />
      <button type="submit">Add Freelancer</button>
    </form>
  );
};

export default AddFreelancer;
