import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { getGroupedRecords, deleteRecords } from "../services/RestServices";

import TableHeader from "./TableHeader";
import ModalAddRecord from "./ModalAddRecord";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";

const TableView = (props) => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [toDelete, setDelete] = useState([]);

  const [show, setShow] = useState(false);

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Name", field: "name" },
    { headerName: "Clients", field: "clients" },
    { headerName: "Hours", field: "hours" },
    {
      headerName: "Billable Hours",
      field: "billableHours",
      valueFormatter: (p) => {
        return `${p.value} (${billFormat(
          p.value,
          parseFloat(p.data.hours).toFixed(2)
        )}%)`;
      },
    },
    {
      headerName: "Billable Amount",
      field: "billableAmount",
      valueFormatter: (p) => {
        return (
          "$" + p.value.toLocaleString("en-US", { minimumFractionDigits: 2 })
        );
      },
    },
  ]);

  const billFormat = (h, bh) => {
    console.log(typeof h);
    return h === 0 ? 0 : ((h / bh) * 100).toFixed(0);
  };

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
    if (!props.all) {
      getGroupedRecords().then((res) => {
        setRowData(
          res.data.filter((v) => {
            return v.billableAmount > 0;
          })
        );
        setTableData(
          res.data.filter((v) => {
            return v.billableAmount > 0;
          })
        );
      });
    } else if (props.all) {
      getGroupedRecords().then((res) => {
        setRowData(() => res.data);
        setTableData(() => res.data);
      });
    }
  }, []);

  const onSelectionChanged = (event) => {
    // console.log(event.api.getSelectedRows().map((r)=>{return r.name}))

    event.api.getSelectedRows().length > 0
      ? setTableData(() => event.api.getSelectedRows())
      : setTableData(() => rowData);

    setDelete(
      event.api.getSelectedRows().map((r) => {
        return r.name;
      })
    );
    console.log("added", toDelete);
  };

  const buttonListener = (e) => {
    e.preventDefault();
    gridRef.current.api.deselectAll();
    setDelete((pre) => []);
  };

  const handleDelete = (e) => {
    deleteRecords(toDelete);
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <div>
      <TableHeader data={tableData} />
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "50vh" }}
      >
        <form>
          <button
            className="btn btn-primary btn-sm"
            style={{ marginBottom: 5 }}
            onClick={buttonListener}
          >
            Clear
          </button>
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginBottom: 5, marginLeft: 5 }}
            onClick={handleDelete}
            type="submit"
          >
            Delete
          </button>
          <button
            className="btn btn-success btn-sm"
            style={{ marginBottom: 5, marginLeft: 5 }}
            onClick={handleShow}
            // type="submit"
          >
            Add Record
          </button>
        </form>

        <ModalAddRecord show={show} setShow={setShow} />
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          showToolPanel={true}
          animateRows={true}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
          rowMultiSelectWithClick={true}
        />
      </div>
    </div>
  );
};

export default TableView;
