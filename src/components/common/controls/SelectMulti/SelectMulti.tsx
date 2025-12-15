import { ChevronDown } from "lucide-react";
import styles from "./SelectMulti.module.scss";
import { PropsSelectMulti } from "./interfaces";
import { Popover, Checkbox, Text, Flex, Button } from "@radix-ui/themes";
import { useEffect, useMemo, useState } from "react";
import Search from "../Search";
import clsx from "clsx";
import { SELECT_OPTION_ALL } from "../Select/constant";
import { removeVnTone } from "@/common/funcs/convertValue";

function SelectMulti({
  placeholder = "Chọn giá trị",
  value,
  options,
  searchable,
  onChange,
  error,
  label,
  required,
  isAllOption,
  disabled,
}: PropsSelectMulti) {
  const [selected, setSelected] = useState<string[]>(value || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelected(value || []);
  }, [value]);

  const filterOptions = useMemo(() => {
    let _options = options || [];

    if (searchTerm) {
      _options = _options.filter((option) => {
        if (!searchTerm) return true;
        return removeVnTone(option.name)?.toLowerCase().includes((removeVnTone(searchTerm) || "").toLowerCase())
      }
      );
    }

    if (!!isAllOption && !searchTerm) {
      _options = [
        {
          id: SELECT_OPTION_ALL,
          name: "Tất cả",
        },
        ..._options,
      ];
    }

    return _options;
  }, [isAllOption, options, searchTerm]);

  const handleSelect = (id: string, checked: boolean | "indeterminate") => {
    let newSelected = [...selected];

    if (id === SELECT_OPTION_ALL) {
      if (checked === true) {
        // Select all
        const allIds = options?.map((o) => o.id || "").filter((id) => id) || [];
        newSelected = allIds;
      } else {
        // Deselect all
        newSelected = [];
      }
    } else {
      if (checked === true) {
        newSelected.push(id);
      } else {
        newSelected = newSelected.filter((item) => item !== id);
      }
    }

    // Update state
    setSelected(newSelected);
    onChange?.(newSelected?.length > 0 ? newSelected : undefined);
  };

  const isAllSelected = useMemo(() => {
    if (!options || options.length === 0) return false;
    return options.every((o) => selected.includes(o.id || ""));
  }, [options, selected]);

  const displayValue = useMemo(() => {
    if (selected.length === 0) return null;
    if (isAllOption && isAllSelected) return "Tất cả";

    const selectedNames = options
      ?.filter((o) => selected.includes(o.id || ""))
      .map((o) => o.name);

    if (!selectedNames?.length) return null;

    return selectedNames.join(", ");
  }, [selected, options, isAllOption, isAllSelected]);

  return (
    <div className={styles.container}>
      {!!label && (
        <div className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}:
        </div>
      )}
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>
          <button
            className={clsx(styles.trigger, { [styles.error]: !!error })}
            style={{ pointerEvents: disabled ? "none" : "auto", opacity: disabled ? 0.5 : 1 }}
            disabled={disabled}
            type="button"
          >
            <div className={styles.inputContainer}>
              <div className={styles.selectedOption}>
                {displayValue || <span className={styles.placeholder}>{placeholder}</span>}
              </div>
            </div>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="currentcolor" xmlns="http://www.w3.org/2000/svg"
              className={clsx(styles.triggerIcon, "rt-SelectIcon")} aria-hidden="true">
              <path d="M0.135232 3.15803C0.324102 2.95657 0.640521 2.94637 0.841971 3.13523L4.5 6.56464L8.158 3.13523C8.3595 2.94637 8.6759 2.95657 8.8648 3.15803C9.0536 3.35949 9.0434 3.67591 8.842 3.86477L4.84197 7.6148C4.64964 7.7951 4.35036 7.7951 4.15803 7.6148L0.158031 3.86477C-0.0434285 3.67591 -0.0536285 3.35949 0.135232 3.15803Z"></path></svg>
          </button>
        </Popover.Trigger>
        <Popover.Content className={styles.popoverContent}>
          {!!searchable && (
            <div className={styles.searchContainer}>
              <Search onChange={setSearchTerm} />
            </div>
          )}
          <div className={styles.optionsContainer}>
            {filterOptions.map((option) => {
              const isAll = option.id === SELECT_OPTION_ALL;
              let isChecked = false;

              if (isAll) {
                isChecked = isAllSelected;
              } else {
                isChecked = selected.includes(option.id || "");
              }

              return (
                <div
                  key={option.id}
                  className={styles.item}
                  onClick={() => {
                    handleSelect(option.id || "", !isChecked);
                  }}
                >
                  {isChecked &&
                    <span aria-hidden="true" className="rt-SelectItemIndicator">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="currentcolor" xmlns="http://www.w3.org/2000/svg"
                        className={clsx(styles.itemIndicator, "rt-SelectItemIndicatorIcon")}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.53547 0.62293C8.88226 0.849446 8.97976 1.3142 8.75325 1.66099L4.5083 8.1599C4.38833 8.34356 4.19397 8.4655 3.9764 8.49358C3.75883 8.52167 3.53987 8.45309 3.3772 8.30591L0.616113 5.80777C0.308959 5.52987 0.285246 5.05559 0.563148 4.74844C0.84105 4.44128 1.31533 4.41757 1.62249 4.69547L3.73256 6.60459L7.49741 0.840706C7.72393 0.493916 8.18868 0.396414 8.53547 0.62293Z"></path></svg>
                    </span>
                  }
                  <Text size="3">{option.name}</Text>
                  {/* {isChecked && <Checkbox checked={true} style={{ pointerEvents: "none" }} />} */}
                </div>
              );
            })}
            {filterOptions.length === 0 && (
              <div style={{ padding: "10px", textAlign: "center", color: "var(--gray-9)" }}>
                <Text size="2">Không có dữ liệu</Text>
              </div>
            )}
          </div>
        </Popover.Content>
      </Popover.Root>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}

export default SelectMulti;
