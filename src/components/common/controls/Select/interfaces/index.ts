export interface PropsSelect {
  options?: Option[];
  value?: string;
  searchable?: boolean;
  onChange?: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
  isAllOption?: boolean;
  isCancelOption?: boolean;
  placeholder?: string;
}

export interface Option {
  id?: string;
  name?: string;
  [key: string]: any;
}