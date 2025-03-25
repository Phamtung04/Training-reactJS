export const VALIDATE_CODES = {
  E0001: 'Đây là trường bắt buộc, vui lòng nhập',
  E0002: (max) => `Vui lòng nhập ít hơn ${max} ký tự`,
  E0003: 'E-Mail không đúng định dạng.',
  E0004: 'Số điện thoại không đúng định dạng',
  E0005: 'Mật khẩu không đúng định dạng',
  E0006: (format) => `Vui lòng nhập định dạng ${format}`,
  E0007: (values) => `Chỉ được phép chọn giá trị thuộc [${values}]`,
  E0008: (min) => `Vui lòng nhập nhiều hơn ${min} ký tự`,
  E0009: 'Định dạng không hợp lệ. Chỉ chấp nhận JPG, PNG.',

  I0001: 'Thành công !',
  I0002: 'Đã có lỗi sảy ra, vui lòng thử lại !',
  I0003: 'Thông tin tài khoản và mật khẩu không chính xác !',
  I0004: 'Tài khoản đã tồn tại !',
  I0005: 'Mã xác thực không chính xác !',
  I0006: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại !',
};
