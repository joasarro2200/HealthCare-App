import React from 'react';
import { useForm } from 'react-hook-form';
import { IFormInput } from '../../constants/interfaces';
import { CREATE_PATIENT_EMAIL_FIELD, CREATE_PATIENT_NAME_FIELD } from '../../constants/common';
import InputField from '../../components/FormFields/InputField';
import PhoneField from '../../components/FormFields/PhoneField';
import FileField from '../../components/FormFields/FileField';

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
  const { handleSubmit, register, control, setValue, formState: { errors } } = useForm<IFormInput>();

  const onSubmit = (data: any) => {
    console.log(data);
    // Aquí puedes realizar la lógica para enviar los datos.
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
            error={errors.name ? 'Only letters are allowed' : ''}
            placeholder='Name Surname'
            small={false}
          />
          {/* Email */}
          <InputField
            register={register}
            labelText={CREATE_PATIENT_EMAIL_FIELD}
            fieldName='email'
            validation={emailValidation}
            error={errors.email ? 'Only "@gmail.com" mails are allowed' : ''}
            placeholder='example@gmail.com'
            small={false}
          />
          {/* Phone number */}
          <PhoneField
            control={control}
            error={errors["phone"] ? 'Invalid Phone' : ''}
          />
          {/* Document photo */}
          <FileField setValue={setValue}/>
          <button type="submit">Enviar</button>
      </form>
      </div>
    </div>
  );
};

export default CreatePatient;
