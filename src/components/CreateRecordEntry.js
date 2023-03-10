import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createClientReord } from "../services/RestServices";
import { useNavigate } from "react-router-dom";

export default function CreateRecordEntry() {
  const navigate = useNavigate();
  const [dates, setDate] = useState("");
  const [clients, setClient] = useState("");
  const [project, setProject] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [hours, setHours] = useState("");
  const [billable, setBillable] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [billRate, setBillRate] = useState("");

  const handleBillRate = (e) => {
    console.log(billable);
    billable === "No" ? setBillRate(() => 0) : setBillRate(e.target.value);
  };

  //function to create new record in database
  function handleSubmit(e) {
    const newRecord = {
      dates,
      clients,
      project,
      projectCode,
      hours,
      billable,
      firstName,
      lastName,
      billRate,
    };
    //Checks if null values or empty values were passed to records object
    if (
      !(
        Object.values(newRecord).includes(!null) &&
        Object.values(newRecord).includes(!"")
      )
    ) {
      //call to create record in database
      createClientReord(newRecord).then((response) => {
        console.log(response.data);
        alert("User Added Sucessfully");
      });
    }
  }

  //back button function call
  function handleBack() {
    navigate("/");
  }

  return (
    <div className="addRec">
      <button onClick={handleBack} className="btn btn-danger ">
        BACK
      </button>
      {/* From for adding new record entries*/}
      <div className="rec-container">
        <section className="form-entry ">
          {/* <h2 className="text-center text-muted">ADD RECORD</h2> */}
          <div className="row">
            <div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-2">
                    {/* First Name field*/}
                    <label className="form-label"> First Name :</label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      name="firstName"
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setfirstName(e.target.value)}
                      required
                    ></input>
                  </div>
                  {/* Last Name field*/}
                  <div className="form-group mb-2">
                    <label className="form-label"> Last Name :</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter last name"
                      name="lastName"
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setlastName(e.target.value)}
                    ></input>
                  </div>
                  {/* Client field*/}
                  <div className="form-group mb-2">
                    <label htmlFor="clients" className="form-label">
                      {" "}
                      Client :
                    </label>
                    <input
                      type="text"
                      placeholder="Enter client name"
                      name="clients"
                      className="form-control"
                      value={clients}
                      required
                      onChange={(e) => setClient(e.target.value)}
                    ></input>
                  </div>
                  {/* Project field*/}
                  <div className="form-group mb-2">
                    <label className="form-label"> Project:</label>

                    <input
                      type="text"
                      placeholder="Enter project name"
                      name="project"
                      className="form-control"
                      value={project}
                      required
                      onChange={(e) => setProject(e.target.value)}
                    ></input>
                  </div>
                  {/* Project Code field*/}
                  <div className="form-group mb-2">
                    <label className="form-label"> Project Code :</label>
                    <input
                      type="text"
                      placeholder="Enter project"
                      name="projectCode"
                      className="form-control"
                      value={projectCode}
                      required
                      onChange={(e) => setProjectCode(e.target.value)}
                    ></input>
                  </div>
                  {/*Hours field*/}
                  <div className="form-group mb-2">
                    <label className="form-label"> Hours :</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="Enter hours"
                      name="hours"
                      className="form-control"
                      value={hours}
                      min={0}
                      required
                      onChange={(e) => setHours(e.target.value)}
                    ></input>
                  </div>
                  {/* Billable field*/}
                  <div className="form-group mb-2">
                    <label className="form-label"> Billable :</label>
                    <select
                      name="Billable"
                      onChange={(e) => setBillable(e.target.value)}
                      defaultValue=""
                      required
                      className="form-control"
                    >
                      <option value="N/A"></option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {/* BillRate field*/}
                  <div className="form-group mb-2">
                    <label className="form-label"> BillRate :</label>
                    <input
                      type="number"
                      placeholder="Enter bill rate"
                      name="billRate"
                      className="form-control"
                      value={billRate}
                      required
                      min={0}
                      onChange={handleBillRate}
                    ></input>
                  </div>

                  {/* Date field*/}
                  <div className="form-group mb-2">
                    <label htmlFor="dates" className="form-label">
                      {" "}
                      Date :
                    </label>
                    <input
                      type="date"
                      placeholder="YYYY/MM/DD"
                      name="dates"
                      className="form-control"
                      value={dates}
                      required
                      onChange={(e) => setDate(e.target.value)}
                    ></input>
                  </div>
                  {/* Submit and Cancel Buttons */}
                  <section className="confrim">
                    <button id="sub" className="btn btn-success" type="submit">
                      Submit
                    </button>
                    <Link
                      id="cancel"
                      to="/"
                      className="btn btn-danger"
                      reloadDocument
                    >
                      Cancel
                    </Link>
                  </section>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
