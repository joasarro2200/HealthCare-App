import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import {  ValidationField } from '../../../constants/types';
import { IFormInput } from '../../../constants/interfaces';

import './styles.css';

interface InputFieldProps {
  register: UseFormRegister<IFormInput>;
  labelText: string;
  fieldName: "name" | "email" | "phone" | "document" | "address";
  placeholder: string;
  validation?: ValidationField;
  error: string | undefined;
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
        {error !== undefined && error.length > 0 && <p className="errorMessage">{error}</p>}
    </div>
  );
};

export default InputField;
