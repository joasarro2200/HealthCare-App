import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldError, useForm } from 'react-hook-form';
import { IFormInput, Patient } from '../../constants/interfaces';
import { CREATE_PATIENT_ADDRESS_FIELD, CREATE_PATIENT_EMAIL_FIELD, CREATE_PATIENT_NAME_FIELD } from '../../constants/common';
import InputField from '../../components/FormFields/InputField';
import PhoneField from '../../components/FormFields/PhoneField';
import FileField from '../../components/FormFields/FileField';

import { createPatient } from '../../services/patientService';
import Modal from '../../components/Modal';
import { LIST_PATIENTS_ROUTE } from '../../constants/routes';

import './styles.css';
import '../ListPatients/styles.css';
import 'react-phone-number-input/style.css'

const nameValidation = { 
  required: true,
  maxLength: 50,
  pattern: /^[A-Za-z\s]+$/i,
}

const emailValidation = { 
  required: true,
  maxLength: 50,
  pattern: /^[a-zA-Z0-9._-]+@gmail\.com$/,
}

const CreatePatient: React.FC = () => {
  const { 
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
    setError,
    clearErrors 
  } = useForm<IFormInput>();

  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [succeedCreate, setSucceedCreate] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [createPatientTextError, setCreatePatientTextError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = async (data: IFormInput) => {
    const patientBody: Patient = {
      name: data.name,
      email: data.email,
      phone_number: data.phone,
      document_photo: data.document,
      address: data.address,
    }
    setIsSubmiting(true);
    const response = await createPatient(patientBody);
    setIsSubmiting(false);

    if (response === undefined) {
      setSucceedCreate(false);
      setIsOpenModal(true);
      setCreatePatientTextError('Server unavailable');
      return;
    }

    if (response.ok) {
      const storedPatients = localStorage.getItem('patients');
      if (storedPatients !== null) {
        const parsedPatients = JSON.parse(storedPatients);
        parsedPatients.push(patientBody);
        localStorage.setItem('patients', JSON.stringify(parsedPatients));
      }
    } else {
      setCreatePatientTextError(response?.statusText);
    }

    setSucceedCreate(response.ok);
    setIsOpenModal(true);
  };

  const getError = (fieldName: string, errorObj: FieldError) => {
    switch (errorObj.type) {
      case 'required':
        return 'This field is required';
      case 'custom':
        return errorObj.message;
      case 'pattern':
        return getFieldPatternError(fieldName);
      default:
        return '';
    }
  };

  const getFieldPatternError = (fieldName: string) => {
    switch (fieldName) {
      case 'name':
        return 'Only letters are allowed';
      case 'email':
        return 'Only @gmail mails are allowed';
      default:
        return '';
    }
  };

  const onCloseModalHandler = () => {
    if (succeedCreate) {
      return navigate(LIST_PATIENTS_ROUTE);
    }
    setIsOpenModal(false);
  }

  return (
    <div className='mainContainer'>
      <div className='patientsContainer'>
        <h1 className='createTitle'>Add new patient</h1>
        <p className='createSubtitle'>Enter the new patient details</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <InputField
            register={register}
            labelText={CREATE_PATIENT_NAME_FIELD}
            fieldName='name'
            validation={nameValidation}
            error={errors.name ? getError('name', errors.name) : ''}
            placeholder='Name Surname'
            small={false}
          />
          {/* Email */}
          <InputField
            register={register}
            labelText={CREATE_PATIENT_EMAIL_FIELD}
            fieldName='email'
            validation={emailValidation}
            error={errors.email ? getError('email', errors.email) : ''}
            placeholder='example@gmail.com'
            small={false}
          />
          {/* Address */}
          <InputField
            register={register}
            labelText={CREATE_PATIENT_ADDRESS_FIELD}
            fieldName='address'
            error={errors.address ? getError('address', errors.address) : ''}
            placeholder='Your address'
            small={false}
          />
          {/* Phone number */}
          <PhoneField
            control={control}
            error={errors.phone ? getError('phone', errors.phone) : ''}
          />
          {/* Document photo */}
          <FileField 
            setValue={setValue}
            register={register}
            error={errors.document ? getError('document', errors.document) : ''}
            setError={setError}
            clearErrors={clearErrors}
          />
          <button 
            type="submit"
            disabled={isSubmiting}
          >
            {isSubmiting ? <i className="fa fa-spinner fa-spin" /> : 'Submit'}
          </button>
      </form>
      </div>
      <Modal
        onCloseHandler={onCloseModalHandler}
        isSuccess={succeedCreate}
        message={succeedCreate ? 'Patient succesfully registered!' : `An error occured: ${createPatientTextError}`}
        isOpen={isOpenModal}
      />
    </div>
  );
};

export default CreatePatient;
