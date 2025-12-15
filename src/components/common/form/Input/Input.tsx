import { useContext, useMemo } from "react";
import styles from "./Input.module.scss";
import { PropsInput } from "./interfaces";
import MyInput from "@/components/common/controls/Input";
import { FormContext } from "../Form/contexts";
import { enumTypeSetError, FormContextData } from "../Form/interfaces";
import { setError } from "@/redux/reducer/globals";
import { Eye } from "lucide-react";

function Input({ name, ...props }: PropsInput) {
  const data = useContext<FormContextData>(FormContext);

  const isRequired = useMemo(() => {
    const validateRules = data?.validate?.[name];
    if (typeof validateRules === "object" && validateRules !== null) {
      return !!validateRules.required;
    }
    return false;
  }, [data?.validate, name]);

  //#region Handel
  // Xử lý input thay đổi dữ liệu => Cập nhật
  const handleChange = (e: any) => {
    data?.setForm((prev: any) => ({ ...prev, [name]: e?.target?.value }));
    data?.setError(name, { value: e?.target?.value });
  };

  const handleError = (e: any) => {
    data?.setError(name);
  };
  //#endregion Handel

  return (
    <div className={styles.container}>
      <MyInput
        {...props}
        value={data?.form?.[name] || ""}
        onBlur={handleError}
        onChange={handleChange}
        required={isRequired}
        error={data?.errors?.[name]?.type === enumTypeSetError.show ? data?.errors?.[name]?.message : undefined}
      // autoComplete="off"
      />
    </div>
  );
}

export default Input;
