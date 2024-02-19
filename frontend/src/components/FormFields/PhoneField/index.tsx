import React from 'react';

import { Controller } from 'react-hook-form';
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import { CREATE_PATIENT_PHONE_FIELD } from '../../../constants/common';

import './styles.css';

interface PhoneFieldProps {
  control: any;
  error: string;
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
        {error.length > 0 && (
          <p className="error-message">{error}</p>
        )}
    </div>
  );
};

export default PhoneField;
