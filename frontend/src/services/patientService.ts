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
