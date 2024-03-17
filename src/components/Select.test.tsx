import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Select from "./Select";

describe("Select", () => {
  test("renders learn react link", () => {
    render(<Select options={[]} value="" />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("renders Select component with options", async () => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ];
    render(<Select options={options} value="" />);

    await userEvent.click(screen.getByRole("combobox"));
    options.forEach((option) => {
      const optionElement = screen.getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test("calls onChange callback with selected option", async () => {
    const onChangeMock = jest.fn();
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ];
    render(<Select options={options} value="" onChange={onChangeMock} />);

    // Simulate selecting an option
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Option 2"));

    // Check if onChange callback is called with the correct value
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: options[1].value },
      }),
      expect.anything(),
    );
  });
});
