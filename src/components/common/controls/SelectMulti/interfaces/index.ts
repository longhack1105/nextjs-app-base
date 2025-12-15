import { Option } from "../../Select/interfaces";

export interface PropsSelectMulti {
    options?: Option[];
    value?: string[];
    searchable?: boolean;
    onChange?: (value?: string[]) => void;
    error?: string;
    label?: string;
    required?: boolean;
    isAllOption?: boolean;
    placeholder?: string;
    disabled?: boolean;
}

export type { Option };
