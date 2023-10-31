import React, { useContext, useState, useEffect } from "react";
import ProviderContext from "../common/ProviderContext";
import DatePicker from "./DatePicker";
import { formatTime } from "../intake/commonFuncs";

function IntakesByDate({ generatePdf, getActivity, currDate, setCurrDate }) {
  const [intakes, setIntakes] = useState([]);
  const { currProvider } = useContext(ProviderContext);

  useEffect(() => {
    const fetchData = async () => {
      setIntakes(await getActivity("intakes"));
    };
    fetchData();
  }, [currProvider, currDate, getActivity]);

  const createRows = (arr) => {
    return arr.map((p) => (
      <tr key={p.id}>
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
      <h3 className="card-title ms-3 my-3">Intakes</h3>
      <DatePicker currDate={currDate} setCurrDate={setCurrDate} />
      <hr />
      {intakes.length ? (
        <table className="table table-striped bg-light text-center">
          <thead>
            <tr>
              <th scope="col" className="text-start">
                Name
              </th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Time Submitted</th>
              <th />
            </tr>
          </thead>
          <tbody>{createRows(intakes)}</tbody>
        </table>
      ) : (
        <p className="text-center">Completed intakes will appear here</p>
      )}
    </div>
  );
}

export default IntakesByDate;
