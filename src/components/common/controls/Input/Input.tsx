import { TextField } from "@radix-ui/themes";
import styles from "./Input.module.scss";
import { PropsInput } from "./interfaces";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({
  label,
  size = "3",
  placeholder = "Nhập nội dung",
  required = false,
  error,
  childrenLeft,
  childrenRight,
  ...restProps
}: PropsInput) {
  const [isShowPass, setIsShowPass] = useState<"password" | "text">("password");
  const isError = useMemo(() => {
    if (error == "") return true;
    if (!!error) return true;
    return false;
  }, [error]);

  return (
    <div className={styles.container}>
      {!!label && (
        <div className={styles.label} suppressHydrationWarning>
          {label} {required && <span className={styles.required}>*</span>}:
        </div>
      )}
      <TextField.Root
        className={clsx(styles.inputContainer, { [styles.error]: isError })}
        size={size}
        placeholder={placeholder}
        {...restProps}
        type={restProps.type === "password" ? (isShowPass as any) : restProps.type}
      >
        <TextField.Slot {...(!childrenLeft ? { pr: "0" } : {})} className={clsx(styles.left, { [styles.show]: !!childrenLeft })}>
          {childrenLeft || <></>}
        </TextField.Slot>
        {restProps.type == "password" ? (
          <TextField.Slot
            className={clsx(styles.right, styles.show, styles.password)}
            onClick={() => setIsShowPass((prev: any) => (prev == "password" ? "text" : "password"))}
          >
            {isShowPass == "password" ? <Eye size={20} /> : <EyeOff size={20} />}
          </TextField.Slot>
        ) : (
          <TextField.Slot
            {...(!childrenRight ? { pl: "0" } : {})}
            className={clsx(styles.right, { [styles.show]: !!childrenRight })}
          >
            {childrenRight || <></>}
          </TextField.Slot>
        )}
      </TextField.Root>
      {isError && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}

export default Input;
