import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomCellEditorProps } from "ag-grid-react";

import SelectCellEditor from "./SelectCellEditor";

const makeCellEditorProps = () => {
  const mock = {} as any;
  const props: CustomCellEditorProps = {
    initialValue: "",
    value: "",
    onValueChange: jest.fn(),
    eventKey: "",
    column: mock,
    colDef: mock,
    node: mock,
    data: mock,
    rowIndex: 0,
    cellStartedEdit: false,
    onKeyDown: jest.fn(),
    stopEditing: jest.fn(),
    eGridCell: mock,
    parseValue: jest.fn(),
    formatValue: jest.fn(),
    api: mock,
    columnApi: mock,
    context: {},
  };
  return { ...props };
};

describe("SelectCellEditor", () => {
  test("should open on mount", () => {
    const props = makeCellEditorProps();
    render(<SelectCellEditor {...props} options={["option 1", "option 2"]} />);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.getByText("option 1")).toBeInTheDocument();
    expect(screen.getByText("option 2")).toBeInTheDocument();
  });

  test("should call onValueChange when selection changed", async () => {
    const props = makeCellEditorProps();
    const onValueChange = jest.fn();
    render(
      <SelectCellEditor
        {...props}
        onValueChange={onValueChange}
        options={["option 1", "option 2"]}
      />,
    );
    await userEvent.click(screen.getByText("option 2"));
    expect(onValueChange).toHaveBeenCalledWith("option 2");
  });

  test("should close and stop editing on selection", async () => {
    const props = makeCellEditorProps();
    const stopEditing = jest.fn();
    render(
      <SelectCellEditor
        {...props}
        stopEditing={stopEditing}
        options={["option 1", "option 2"]}
      />,
    );
    await userEvent.click(screen.getByText("option 2"));

    expect(stopEditing).toHaveBeenCalled();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.queryByRole("option 1")).not.toBeInTheDocument();
    expect(screen.queryByRole("option 2")).not.toBeInTheDocument();
  });
});
