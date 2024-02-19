import React from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { IFormInput, Patient } from '../../constants/interfaces';
import { CREATE_PATIENT_ADDRESS_FIELD, CREATE_PATIENT_EMAIL_FIELD, CREATE_PATIENT_NAME_FIELD } from '../../constants/common';
import InputField from '../../components/FormFields/InputField';
import PhoneField from '../../components/FormFields/PhoneField';
import FileField from '../../components/FormFields/FileField';

import './styles.css';
import '../ListPatients/styles.css';
import 'react-phone-number-input/style.css'
import { createPatient } from '../../services/patientService';

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

  const onSubmit = async (data: IFormInput) => {
    const patientBody: Patient = {
      name: data.name,
      email: data.email,
      phone_number: data.phone,
      document_photo: data.document,
      address: data.address,
    }
    console.log(patientBody);
    const response = await createPatient(patientBody);
    console.log(response)
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
          <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default CreatePatient;
