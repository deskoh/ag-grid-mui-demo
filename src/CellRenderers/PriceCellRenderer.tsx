import { CustomCellRendererProps } from "ag-grid-react";

const PriceCellRenderer: React.FC<CustomCellRendererProps> = (props) => {
  const value = Number(props.value);
  const text = value.toLocaleString(undefined, {
    style: "currency",
    currency: "SGD",
  });

  return <span>{text}</span>;
};

export default PriceCellRenderer;
