import React, { useState, useRef, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { getClientReord } from "../services/RestServices";
import TableHeader from "./TableHeader";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";

const SearchViewTable = (props) => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Name", field: "name" },
    { headerName: "Clients", field: "clients" },
    { headerName: "Hours", field: "hours" },
    { headerName: "Billable Hours", field: "billableHours" },
    {
      headerName: "Billable Amount",
      field: "billableAmount",
      valueFormatter: (p) => {
        return "$" + parseFloat(p.value).toFixed(2);
      },
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    }),
    []
  );

  useEffect(() => {
    getClientReord(props.client).then((res) => {
      setRowData(res.data);
    });
  }, []);

  return (
    <div>
      <TableHeader data={rowData} />
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "50vh" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          showToolPanel={true}
          animateRows={true}
          rowSelection="multiple"
        />
      </div>
    </div>
  );
};

export default SearchViewTable;
