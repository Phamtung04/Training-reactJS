import * as yup from 'yup';
import { VALIDATE_CODES } from '../../../constants/validateCode';
import yupGlobal from '../../../yupGlobal';

export const registerSchema = yup.object().shape({
  userName: yup.string().required(VALIDATE_CODES.E0001),
  fullName: yup.string().required(VALIDATE_CODES.E0001),
  email: yup.string().email(VALIDATE_CODES.E0003).required(VALIDATE_CODES.E0001),
  phoneNumber: yupGlobal.string().phoneNumber(),
  password: yup.string().min(8, VALIDATE_CODES.E0008(8)).required(VALIDATE_CODES.E0001),
  confirmPassword: yupGlobal.string().passwordConfirm(),
  dob: yupGlobal.string().dob(),
  gender: yup.string().required(VALIDATE_CODES.E0001),
  role: yup.string().required(VALIDATE_CODES.E0001),
});
