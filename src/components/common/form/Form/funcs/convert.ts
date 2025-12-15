import { defaultErrorText, enumKeyValidate, PropsValidate } from "../interfaces";

/**
 * Hàm convertValidate: Chuẩn hóa cấu hình validation đầu vào (PropsValidate)
 * thành một định dạng thống nhất, chi tiết, bao gồm cả message lỗi mặc định.
 * Định dạng đầu ra giúp component Form dễ dàng truy cập rule và message lỗi.
 *
 * Input (PropsValidate) có thể có 3 dạng:
 * 1. Tên trường: true (chỉ required)
 * 2. Tên trường: "Custom required message" (chỉ required)
 * 3. Tên trường: { ruleKey: value, ... }
 *
 * Output chuẩn hóa sẽ là:
 * {
 * [fieldName]: {
 * [ruleKey]: {
 * message: string,
 * value?: any
 * }
 * }
 * }
 *
 * @param validate Cấu hình validation đầu vào (PropsValidate).
 * @returns Cấu hình validation đã chuẩn hóa hoặc undefined.
 */
export const convertValidate = (validate?: PropsValidate) => {
  // Nếu không có cấu hình validation, trả về undefined
  if (!validate) return undefined;

  // Sử dụng Object.keys và reduce để duyệt qua từng trường (field) trong cấu hình validate
  let validate_ = Object.keys(validate).reduce((reduceVal, name) => {
    // Lấy cấu hình validation cho trường hiện tại (ví dụ: validate["email"])

    // --- CASE 1 & 2: Cấu hình chỉ là giá trị boolean (true) hoặc string (chỉ validate Required) ---
    // Ví dụ: { username: true } hoặc { username: "Vui lòng nhập tên" }

    if (typeof validate[name] == "boolean" && validate[name] == true) {
      // CASE 1: { fieldName: true } -> Chỉ áp dụng rule Required với message mặc định
      reduceVal[name] = {
        [enumKeyValidate.required]: {
          message: defaultErrorText[enumKeyValidate.required],
        },
      };
    } else if (typeof validate[name] == "string") {
      // CASE 2: { fieldName: "Custom message" } -> Chỉ áp dụng rule Required với message tùy chỉnh
      reduceVal[name] = {
        [enumKeyValidate.required]: {
          // Sử dụng message tùy chỉnh, nếu không có thì dùng message mặc định
          message: validate[name] || defaultErrorText?.[enumKeyValidate.required],
        },
      };
    }
    // --- CASE 3: Cấu hình là một Object chứa nhiều rule (ví dụ: { email: { required: true, email: true } }) ---
    else {
      // Duyệt qua từng ruleKey (required, minLength, email, v.v.) bên trong Object cấu hình của trường
      reduceVal[name] = Object.keys(validate[name]).reduce((reduceVal2, validateKey) => {
        let item = (validate[name] as any)?.[validateKey]; // Lấy giá trị của rule (ví dụ: true, "message", hoặc { value: 6, message: "..." })

        // --- 3.1: Rule là boolean (true) ---
        // Ví dụ: { required: true }
        if (typeof item == "boolean" && item == true) {
          reduceVal2[validateKey] = {
            // Gán message mặc định cho rule đó, nếu không có thì dùng default chung
            message: defaultErrorText?.[validateKey] || defaultErrorText.default,
          };
        }
        // --- 3.2: Rule là string (Custom message) ---
        // Ví dụ: { minLength: "Phải có ít nhất 6 ký tự" }
        else if (typeof item == "string") {
          reduceVal2[validateKey] = {
            // Gán message tùy chỉnh, nếu không có thì dùng message mặc định
            message: item || defaultErrorText?.[validateKey] || defaultErrorText.default,
          };
        }
        // --- 3.3: Rule là Object (Message và Value) ---
        // Ví dụ: { minLength: { value: 6, message: "..." } }
        else {
          reduceVal2[validateKey] = {
            // Gán message từ object (nếu có), nếu không có thì dùng message mặc định
            message: item?.message || defaultErrorText?.[validateKey] || defaultErrorText.default,
            // Gán giá trị (value) cho rule (ví dụ: min/max length/value, hoặc tên trường confirm)
            value: item?.value,
          };
        }
        return reduceVal2;
      }, {} as any);
    }
    return reduceVal;
  }, {} as PropsValidate); // Khởi tạo accumulator là một đối tượng rỗng

  return validate_;
};


