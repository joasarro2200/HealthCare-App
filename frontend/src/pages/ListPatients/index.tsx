import React, { useEffect, useState } from 'react';
import './styles.css';
import { Patient } from '../../constants/interfaces';
import { fetchPatients } from '../../services/patientService';

const ListPatients: React.FC = () => {
  const [patients, setPatients] =  useState<Patient[] | null>(null);
  const [nextUrl, setNextURL] =  useState<string| null>(null);
  const [prevUrl, setPrevURL] =  useState<string| null>(null);

  const fetchData = async (url: string | null) => {
    await fetchPatients(url);
    const storedPatients = localStorage.getItem('patients');
    const next = localStorage.getItem('next');
    const previous = localStorage.getItem('previous');
    if (storedPatients !== null) {
      const parsedPatients = JSON.parse(storedPatients);
      setPatients(parsedPatients);
    }
    if (next !== null) {
      const parsedNextURL = JSON.parse(next);
      setNextURL(parsedNextURL);
    }
    if (previous !== null) {
      const parsedPreviousURL = JSON.parse(previous);
      setPrevURL(parsedPreviousURL);
    }
  }

  useEffect(() => {
    fetchData(null);
  }, [])

  console.log(nextUrl)
  console.log(prevUrl)

  return (
    <div className='mainContainer'>
        {patients?.map((patient) => 
          <div>
            <img src={patient.document_photo} alt='document' />
            <p>{patient.name}</p>
          </div>
        )}
    </div>
  );
};

export default ListPatients;
