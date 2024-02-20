import { Patient } from "../constants/interfaces";
import { PATIENTS_URL } from "../constants/routes";

export const fetchPatients = async (url:string | null) => {
  try {
    const response = await fetch( url || PATIENTS_URL, {
      method: 'GET',
    });
    const patients = await response.json();
    localStorage.setItem('next', JSON.stringify(patients.next));
    localStorage.setItem('previous', JSON.stringify(patients.previous));
    localStorage.setItem('patients', JSON.stringify(patients.results));
  } catch (e) {
    console.log(e)
  }
}

export const createPatient = async (data: Patient) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone_number', data.phone_number);
    formData.append('address', data.address);
    formData.append('document_photo', data.document_photo);

    const response = await fetch(PATIENTS_URL, {
      method: 'POST',
      body: formData,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

