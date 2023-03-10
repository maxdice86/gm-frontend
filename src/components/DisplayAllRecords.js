import React from "react";
import TableView from "./TableView";
import { useNavigate } from "react-router-dom";

function DisplayAllRecords(props) {
  const navigate = useNavigate();

  function handleBack() {
    navigate("/");
  }
  return (
    <div className="list">
      {/* Creates a TableView based on if all records are needed 
      or only billable records 
       */}
      {!props.all ? (
        <>
          <button onClick={handleBack} className="btn btn-danger btn-sm">
            BACK
          </button>
          <TableView all={false} />
        </>
      ) : (
        <TableView all={true} />
      )}
    </div>
  );
}

export default DisplayAllRecords;
