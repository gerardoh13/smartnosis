import React, { useContext, useState, useEffect } from "react";
import ProviderContext from "../common/ProviderContext";
import SmartnosisApi from "../api";

function AdminDash() {
  const [role, setRole] = useState("hcp");
  const [recipient, setRecipient] = useState("");
  const [invitations, SetInvitations] = useState({
    hcp: { sent: [], active: [] },
    staff: { sent: [], active: [] },
  });

  const { currUser } = useContext(ProviderContext);

  useEffect(() => {
    const fetchAdminData = async () => {
      let invites = await SmartnosisApi.getInvitations(currUser.providerId);
      SetInvitations(invites);
    };
    fetchAdminData();
  }, [currUser.providerId]);

  const remaining = (r) => {
    let totalCount =
      r === "hcp" ? currUser.provider.hcpsCount : currUser.provider.staffCount;
      console.log(Object.values(invitations[r]).reduce((p, c) => p.length + c.length), totalCount);

    return (
      Object.values(invitations[r]).reduce((p, c) => p.length + c.length) <
      totalCount
    );
  };

  const createRows = (arr) => {
    return arr.map((email) => (
      <tr key={email} className="align-middle">
        <td>{email}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => console.log("resend")}
          >
            Resend
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => console.log("cancel")}
          >
            Rescind
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
        {/* HCP */}
        <div className={`input-group ${role === "staff" || !remaining(role) ? "d-none" : ""}`}>
          <span className="input-group-text">
            <i className="bi bi-envelope"></i>
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="HCP email"
            name="recipient"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.value)}
          />
          <button
            className="btn btn-primary input-group-text"
            type="button"
            onClick={() => console.log("send")}
          >
            Send
            <i className="bi bi-send ms-2"></i>
          </button>
        </div>
        {/* Non-HCP */}
        <div className={`input-group ${role === "hcp" || !remaining(role) ? "d-none" : ""}`}>
          <span className="input-group-text">
            <i className="bi bi-envelope"></i>
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Non-HCP email"
            name="recipient"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.value)}
          />
          <button
            className="btn btn-primary input-group-text"
            type="button"
            onClick={() => console.log("send")}
          >
            Send
            <i className="bi bi-send ms-2"></i>
          </button>
        </div>
        <table className="table table-striped table-sm bg-light text-center">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{createRows(invitations.hcp.sent)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDash;
