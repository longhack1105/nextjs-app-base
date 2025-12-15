import {
  isErrorConfirm,
  isErrorEmail,
  isErrorMax,
  isErrorMin,
  isErrorMinLength,
  isErrorPassword,
  isErrorPhone,
  isErrorRequired,
} from "../funcs/checkError";

export interface PropsForm {
  children?: any;
  onSubmit?: (e?: any) => {};
  form?: any;
  setForm(value: any): void;

  validate?: PropsValidate;
}

export interface PropsValidate {
  [name: string]:
  | {
    [validateKey: string]: PropsValidateItem | string | boolean;
  }
  | string
  | boolean;
}

export interface PropsValidateItem {
  message?: string;
  value?: any;
}

export interface PropsError {
  message?: string;
  value?: any;
}

export interface FormContextData {
  form?: any;
  setForm(value: any): void;
  handleSetForm(name: any, value: any): void;
  validate?: PropsValidate;
  errors?: any;
  setError?: any;
  isDone?: boolean;
}

export enum enumKeyValidate {
  required = "required",
  min = "min",
  max = "max",
  minLength = "minLength",
  maxLength = "maxLength",
  email = "email",
  phone = "phone",
  password = "password",
  confirm = "confirm",
}

export const defaultErrorText: any = {
  [enumKeyValidate.required]: "Vui lòng không để trống trường này.",
  [enumKeyValidate.min]: "Vui lòng nhập giá trị lớn hơn.",
  [enumKeyValidate.max]: "Vui lòng nhập giá trị nhỏ hơn.",
  [enumKeyValidate.minLength]: "Vui lòng nhập đủ số ký tự.",
  [enumKeyValidate.maxLength]: "Vui lòng nhập ít hơn số ký tự cho phép.",
  [enumKeyValidate.email]: "Email không hợp lệ.",
  [enumKeyValidate.phone]: "Số điện thoại không hợp lệ.",
  [enumKeyValidate.password]: "Mật khẩu không hợp lệ.",
  [enumKeyValidate.confirm]: "Mật khẩu không khớp.",
  default: "Không hợp lệ.",
};

export enum enumTypeSetError {
  show = "show",
  hide = "hide",
}

/**
 * Lấy một quy tắc xác thực cụ thể (validation rule) từ cấu trúc rules
 * bằng cách tìm kiếm trong TẤT CẢ các trường.
 * * @param {object} rulesObject - Đối tượng chứa toàn bộ các quy tắc xác thực (validation rules).
 * @param {string} ruleName - Tên quy tắc cần lấy (ví dụ: 'confirm', 'required').
 * @returns {object|null} Đối tượng quy tắc đầu tiên tìm thấy, ngược lại là null.
 */
export const getSpecificRule = function (rulesObject: any, ruleName: any) {
  // Kiểm tra xem rulesObject có phải là đối tượng hợp lệ không
  if (!rulesObject || typeof rulesObject !== "object") {
    return null;
  }

  // Lặp qua tất cả các trường (field names) trong rulesObject
  for (const fieldName in rulesObject) {
    // Đảm bảo chỉ lặp qua các thuộc tính riêng của đối tượng
    if (rulesObject.hasOwnProperty(fieldName)) {
      const fieldRules = rulesObject[fieldName];

      // Kiểm tra xem quy tắc có tồn tại trong trường này không
      if (fieldRules && fieldRules[ruleName]) {
        // Trả về đối tượng quy tắc đầu tiên tìm thấy
        return {
          ...fieldRules[ruleName],
          name: fieldName,
        };
      }
    }
  }

  // Trả về null nếu không tìm thấy quy tắc nào sau khi duyệt hết
  return null;
};

export const getErrorByNameValue = (name: string, value: any, typeSetError: enumTypeSetError, form: any, validateConverted: any) => {
  value = (!!value ? value?.value : (form?.[name] as any)) as any;
  let validateItem = validateConverted?.[name] as any;

  // check required
  if (!!validateItem?.[enumKeyValidate.required]) {
    if (isErrorRequired(value)) {
      return {
        [name]: {
          type: typeSetError,
          message: validateItem?.[enumKeyValidate.required]?.message
        }
      };
    }
  }

  //check min
  if (!!validateItem?.[enumKeyValidate.min]) {
    if (isErrorMin(value, validateItem?.[enumKeyValidate.min]?.value)) {
      return {
        [name]: {
          type: typeSetError,
          message: validateItem?.[enumKeyValidate.min]?.message
        }
      };
    }
  }

  //check max
  if (!!validateItem?.[enumKeyValidate.max]) {
    if (isErrorMax(value, validateItem?.[enumKeyValidate.max]?.value)) {
      return {
        [name]: {
          type: typeSetError,
          message: validateItem?.[enumKeyValidate.max]?.message
        }
      };
    }
  }

  //check minLength
  if (!!validateItem?.[enumKeyValidate.minLength]) {
    if (isErrorMinLength(value, validateItem?.[enumKeyValidate.minLength]?.value)) {
      return {
        [name]: {
          type: typeSetError,
          message: validateItem?.[enumKeyValidate.minLength]?.message
        }
      };
    }
  }

  //check maxLength
  if (!!validateItem?.[enumKeyValidate.email]) {
    if (isErrorEmail(value)) {
      return {
        [name]: {
          type: typeSetError,
          message: validateItem?.[enumKeyValidate.email]?.message
        }
      };
    }
  }

  //check phone
  if (!!validateItem?.[enumKeyValidate.phone]) {
    if (isErrorPhone(value)) {
      return {
        [name]: {
          type: typeSetError,
          message: validateItem?.[enumKeyValidate.phone]?.message
        }
      };
    }
  }

  //check pass
  if (!!validateItem?.[enumKeyValidate.password]) {
    let errorText = isErrorPassword(value);
    if (errorText) {
      return {
        [name]: {
          type: typeSetError,
          message: typeof errorText === "string" ? errorText : validateItem?.[enumKeyValidate.password]?.message,
        }
      };
    }
  }

  //check confirm
  if (!!validateItem?.[enumKeyValidate.confirm]) {
    if (isErrorConfirm(value, form?.[validateItem?.[enumKeyValidate.confirm]?.value])) {
      return {
        [name]: {
          type: typeSetError,
          message: validateItem?.[enumKeyValidate.confirm]?.message,
        }
      };
    }
  }
  let confirmRule = getSpecificRule(validateConverted, enumKeyValidate.confirm);
  if (confirmRule?.value == name) {
    if (isErrorConfirm(value, form?.[confirmRule?.name])) {
      return {
        [confirmRule?.name]: {
          type: typeSetError,
          message: confirmRule?.message,
        }
      };
    } else {
      return {
        [confirmRule?.name]: undefined
      };
    }
  }

  return {
    [name]: undefined
  };
};
