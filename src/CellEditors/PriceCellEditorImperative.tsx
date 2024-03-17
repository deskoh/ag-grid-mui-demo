import { CustomCellEditorProps } from "ag-grid-react";
import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
} from "react";

const PriceCellEditor: React.FC<CustomCellEditorProps> = forwardRef(
  (props, ref) => {
    const [value, setValue] = useState<number | "">(parseInt(props.value, 10));
    const refInput = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
      return {
        getValue() {
          return value;
        },
      };
    });

    const onKeyDownListener: React.KeyboardEventHandler = useCallback(
      (event) => {
        // Allow only backspace and numeric keys
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
        // Allow only backspace and numeric keys
        if (
          allowedKeys.includes(event.key) ||
          // Allow: Ctrl+A, Command+A
          (event.key === "a" &&
            (event.ctrlKey === true || event.metaKey === true)) ||
          // Allow: Ctrl+C, Command+C
          (event.key === "c" &&
            (event.ctrlKey === true || event.metaKey === true)) ||
          // Allow: Ctrl+V, Command+V
          (event.key === "v" &&
            (event.ctrlKey === true || event.metaKey === true)) ||
          // Allow: Ctrl+X, Command+X
          (event.key === "x" &&
            (event.ctrlKey === true || event.metaKey === true))
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
      },
      [],
    );

    const onChangeListener: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event) =>
          setValue(
            event.target.value === "" ? "" : parseInt(event.target.value, 10),
          ),
        [],
      );

    useEffect(() => refInput.current?.focus(), []);

    return (
      <input
        onKeyDown={onKeyDownListener}
        value={value}
        onChange={onChangeListener}
        ref={refInput}
      />
    );
  },
);

export default PriceCellEditor;
