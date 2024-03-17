import { memo, useRef, useEffect, useCallback } from "react";
import { CustomCellEditorProps, useGridCellEditor } from "ag-grid-react";

import { ICar } from "../interface";

const allowedKeys = [
  "Backspace",
  "Delete",
  "Tab",
  "Enter",
  "Escape",
  "Home",
  "End",
  "ArrowLeft",
  "ArrowRight",
];

const onKeyDownListener: React.KeyboardEventHandler = (event) => {
  // Allow only backspace and numeric keys
  if (
    allowedKeys.includes(event.key) ||
    // Allow: Ctrl+A, Command+A
    (event.key === "a" && (event.ctrlKey === true || event.metaKey === true)) ||
    // Allow: Ctrl+C, Command+C
    (event.key === "c" && (event.ctrlKey === true || event.metaKey === true)) ||
    // Allow: Ctrl+V, Command+V
    (event.key === "v" && (event.ctrlKey === true || event.metaKey === true)) ||
    // Allow: Ctrl+X, Command+X
    (event.key === "x" && (event.ctrlKey === true || event.metaKey === true))
  ) {
    // let it happen, don't do anything
    return;
  }

  // Ensure that it is a number and stop the keypress
  if (
    (event.shiftKey || event.key < "0" || event.key > "9") &&
    event.key !== "."
  ) {
    event.preventDefault();
  }
};

const PriceCellEditor: React.FC<CustomCellEditorProps<ICar, number>> = memo(
  ({ onValueChange, value }) => {
    const refInput = useRef<HTMLInputElement>(null);

    const onChangeListener: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event) => {
          onValueChange(
            event.target.value === "" ? null : parseInt(event.target.value, 10),
          );
        },
        [onValueChange],
      );

    useEffect(() => refInput.current?.focus(), []);

    // Gets called once when editing is finished (eg if Enter is pressed).
    // If you return true, then the result of the edit will be ignored.
    const isCancelAfterEnd = useCallback(() => {
      // Do not allow empty value
      return value === null;
    }, [value]);

    useGridCellEditor({
      isCancelAfterEnd,
    });

    return (
      <input
        onKeyDown={onKeyDownListener}
        value={value ?? ""}
        onChange={onChangeListener}
        ref={refInput}
      />
    );
  },
);

export default PriceCellEditor;
