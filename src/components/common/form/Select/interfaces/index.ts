import { Option } from "@/components/common/controls/Select/interfaces";

export interface PropsSelect {
    name: string;
    label?: string;
    value?: string;
    options?: Option[];
    searchable?: boolean;
    onChange?: (value: string) => void;
    isAllOption?: boolean;
    isCancelOption?: boolean;
}
