import React, { useContext, useState, useEffect } from "react";
import ProviderContext from "../common/ProviderContext";
import DatePicker from "./DatePicker";
import { formatTime } from "../common/commonFuncs";

function IntakesByDate({ generatePdf, getActivity, currDate, setCurrDate }) {
  const [intakes, setIntakes] = useState([]);
  const { currUser } = useContext(ProviderContext);

  useEffect(() => {
    const fetchData = async () => {
      setIntakes(await getActivity("intakes"));
    };
    fetchData();
  }, [currUser, currDate, getActivity]);

  const createRows = (arr) => {
    return arr.map((p) => (
      <tr key={p.id} className="align-middle">
        <td>{`${p.lastName}, ${p.middleName ? p.middleName[0] + "." : ""} ${
          p.firstName
        }`}</td>
        <td>{p.dob}</td>
        <td>{formatTime(p.submittedAt)}</td>
        <td>
          <button className="btn btn-success" onClick={() => generatePdf(p.id)}>
            PDF
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title ms-2 mb-3">Intakes</h4>
        <DatePicker currDate={currDate} setCurrDate={setCurrDate} />
        <hr />
        {intakes.length ? (
          <table className="table table-striped table-sm bg-light">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Submitted</th>
                <th />
              </tr>
            </thead>
            <tbody>{createRows(intakes)}</tbody>
          </table>
        ) : (
          <p className="text-center">Completed intakes will appear here</p>
        )}
      </div>
    </div>
  );
}

export default IntakesByDate;
