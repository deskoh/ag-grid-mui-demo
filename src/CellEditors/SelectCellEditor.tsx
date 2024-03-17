import { memo, useCallback, useEffect, useState } from "react";
import { CustomCellEditorProps } from "ag-grid-react";
import { SelectChangeEvent } from "@mui/material";

import { ICar } from "../interface";
import Select from "../components/Select";

interface SelectCellEditorProps extends CustomCellEditorProps<ICar, string> {
  options: string[];
}

const SelectCellEditor: React.FC<SelectCellEditorProps> = memo(
  ({ onValueChange, value, stopEditing, options }) => {
    const [open, setOpen] = useState(true);
    const onChange = useCallback(
      (event: SelectChangeEvent<unknown>) => {
        onValueChange(event.target.value as string);
        setOpen(false);
        stopEditing();
      },
      [onValueChange, stopEditing],
    );
    useEffect(() => {
      setOpen(true);
    }, []);
    return (
      <Select open={open} options={options} value={value} onChange={onChange} />
    );
  },
);

export default SelectCellEditor;
