import * as yup from 'yup';
import { VALIDATE_CODES } from '../../../constants/ValidateCode';
import yupGlobal from '../../../yupGlobal';

export const updateSchema = yup.object().shape({
  userName: yup.string().required(VALIDATE_CODES.E0001),
  fullName: yup.string().required(VALIDATE_CODES.E0001),
  email: yup.string(),
  phoneNumber: yupGlobal.string().phoneNumber(),
  description: yup.string().max(1000, VALIDATE_CODES.E0002(1000)),
  dob: yupGlobal.string().dob(),
  gender: yup.string(),
  role: yup.string(),
  avatar: yup.mixed().avatar(),
});
