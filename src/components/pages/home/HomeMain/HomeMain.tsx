"use client";

import { toastError, toastInfo, toastSuccess, toastText, toastWarn } from "@/common/funcs/toast";
import styles from "./HomeMain.module.scss";
import { PropsHomeMain } from "./interfaces";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/common/controls/Button";
import FormTest from "../FormTest";

function HomeMain({ }: PropsHomeMain) {
  const router = useRouter();

  return (
    <div>
      HomeMain
      <div>
        <button
          onClick={() => {
            console.log("click");
            toastText({ msg: "ádasdadas" });
          }}
        >
          toastText
        </button>
        <hr />
        <button
          onClick={() => {
            console.log("click");
            toastSuccess({ msg: "ádasdadas" });
          }}
        >
          toastSuccess
        </button>
        <hr />
        <button
          onClick={() => {
            console.log("click");
            toastInfo({ msg: "ádasdadas" });
          }}
        >
          toastInfo
        </button>
        <hr />
        <button
          onClick={() => {
            console.log("click");
            toastWarn({ msg: "ádasdadas" });
          }}
        >
          toastWarn
        </button>
        <hr />
        <button
          onClick={() => {
            console.log("click");
            toastError({ msg: "ádasdadas" });
          }}
        >
          toastError
        </button>

        <hr />
        <hr />
        <hr />
        <Button
          // color="red"
          onClick={() => {
            router.push("/profile");
          }}
        >
          go to profile
        </Button>
        <hr />
        <hr />
        <h2>Test Form</h2>
        <FormTest />
        <hr />
        <hr />
      </div>
    </div>
  );
}

export default HomeMain;
