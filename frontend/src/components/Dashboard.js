import React, { useState } from "react";

function PatientsTable({ patients = [{id: 1, firstName: "Rafael", dob: "6/15/22"}, {id: 2, firstName: "Gerardo", dob: "08/13/92"}] }) {

  const createRows = (arr) => {
    return arr.map((p) => (
      <tr key={p.id} >
        <td>{p.firstName}</td>
        <td>{p.dob}
        </td>
        <td><button className="btn btn-success">PDF</button></td>

      </tr>
    ));
  };

  return (
    <div className="card col-4 my-auto">
            <h5 class="card-title mt-3 ms-2">Intake Forms</h5>

      <table className="table table-striped bg-light">
        <thead>
          <tr>
            <th className="wThird" scope="col">Name</th>
            <th className="wThird" scope="col">Date of Birth</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {createRows(patients.slice(0, 3))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsTable;
