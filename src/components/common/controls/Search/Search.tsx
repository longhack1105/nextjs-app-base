import { TextField } from "@radix-ui/themes";
import styles from "./Search.module.scss";
import { PropsSearch } from "./interfaces";
import { SearchIcon } from "lucide-react";

function Search({ onChange }: PropsSearch) {

  // handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    e.preventDefault();
  };

  return (
    <div>
      <TextField.Root placeholder="Search the docs…" onChange={handleSearch} onKeyDown={(e) => e.stopPropagation()} >
        <TextField.Slot>
          <SearchIcon size={18} />
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
}

export default Search;
