import { useContext, useMemo } from "react";
import styles from "./Select.module.scss";
import type { PropsSelect } from "./interfaces";
import SelectControl from "@/components/common/controls/Select";
import { enumTypeSetError, FormContextData } from "../Form/interfaces";
import { FormContext } from "../Form/contexts";

function Select({
  name,
  label,
  value,
  options,
  searchable,
  onChange,
  isAllOption,
  isCancelOption,
}: PropsSelect) {
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
  const handleChange = (value: any) => {
    data?.setForm((prev: any) => ({ ...prev, [name]: value }));
    data?.setError(name, { value: value });
    onChange?.(value);
  };

  const handleError = (e: any) => {
    data?.setError(name);
  };
  //#endregion Handel

  return (
    <div className={styles.container}>
      <SelectControl
        label={label}
        value={value} options={options}
        searchable={searchable}
        onChange={handleChange}
        error={data?.errors?.[name]?.type === enumTypeSetError.show ? data?.errors?.[name]?.message : undefined}
        required={isRequired}
        isAllOption={isAllOption}
        isCancelOption={isCancelOption}
      />
    </div>
  );
}

export default Select;
