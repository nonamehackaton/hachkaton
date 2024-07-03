import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DashboardCompany = () => {
  const [company, setCompany] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchCompany = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/dashboard/company/${id}`);
          setCompany(response.data);
        } catch (error) {
          console.error('Error fetching company data: ', error);
        }
      };

      fetchCompany();
    }
  }, [id]);

  return (
    <div>
      <h1>Tableau de bord de l'Entreprise</h1>
      <p>Nom: {company.name}</p>
      <p>Email: {company.email}</p>
      <p>Pays: {company.country}</p>
      <p>Description: {company.description}</p>
    </div>
  );
};

export default DashboardCompany;
