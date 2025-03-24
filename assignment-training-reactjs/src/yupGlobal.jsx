import * as yup from 'yup';
import { VALIDATE_CODES } from './constants/ValidateCode';
import dayjs from 'dayjs';

yup.addMethod(yup.string, 'phoneNumber', function () {
  return this.matches(/^0[0-9]+$/, VALIDATE_CODES.E0004)
    .min(10, VALIDATE_CODES.E0008(10))
    .max(10, VALIDATE_CODES.E0002(10))
    .required(VALIDATE_CODES.E0001);
});

yup.addMethod(yup.string, 'dob', function () {
  return this.transform((value, originalValue) => {
    if (!originalValue) return null;
    return dayjs(originalValue).format('YYYY-MM-DD');
  })
    .nullable()
    .test(
      'maxDate',
      VALIDATE_CODES.E0007('nhỏ hơn ngày hiện tại'),
      (value) => !value || value <= dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    )
    .required(VALIDATE_CODES.E0001);
});

yup.addMethod(yup.string, 'passwordConfirm', function () {
  return this.oneOf([yup.ref('password'), null], VALIDATE_CODES.E0005).required(
    VALIDATE_CODES.E0001,
  );
});

yup.addMethod(yup.mixed, 'avatar', function () {
  return this.test('fileType', 'Định dạng không hợp lệ. Chỉ chấp nhận JPG, PNG.', (value) => {
    return !value || (value instanceof File && ['image/jpeg', 'image/png'].includes(value.type));
  }).nullable();
});

export default yup;
