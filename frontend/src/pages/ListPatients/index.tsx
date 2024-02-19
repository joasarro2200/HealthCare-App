import React, { useEffect, useState } from 'react';
import './styles.css';
import { Patient } from '../../constants/interfaces';
import { fetchPatients } from '../../services/patientService';
import { PATIENTS_PAGE_TITLE } from '../../constants/common';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import { CREATE_PATIENTS_ROUTE, LIST_PATIENTS_ROUTE } from '../../constants/routes';

const ListPatients: React.FC = () => {
  const [patients, setPatients] =  useState<Patient[] | null>(null);
  const [nextUrl, setNextURL] =  useState<string| null>(null);
  const [prevUrl, setPrevURL] =  useState<string| null>(null);

  const fetchData =  async (url: string | null) => {
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

  const handleNextPage = () => {
    fetchData(nextUrl);
  }

  const handlePrevPage = () => {
    fetchData(prevUrl);
  }

  return (
    <div className='mainContainer'>
      <div className='patientsContainer'>
        <div className='titleAndButtonContainer'>
          <h1 className='title'>{PATIENTS_PAGE_TITLE}</h1>
          <nav>
            <Link className='addLink' to={CREATE_PATIENTS_ROUTE}>
              Add
            </Link>
          </nav>
        </div>
        <div className='delimiterLine' />
          {patients?.map((patient) => 
            <Card 
              key={patient.id}
              title={patient.name}
              imageSrc={patient.document_photo} 
              extraInfo={{
                Email: patient.email,
                Phone: patient.phone_number,
              }}
            />
          )}
        <div className='delimiterLine' />
        <div className='nextBeforeContainer'>
          {prevUrl && <button onClick={handlePrevPage} type='button' className="previous round">&#8249;</button>}
          {nextUrl && <button onClick={handleNextPage} type='button' className="next round">&#8250;</button>}
        </div>
      </div>
    </div>
  );
};

export default ListPatients;
