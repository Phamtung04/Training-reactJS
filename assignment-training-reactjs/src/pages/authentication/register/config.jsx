import * as yup from 'yup';
import dayjs from 'dayjs';
import { VALIDATE_CODES } from '../../../constants/ValidateCode';


export const registerSchema = yup.object().shape({
    userName: yup.string().required(VALIDATE_CODES.E0001),
    fullName: yup.string().required(VALIDATE_CODES.E0001),
    email: yup.string().email(VALIDATE_CODES.E0003).required(VALIDATE_CODES.E0001),
    phoneNumber: yup
      .string()
      .matches(/^0[0-9]+$/, VALIDATE_CODES.E0004)
      .min(10, VALIDATE_CODES.E0008(10))
      .max(10, VALIDATE_CODES.E0002(10))
      .required(VALIDATE_CODES.E0001),
    password: yup.string().min(8, VALIDATE_CODES.E0008(8)).required(VALIDATE_CODES.E0001),
  
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], VALIDATE_CODES.E0005)
      .required(VALIDATE_CODES.E0001),
    dob: yup
      .string()
      .transform((value, originalValue) => {
        if (!originalValue) return null;
        return dayjs(originalValue).format('YYYY-MM-DD');
      })
      .nullable()
      .test(
        'maxDate',
        VALIDATE_CODES.E0007('nhỏ hơn ngày hiện tại'),
        (value) => !value || value <= dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
      )
      .required(VALIDATE_CODES.E0001),
  
    gender: yup.string().required(VALIDATE_CODES.E0001),
    role: yup.string().required(VALIDATE_CODES.E0001),
  });