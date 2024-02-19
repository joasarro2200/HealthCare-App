import React, { useEffect, useState } from 'react';
import './styles.css';
import { Patient } from '../../constants/interfaces';
import { fetchPatients } from '../../services/patientService';
import { PATIENTS_PAGE_TITLE } from '../../constants/common';
import Card from '../../components/Card';

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
      <div className='patientsContainer'>
        <h1 className='title'>{PATIENTS_PAGE_TITLE}</h1>
        <div className='delimiterLine' />
          {patients?.map((patient) => 
            <Card 
              title={patient.name}
              imageSrc={patient.document_photo} 
              extraInfo={{
                Email: patient.email,
                Phone: patient.phone_number,
              }}
            />
          )}
        </div>
    </div>
  );
};

export default ListPatients;
