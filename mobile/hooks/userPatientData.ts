import { useState, useEffect } from 'react';
import { useUser } from '@/context/userContext';

export const usePatientData = () => {
  const { userData } = useUser();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatientData = async (userId:any) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:3000/data-paciente-mobile/${userId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al obtener datos del paciente');
      }
      
      setPatientData(data.data);
      return data.data;
    } catch (error) {
      console.error('Error fetching patient data:');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      fetchPatientData(userData.id);
    }
  }, [userData?.id]);

  return {
    patientData,
    loading,
    error,
    refetch: () => fetchPatientData(userData?.id),
    fetchPatientData
  };
};