import * as yup from 'yup';
import dayjs from 'dayjs';
import { VALIDATE_CODES } from '../../../constants/validateCode';

export const updateSchema = yup.object().shape({
  userName: yup.string().required(VALIDATE_CODES.E0001),
  fullName: yup.string().required(VALIDATE_CODES.E0001),
  email: yup.string(),
  phoneNumber: yup
    .string()
    .matches(/^0[0-9]+$/, VALIDATE_CODES.E0004)
    .min(10, VALIDATE_CODES.E0008(10))
    .max(10, VALIDATE_CODES.E0002(10)),
  description: yup.string().max(1000, VALIDATE_CODES.E0002(1000)),
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
  gender: yup.string(),
  role: yup.string(),
  avatar: yup
    .mixed()
    .test('fileType', 'Định dạng không hợp lệ', (value) => {
      return !value || (value instanceof File && ['image/jpeg', 'image/png'].includes(value.type));
    })
    .nullable(),
});
