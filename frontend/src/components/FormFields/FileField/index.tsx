import React, { useCallback, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { IFormInput } from '../../../constants/interfaces';
import { CREATE_PATIENT_DOCUMENT_FIELD } from '../../../constants/common';

import './styles.css';

interface FileFieldProps {
  setValue: UseFormSetValue<IFormInput>;
}

const FileField: React.FC<FileFieldProps> = ({setValue}) => {
  const [path, setPath] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setPath(URL.createObjectURL(acceptedFiles[0]));
    setValue('document', acceptedFiles[0]);
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className='fieldContainer' {...getRootProps()}>
      <label>{CREATE_PATIENT_DOCUMENT_FIELD}</label>
      <div className='dragNDropContainer'>
        Drag and drop document
        <input 
          {...getInputProps()} 
        />
      </div>
      {path.length > 0 &&
        <img className='documentImage' key={path} src={path} />
      }  
    </div>
  );
};

export default FileField;
