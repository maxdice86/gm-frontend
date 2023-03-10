import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import SearchViewTable from "./SearchViewTable";

export default function ListSelectedRecord(props) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleBack() {
    navigate("/");
  }

  return (
    <div className="list">
      <div>
        <button onClick={handleBack} className="btn btn-danger btn-sm">
          BACK
        </button>
        {(location.state !== null) & (location.state !== "") ? (
          <SearchViewTable client={location.state} />
        ) : (
          <p>Please Enter Client's Name</p>
        )}
      </div>
    </div>
  );
}
