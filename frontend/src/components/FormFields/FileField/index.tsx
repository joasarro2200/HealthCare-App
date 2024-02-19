import React, { useCallback, useState } from 'react';
import { UseFormClearErrors, UseFormRegister, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { IFormInput } from '../../../constants/interfaces';
import { CREATE_PATIENT_DOCUMENT_FIELD } from '../../../constants/common';

import './styles.css';

interface FileFieldProps {
  register: UseFormRegister<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
  error: string | undefined;
  setError: UseFormSetError<IFormInput>;
  clearErrors: UseFormClearErrors<IFormInput>;
}

const FileField: React.FC<FileFieldProps> = ({register, setValue, error, setError, clearErrors}) => {
  const [path, setPath] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Verificar la extensión del archivo
    const acceptedFile = acceptedFiles[0];
    if (acceptedFile && acceptedFile.name.toLowerCase().endsWith('.jpg')) {
      setPath(URL.createObjectURL(acceptedFile));
      setValue('document', acceptedFile);
      clearErrors('document');
    } else {
      // Archivo no permitido
      setError('document', { type: 'custom', message: 'File extension must be .jpg' });
    }
  }, [setValue]);

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className='fieldContainer' {...getRootProps()}>
      <label>{CREATE_PATIENT_DOCUMENT_FIELD}</label>
      <div className='dragNDropContainer'>
        Drag and drop document
        <input 
          {...register('document', {required: true})}
          {...getInputProps()} 
        />
      </div>
      {path.length > 0 &&
        <img className='documentImage' key={path} src={path} />
      }  
      {error !== undefined && error.length > 0 && <p>{error}</p>}
    </div>
  );
};

export default FileField;
