import * as yup from 'yup';
import { VALIDATE_CODES } from '../../../constants/ValidateCode';

export const loginSchema = yup.object().shape({
  email: yup.string().email(VALIDATE_CODES.E0003).required(VALIDATE_CODES.E0001),
  password: yup.string().min(8, VALIDATE_CODES.E0008(8)).required(VALIDATE_CODES.E0001),
});
