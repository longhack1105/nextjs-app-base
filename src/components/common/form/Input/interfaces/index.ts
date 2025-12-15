import { TextField } from "@radix-ui/themes";

export interface PropsInput extends TextField.RootProps {
  name: string;
  label?: string;
  required?: boolean;
}
