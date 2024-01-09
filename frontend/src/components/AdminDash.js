import React, { useContext, useState, useEffect } from "react";
import ProviderContext from "../common/ProviderContext";
import SmartnosisApi from "../api";

function AdminDash() {
  const [role, setRole] = useState("hcp");
  const [invitations, SetInvitations] = useState({
    hcps: { sent: [], active: [] },
    staff: { sent: [], active: [] },
  });

  const { currUser } = useContext(ProviderContext);

  useEffect(() => {
    const fetchAdminData = async () => {
      let invites = await SmartnosisApi.getInvitations(currUser.providerId);
      console.log(invites);
      SetInvitations(invites);
    };
    fetchAdminData();
  }, [currUser.providerId]);

  const createRows = (arr) => {
    return arr.map((email) => (
      <tr key={email} className="align-middle">
        <td>{email}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => console.log("click")}
          >
            PDF
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title ms-2 mb-3">Admin Dashboard</h4>
        <div className="mt-3">
          {/* <span className="text-start ms-1 me-3">
        </span> */}
          <div className="text-center">
            {/* Hcp */}
            <input
              type="radio"
              className="btn-check ms-3"
              name="role"
              id="hcp"
              autoComplete="off"
              onChange={() => setRole("hcp")}
              checked={role === "hcp"}
            />
            <label className="btn btn-outline-secondary me-2" htmlFor="hcp">
              HCP
            </label>
            {/* Non-HCP */}
            <input
              type="radio"
              className="btn-check"
              name="role"
              id="staff"
              autoComplete="off"
              onChange={() => setRole("staff")}
              checked={role === "staff"}
            />
            <label className="btn btn-outline-secondary me-2" htmlFor="staff">
              Non-HCP
            </label>
          </div>
        </div>
        <hr />

        <table className="table table-striped table-sm bg-light">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th />
            </tr>
          </thead>
          <tbody>{createRows(invitations.hcps.sent)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDash;
