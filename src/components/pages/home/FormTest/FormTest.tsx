import { use, useCallback, useState } from "react";
import styles from "./FormTest.module.scss";
import { PropsFormTest } from "./interfaces";
import Form from "@/components/common/form/Form";
import Input from "@/components/common/form/Input";
import Select from "@/components/common/form/Select";
import Button from "@/components/common/controls/Button";
import SelectMulti from "@/components/common/form/SelectMulti";

function FormTest({ }: PropsFormTest) {
  const [form, setForm] = useState<any>({});

  return (
    <Form
      form={form}
      setForm={setForm}
      validate={{
        name: true,
        email: {
          required: true,
          // min: {
          //   value: 10,
          //   message: "Vui lòng nhập giá trị lớn hơn hoặc bằng 10",
          // },
          // minLength: {
          //   value: 5,
          //   message: "Vui lòng nhập ít nhất 5 ký tự",
          // },
          // email: true,
        },
        phone: {
          required: true,
          // phone: true,
        },
        password: {
          required: true,
          // password: true,
        },
        rePassword: {
          required: true,
          // password: true,
          // confirm: {
          //   value: "password",
          //   message: "Mật khẩu không khớp",
          // },
        },
        fruit: {
          required: true,
        },
        fruit2: {
          required: true,
        }
      }}
    >
      <Input name="name" label="Tên" placeholder="Nhập tên" />
      <Input name="email" label="email" placeholder="Nhập email" />
      <Input name="phone" label="phone" placeholder="Nhập phone" />
      <Input name="password" label="password" placeholder="Nhập password" type="password" />
      <Input name="rePassword" label="Nhập lại password" placeholder="Nhập lại password" type="password" />
      {/* <hr /> */}
      <Select
        label="Fruit"
        name="fruit"
        isAllOption
        isCancelOption
        searchable
        options={[
          {
            id: "0",
            name: "Orange",
          },
          {
            id: "1",
            name: "Apple",
          },
          {
            id: "2",
            name: "Banana",
          },
          {
            id: "3",
            name: "Mango",
          },
          {
            id: "4",
            name: "Pineapple",
          },
          {
            id: "5",
            name: "Pear",
          },
        ]} />
      <SelectMulti
        name="fruit2"
        label="Fruit 2"
        isAllOption
        searchable
        // isCancelOption
        options={[
          {
            id: "0",
            name: "hả",
          },
          {
            id: "1",
            name: "Apple",
          },
          {
            id: "2",
            name: "Banana",
          },
          {
            id: "3",
            name: "Mango",
          },
          {
            id: "4",
            name: "Pineapple",
          },
          {
            id: "5",
            name: "Pear",
          },
        ]} ></SelectMulti>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default FormTest;
