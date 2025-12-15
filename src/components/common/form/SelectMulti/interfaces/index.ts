import { Option } from "@/components/common/controls/Select/interfaces";

export interface PropsSelectMulti {
    name: string;
    label?: string;
    value?: string[];
    options?: Option[];
    searchable?: boolean;
    onChange?: (value?: string[]) => void;
    isAllOption?: boolean;
    placeholder?: string;
    disabled?: boolean;
}
