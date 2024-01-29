import React, { useContext, useState, useEffect } from "react";
import ProviderContext from "../common/ProviderContext";
import SmartnosisApi from "../api";

function AdminDash() {
  const [role, setRole] = useState("hcps");
  const [newHCP, setNewHCP] = useState("");
  const [newStaff, setNewStaff] = useState("");
  const [refetch, setRefetch] = useState(false);

  const [invitations, SetInvitations] = useState({
    hcps: { sent: [], active: [] },
    staff: { sent: [], active: [] },
  });

  const { currUser } = useContext(ProviderContext);

  useEffect(() => {
    const fetchAdminData = async () => {
      let invites = await SmartnosisApi.getInvitations(currUser.providerId);
      SetInvitations(invites);
      if (refetch) setRefetch(false);
    };
    fetchAdminData();
  }, [currUser.providerId, refetch]);

  const remaining = (r) => {
    let totalCount =
      r === "hcps" ? currUser.provider.hcpsCount : currUser.provider.staffCount;
    return (
      totalCount -
      Object.values(invitations[r]).reduce((p, c) => p.length + c.length)
    );
  };

  const sendInvite = async () => {
    const recipient = role === "hcps" ? newHCP : newStaff;
    let success = await SmartnosisApi.sendInvite(
      currUser.providerId,
      role,
      recipient
    );
    if (success) {
      setNewHCP("");
      setNewStaff("");
      setRefetch(true);
    }
  };

  const resendInvite = async (recipient) => {
    let success = await SmartnosisApi.resendInvite(
      currUser.providerId,
      role,
      recipient
    );
    if (success) {
      // setRefetch(true);
      console.log("invitation resent to:", recipient);
    }
  };

  const createSentRows = (arr) => {
    if (arr.length === 0) {
      return (
        <tr>
          <td>N/A</td>
          <td />
        </tr>
      );
    }
    return arr.map((email) => (
      <tr key={email} className="align-middle">
        <td className="text-start ms-2">{email}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => resendInvite(email)}
          >
            Resend
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => console.log("rescind")}
          >
            Remove
          </button>
        </td>
      </tr>
    ));
  };

  const createActiveRows = (arr) => {
    if (arr.length === 0) {
      return (
        <tr>
          <td>N/A</td>
          <td />
        </tr>
      );
    }
    return arr.map((email) => (
      <tr key={email} className="align-middle">
        <td className="text-start ms-2">{email}</td>
        {email === currUser.email ? (
          <td />
        ) : (
          <td>
            <button
              className="btn btn-primary"
              onClick={() => console.log("make admin")}
              >
                <small>
                Make Admin
                </small>
            </button>
            <button
              className="btn btn-danger ms-2"
              onClick={() => console.log("remove")}
            >
              Remove
            </button>
          </td>
        )}
      </tr>
    ));
  };
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title ms-2 mb-3">Admin Dashboard</h4>
        <div className="mt-3">
          <div className="text-center">
            {/* Hcp */}
            <input
              type="radio"
              className="btn-check ms-3"
              name="role"
              id="hcps"
              autoComplete="off"
              onChange={() => setRole("hcps")}
              checked={role === "hcps"}
            />
            <label className="btn btn-outline-secondary me-2" htmlFor="hcps">
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
        <div
          className={`${
            role === "staff" || remaining(role) === 0 ? "d-none" : ""
          }`}
        >
          <p>
            Invite additional HCPs. Remaining invitations: {remaining(role)}
          </p>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="HCP email"
              name="recipient"
              id="recipient"
              value={newHCP}
              onChange={(e) => setNewHCP(e.target.value)}
            />
            <button
              className="btn btn-primary input-group-text"
              type="button"
              onClick={sendInvite}
            >
              Send
              <i className="bi bi-send ms-2"></i>
            </button>
          </div>
        </div>

        {/* Non-HCP */}
        <div
          className={`${
            role === "hcps" || remaining(role) === 0 ? "d-none" : ""
          }`}
        >
          <p>
            Invite additional Non-HCPs. Remaining invitations: {remaining(role)}
          </p>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Non-HCP email"
              name="recipient"
              id="recipient"
              value={newStaff}
              onChange={(e) => setNewStaff(e.target.value)}
            />
            <button
              className="btn btn-primary input-group-text"
              type="button"
              onClick={sendInvite}
            >
              Send
              <i className="bi bi-send ms-2"></i>
            </button>
          </div>
          <hr />
        </div>
        <p>{(role === "hcps" ? "" : "Non-") + "HCP"} Invitations sent:</p>
        <table className="table table-striped table-sm bg-light text-center">
          <thead>
            <tr>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {role === "hcps"
              ? createSentRows(invitations.hcps.sent)
              : createSentRows(invitations.staff.sent)}
          </tbody>
        </table>
        <hr />
        <p>Active {(role === "hcps" ? "" : "Non-") + "HCP Users"}:</p>
        <table className="table table-striped table-sm bg-light text-center">
          <thead>
            <tr>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {role === "hcps"
              ? createActiveRows(invitations.hcps.active)
              : createActiveRows(invitations.staff.active)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDash;
