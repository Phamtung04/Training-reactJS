import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { VALIDATE_CODES } from '../../../constants/ValidateCode';
import { updateSchema } from '../../../yupGlobal';

const UpdateUserContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateSchema) });
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setValue('avatar', file);
    }
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    handleFileChange,
    preview,
  };
};

export default UpdateUserContainer;
