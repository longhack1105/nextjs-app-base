import { ChevronDown } from "lucide-react";
import Input from "../Input";
import styles from "./Select.module.scss";
import { Option, PropsSelect } from "./interfaces";
import { Select as RadixSelect } from "@radix-ui/themes";
import { useEffect, useMemo, useState } from "react";
import Search from "../Search";
import * as RadixSelect2 from '@radix-ui/react-select'; // Hoặc import các thành phần riêng lẻ
import clsx from "clsx";
import { SELECT_OPTION_ALL, SELECT_OPTION_CANCEL } from "./constant";

function Select({
  placeholder = "Chọn giá trị",
  value,
  options,
  searchable,
  onChange,
  error,
  label,
  required,
  isAllOption,
  isCancelOption,
}: PropsSelect) {
  const [selected, setSelected] = useState<any>(value);

  //#region useEffect
  useEffect(() => {
    setSelected(value);
  }, [value]);
  //#endregion useEffect

  //#region handle
  const filterOptions = useMemo(() => {
    let _options = options || [];

    if (!!isAllOption) {
      _options = [
        {
          id: SELECT_OPTION_ALL,
          name: "Tất cả",
        },
        ..._options || [],
      ];
    }

    return _options;
  }, [isAllOption, isCancelOption, options]);

  // console.log("filterOptions", filterOptions);

  const getSelectedOption = (id?: string) => {
    return (filterOptions || []).find((option) => option.id === id);
  };
  //#endregion handle

  const selectedOption = useMemo(() => {
    return getSelectedOption(selected);
  }, [selected]);

  return (
    <div className={styles.container}>
      {!!label && (
        <div className={styles.label} suppressHydrationWarning>
          {label} {required && <span className={styles.required}>*</span>}:
        </div>
      )}
      <RadixSelect.Root
        // defaultValue="orange"
        size="3"
        value={selected}
        // open={true}
        onValueChange={(value: any) => {
          if (value === SELECT_OPTION_CANCEL) {
            setSelected("");
            onChange?.("");
          } else {
            setSelected(value);
            onChange?.(value);
          }
        }}
      >
        <RadixSelect.Trigger
          className={clsx(styles.trigger, { [styles.error]: !!error })}
          placeholder={placeholder}
        >
          <div className={styles.inputContainer}>
            <div className={styles.selectedOption}>
              {selectedOption?.name || <span className={styles.placeholder}>{placeholder}</span>}
            </div>
          </div>
        </RadixSelect.Trigger>
        <RadixSelect.Content position="popper">
          {!!searchable && (
            <RadixSelect.Group>
              <Search />
            </RadixSelect.Group>
          )}

          <RadixSelect.Group>
            {!!isCancelOption && (
              <RadixSelect.Item value={SELECT_OPTION_CANCEL} key={SELECT_OPTION_CANCEL}>
                Hủy chọn
              </RadixSelect.Item>
            )}
            {(filterOptions || []).map((option) => {
              return (
                <RadixSelect.Item key={option.id} value={option.id || ""}>
                  {option.name}
                </RadixSelect.Item>
              );
            })}
          </RadixSelect.Group>
        </RadixSelect.Content>
      </RadixSelect.Root>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}

export default Select;
