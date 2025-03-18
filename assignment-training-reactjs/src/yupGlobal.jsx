import * as yup from 'yup';
import { VALIDATE_CODES } from './constants/ValidateCode';
import dayjs from 'dayjs';

// export const loginSchema = yup.object().shape({
//   email: yup.string().email(VALIDATE_CODES.E0003).required(VALIDATE_CODES.E0001),
//   password: yup.string().min(8, VALIDATE_CODES.E0008(8)).required(VALIDATE_CODES.E0001),
// });

// export const registerSchema = yup.object().shape({
//   userName: yup.string().required(VALIDATE_CODES.E0001),
//   fullName: yup.string().required(VALIDATE_CODES.E0001),
//   email: yup.string().email(VALIDATE_CODES.E0003).required(VALIDATE_CODES.E0001),
//   phoneNumber: yup
//     .string()
//     .matches(/^0[0-9]+$/, VALIDATE_CODES.E0004)
//     .min(10, VALIDATE_CODES.E0008(10))
//     .max(10, VALIDATE_CODES.E0002(10))
//     .required(VALIDATE_CODES.E0001),
//   password: yup.string().min(8, VALIDATE_CODES.E0008(8)).required(VALIDATE_CODES.E0001),

//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref('password'), null], VALIDATE_CODES.E0005)
//     .required(VALIDATE_CODES.E0001),
//   dob: yup
//     .string()
//     .transform((value, originalValue) => {
//       if (!originalValue) return null;
//       return dayjs(originalValue).format('YYYY-MM-DD');
//     })
//     .nullable()
//     .test(
//       'maxDate',
//       VALIDATE_CODES.E0007('nhỏ hơn ngày hiện tại'),
//       (value) => !value || value <= dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
//     )
//     .required(VALIDATE_CODES.E0001),

//   gender: yup.string().required(VALIDATE_CODES.E0001),
//   role: yup.string().required(VALIDATE_CODES.E0001),
// });

// export const forgotSchema = yup.object().shape({
//   email: yup.string().email(VALIDATE_CODES.E0003).required(VALIDATE_CODES.E0001),
// });

// export const updateSchema = yup.object().shape({
//   userName: yup.string().required(VALIDATE_CODES.E0001),
//   fullName: yup.string().required(VALIDATE_CODES.E0001),
//   email: yup.string(),
//   phoneNumber: yup
//     .string()
//     .matches(/^0[0-9]+$/, VALIDATE_CODES.E0004)
//     .min(10, VALIDATE_CODES.E0008(10))
//     .max(10, VALIDATE_CODES.E0002(10)),
//   description: yup.string().max(1000, VALIDATE_CODES.E0002(1000)),
//   dob: yup
//     .string()
//     .transform((value, originalValue) => {
//       if (!originalValue) return null;
//       return dayjs(originalValue).format('YYYY-MM-DD');
//     })
//     .nullable()
//     .test(
//       'maxDate',
//       VALIDATE_CODES.E0007('nhỏ hơn ngày hiện tại'),
//       (value) => !value || value <= dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
//     )
//     .required(VALIDATE_CODES.E0001),
//   gender: yup.string(),
//   role: yup.string(),
//   avatar: yup
//     .mixed()
//     .test('fileType','Định dạng không hợp lệ', (value) => {
//       return !value || (value instanceof File && ['image/jpeg', 'image/png'].includes(value.type));
//     })
//     .nullable(),
// });


yup.addMethod(yup.string, "phoneNumber", function () {
  return this.matches(/^0[0-9]+$/, VALIDATE_CODES.E0004)
    .min(10, VALIDATE_CODES.E0008(10))
    .max(10, VALIDATE_CODES.E0002(10))
    .required(VALIDATE_CODES.E0001);
});


yup.addMethod(yup.string, "dob", function () {
  return this.transform((value, originalValue) => {
    if (!originalValue) return null;
    return dayjs(originalValue).format("YYYY-MM-DD");
  })
    .nullable()
    .test(
      "maxDate",
      VALIDATE_CODES.E0007("nhỏ hơn ngày hiện tại"),
      (value) =>
        !value || value <= dayjs().subtract(1, "day").format("YYYY-MM-DD")
    )
    .required(VALIDATE_CODES.E0001);
});

export default yup;
