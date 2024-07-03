import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DashboardFreelancer = () => {
  const [freelancer, setFreelancer] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchFreelancer = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/dashboard/freelancer/${id}`);
          setFreelancer(response.data);
        } catch (error) {
          console.error('Error fetching freelancer data: ', error);
        }
      };

      fetchFreelancer();
    }
  }, [id]);

  return (
    <div>
      <h1>Tableau de bord du Freelancer</h1>
      <p>Nom: {freelancer.firstname} {freelancer.lastname}</p>
      <p>Email: {freelancer.email}</p>
      <p>Compétences: {freelancer.skills}</p>
      <p>Bio: {freelancer.bio}</p>
    </div>
  );
};

export default DashboardFreelancer;
