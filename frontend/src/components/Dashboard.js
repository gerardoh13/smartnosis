import React, { useState } from "react";

function PatientsTable({ patients = [{id: 1, firstName: "Rafael", dob: "6/15/22"}, {id: 2, firstName: "Gerardo", dob: "08/13/92"}] }) {

  const createRows = (arr) => {
    return arr.map((p) => (
      <tr key={p.id} >
        <td>{p.firstName}</td>
        <td>{p.dob}</td>

      </tr>
    ));
  };

  return (
    <div className="card col-4">
            <h5 class="card-title">Patients</h5>

      <table className="table table-striped bg-light">
        <thead>
          <tr>
            <th className="wThird" scope="col">Name</th>
            <th className="wThird" scope="col">Date of Birth</th>
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
