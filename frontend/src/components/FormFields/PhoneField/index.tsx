import React from 'react';

import { Control, Controller } from 'react-hook-form';
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import { CREATE_PATIENT_PHONE_FIELD } from '../../../constants/common';

import './styles.css';
import { IFormInput } from '../../../constants/interfaces';

interface PhoneFieldProps {
  control: Control<IFormInput, any, IFormInput>;
  error: string | undefined;
}

const PhoneField: React.FC<PhoneFieldProps> = ({ control, error }) => {
  return (
    <div className='fieldContainerSmall'>
        <label>{CREATE_PATIENT_PHONE_FIELD}</label>
        <Controller
          name="phone"
          control={control}
          rules={{validate: (value) => isPossiblePhoneNumber(`${value}`)}}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              value={value}
              onChange={onChange}
              defaultCountry="UY"
              id="phone"
            />
          )}
        />
        {error !== undefined && error.length > 0 && (
          <p className="errorMessage">{error}</p>
        )}
    </div>
  );
};

export default PhoneField;
