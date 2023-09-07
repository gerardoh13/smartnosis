import React, { useContext, useState, useEffect } from "react";
import SmartnosisApi from "../api";
import ProviderContext from "../common/ProviderContext";

function PatientsTable() {
  const [intakes, setIntakes] = useState([]);

  const { currProvider } = useContext(ProviderContext);

  useEffect(() => {
    const getActivity = async () => {
      const { lastMidnight, nextMidnight } = getMidnights();
      const res = await SmartnosisApi.getByDate(
        currProvider.id,
        lastMidnight,
        nextMidnight
      );
      setIntakes(res.intakes);
    };
    getActivity();
  }, [currProvider.id]);

  const getMidnights = () => {
    let midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    let lastMidnight = midnight.getTime() / 1000;
    midnight.setDate(midnight.getDate() + 1);
    let nextMidnight = midnight.getTime() / 1000;
    return { lastMidnight, nextMidnight };
  };

  const generatePdf = async (intakeId) => {
    let res = await SmartnosisApi.generatePDF(currProvider.id, intakeId);
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
  const createRows = (arr) => {
    return arr.map((p) => (
      <tr key={p.id}>
        <td>{`${p.lastName}, ${p.middleName ? p.middleName[0] + "." : ""} ${
          p.firstName
        }`}</td>
        <td>{p.dob}</td>
        <td>
          <button className="btn btn-success" onClick={() => generatePdf(p.id)}>
            PDF
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="card col-4 my-auto">
      <h5 className="card-title mt-3 ms-2">Intake Forms</h5>

      <table className="table table-striped bg-light">
        <thead>
          <tr>
            <th className="wThird" scope="col">
              Name
            </th>
            <th className="wThird" scope="col">
              Date of Birth
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>{createRows(intakes.slice(0, 3))}</tbody>
      </table>
    </div>
  );
}

export default PatientsTable;
