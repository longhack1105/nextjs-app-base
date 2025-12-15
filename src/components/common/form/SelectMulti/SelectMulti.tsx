import { useContext, useMemo } from "react";
import styles from "./SelectMulti.module.scss";
import type { PropsSelectMulti } from "./interfaces";
import SelectMultiControl from "@/components/common/controls/SelectMulti";
import { enumTypeSetError, FormContextData } from "../Form/interfaces";
import { FormContext } from "../Form/contexts";

function SelectMulti({
  name,
  label,
  value,
  options,
  searchable,
  onChange,
  isAllOption,
  placeholder,
  disabled,
}: PropsSelectMulti) {
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
  const handleChange = (value?: string[]) => {
    let value_ = (value || [])?.length > 0 ? value : undefined;
    data?.setForm((prev: any) => ({ ...prev, [name]: value_ }));
    data?.setError(name, { value: value_ });
    onChange?.(value_);
  };
  //#endregion Handel

  return (
    <div className={styles.container}>
      <SelectMultiControl
        label={label}
        value={value !== undefined ? value : data?.form?.[name]}
        options={options}
        searchable={searchable}
        onChange={handleChange}
        error={data?.errors?.[name]?.type === enumTypeSetError.show ? data?.errors?.[name]?.message : undefined}
        required={isRequired}
        isAllOption={isAllOption}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}

export default SelectMulti;
