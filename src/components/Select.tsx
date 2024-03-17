import { MenuItem, Select, SelectProps, SelectVariants } from "@mui/material";

type CustomSelectProps<
  Value = unknown,
  Variant extends SelectVariants = "outlined",
> = Omit<SelectProps<Value, Variant>, "variant"> & {
  options: string[] | { label: string; value: string }[];
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, ...rest }) => {
  const items = options.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item,
  );
  return (
    <Select {...rest}>
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
