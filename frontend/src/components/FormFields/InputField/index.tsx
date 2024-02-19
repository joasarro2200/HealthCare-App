import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import {  ValidationField } from '../../../constants/types';
import { IFormInput } from '../../../constants/interfaces';

import './styles.css';

interface InputFieldProps {
  register: UseFormRegister<IFormInput>;
  labelText: string;
  fieldName: "name" | "email" | "phone" | "document";
  placeholder: string;
  validation: ValidationField;
  error: string;
  small: boolean;
}

const InputField: React.FC<InputFieldProps> = (
  { register, labelText, fieldName, placeholder, validation, error, small }
) => {
  return (
    <div className={small ? 'fieldContainerSmall' : 'fieldContainer'}>
        <label>{labelText}</label>
        <input
            {...register(fieldName, validation)}
            placeholder={placeholder}
        />
        {error.length > 0 && <p className="error-message">{error}</p>}
    </div>
  );
};

export default InputField;
