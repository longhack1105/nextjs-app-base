import styles from "./Form.module.scss";
import { defaultErrorText, enumKeyValidate, enumTypeSetError, FormContextData, getErrorByNameValue, PropsForm, PropsValidate } from "./interfaces";
import { FormContext } from "./contexts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { convertValidate } from "./funcs/convert";

function Form({ children, form, setForm, onSubmit, validate }: PropsForm) {
  //#region Khai báo
  const [timer, setTimer] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});
  const [errorCounter, setErrorCounter] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const validateConverted = useMemo(() => {
    return convertValidate(validate);
  }, [validate]);

  const setError = useCallback(
    (name: string, value?: { value?: string }, typeSetError: enumTypeSetError = enumTypeSetError.show) => {
      setErrorCounter((prev: number) => prev + 1);
      if (timer) clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          let newError = getErrorByNameValue(name, value, typeSetError, form, validateConverted);

          setErrors((prev: any) => ({
            ...prev,
            ...newError
          }));
        }, 200)
      );
    },
    [form, validateConverted]
  );

  const setAllError = useCallback((typeSetError: enumTypeSetError) => {
    console.log(form);
    Object.keys(validateConverted || {}).map((key) => {
      setError(key, { value: form?.[key] }, typeSetError)
    })
  }, [form, validateConverted, setError]);

  const checkAllError = useCallback(() => {
    let isError = false;
    let errors: any = {};

    Object.keys(validateConverted || {}).map((key: any) => {
      let error = getErrorByNameValue(key, form?.[key], enumTypeSetError.hide, form, validateConverted);
      errors = {
        ...errors,
        ...error
      };
    });

    if (Object.keys(errors).filter((key) => !!errors[key]).length > 0) {
      isError = true;
    }

    return isError;
  }, [form, validateConverted]);

  console.log(form);



  //#endregion Khai báo

  //#region UseEffect
  useEffect(() => {
    setIsDone(Object.keys(errors).length === 0);
  }, [errors]);
  //#endregion UseEffect

  //#region handle
  const handleSubmit = useCallback(
    (e: any) => {
      if (isDone) {
        console.log("submit");
        onSubmit?.(e);
      } else {
        setAllError(enumTypeSetError.show);
      }
      e.preventDefault();
    },
    [onSubmit, isDone, setAllError]
  );
  //#endregion handle

  useEffect(() => {
    if (errorCounter === 0) {
      setIsDone(!checkAllError());
    }
  }, [errorCounter, checkAllError]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className={styles.container}>
      <FormContext.Provider
        value={
          {
            form,
            setForm,
            validate: validateConverted,
            errors,
            setError,
            isDone,
          } as FormContextData
        }
      >
        <form onSubmit={handleSubmit}>{children}</form>
      </FormContext.Provider>
    </div>
  );
}

export default Form;
