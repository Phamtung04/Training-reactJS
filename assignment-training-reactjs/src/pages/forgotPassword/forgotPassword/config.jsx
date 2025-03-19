import * as yup from 'yup';
import { VALIDATE_CODES } from '../../../constants/validateCode';


export const forgotSchema = yup.object().shape({
    email: yup.string().email(VALIDATE_CODES.E0003).required(VALIDATE_CODES.E0001),
  });