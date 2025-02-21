import { useState } from "react";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  ValidationModule,
  CustomEditorModule,
  ColDef,
  themeBalham,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component

import PriceCellRenderer from "./CellRenderers/PriceCellRenderer";
import PriceCellEditor from "./CellEditors/PriceCellEditor";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  CustomEditorModule,
]);

interface ICar {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

const colDefs: ColDef<ICar>[] = [
  { field: "make" },
  { field: "model" },
  {
    field: "price",
    editable: true,
    cellRenderer: PriceCellRenderer,
    cellEditor: PriceCellEditor,
  },
  { field: "electric" },
];

const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData] = useState<ICar[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  return (
    // wrapping container with theme & size
    <div style={{ height: 500 }}>
      <AgGridReact theme={themeBalham} rowData={rowData} columnDefs={colDefs} />
    </div>
  );
};

export default GridExample;
