import { AnyARecord } from "dns";

export const isErrorRequired = (value?: any) => {
  if (value === 0) return false;
  if (!value) return true;
  return false;
};

export const isErrorMax = (value?: any, condition?: number) => {
  if (isNaN(Number(value))) return false;
  if (isNaN(Number(condition))) return false;

  if (Number(value) > Number(condition)) return true;
  return false;
};

export const isErrorMin = (value?: any, condition?: number) => {
  if (isNaN(Number(value))) return false;
  if (isNaN(Number(condition))) return false;

  if (Number(value) < Number(condition)) return true;
  return false;
};

export const isErrorMaxLength = (value?: any, condition?: number) => {
  if (!value) return false;
  if (isNaN(Number(condition))) return false;

  if (Number(value.toString().length) > Number(condition)) return true;
  return false;
};

export const isErrorMinLength = (value?: any, condition?: number) => {
  if (!value) return false;
  if (isNaN(Number(condition))) return false;

  if (Number(value.toString().length) < Number(condition)) return true;
  return false;
};

export const isErrorEmail = (value?: any) => {
  if (!value) return false;
  // Simple email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailPattern.test(value);
};

export const isErrorPhone = (value?: any) => {
  if (!value) return false;
  // Simple phone number regex: allows digits, spaces, dashes, parentheses, and plus sign, 7-15 digits
  const phonePattern = /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])([0-9]{7})$/;
  return !phonePattern.test(value);
};

export const isErrorPassword = (value: any) => {
  // 1. Kiểm tra rỗng (đã có trong code gốc)
  if (!value) return false;

  const password = String(value);

  // Quy tắc 1: Độ dài tối thiểu 8 ký tự
  if (password.length < 8) {
    return "Mật khẩu phải có ít nhất 8 ký tự.";
  }

  // Quy tắc 2: Phải chứa ít nhất một chữ hoa (A-Z)
  if (!/[A-Z]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một chữ cái viết hoa.";
  }

  // Quy tắc 3: Phải chứa ít nhất một chữ thường (a-z)
  if (!/[a-z]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một chữ cái viết thường.";
  }

  // Quy tắc 4: Phải chứa ít nhất một chữ số (0-9)
  if (!/[0-9]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một chữ số (0-9).";
  }

  // Quy tắc 5 (Tùy chọn): Phải chứa ít nhất một ký tự đặc biệt
  // Ký tự đặc biệt ở đây là: @$!%*?&
  if (!/[@$!%*?&]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@$!%*?&).";
  }

  // Nếu vượt qua tất cả các kiểm tra, mật khẩu hợp lệ
  return false;
};

export const isErrorConfirm = (value?: any, valueConfirm?: any) => {
  if (value !== valueConfirm) return true;
  else return false;
};
