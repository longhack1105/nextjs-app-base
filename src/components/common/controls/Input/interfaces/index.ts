import { TextField } from "@radix-ui/themes";

export interface PropsInput extends TextField.RootProps {
  label?: string;
  required?: boolean;
  error?: string;
  childrenLeft?: any;
  childrenRight?: any;
}
