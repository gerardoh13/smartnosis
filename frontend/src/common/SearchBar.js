import React, { useState, useContext } from "react";
import SmartnosisApi from "../api";
import ProviderContext from "./ProviderContext";

function SearchBar({ setCurrView }) {
  const { currProvider } = useContext(ProviderContext);

  const [query, setQuery] = useState("");

  const search = async (e) => {
    e.preventDefault();
    const res = await SmartnosisApi.search(query, currProvider.id);
    setCurrView("Results");
    console.log(res);
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
      <form onSubmit={search}>
        <div className="row my-1">
          <div className="col-4">
              <input
                type="radio"
                className="btn-check method"
                name="method"
                id="emailRadioBtn"
                value="email"
                // checked={sendBy === "email"}
                // onChange={(e) => setSendBy(e.target.value)}
              />
              <label
                className="btn btn-outline-secondary radioLabel me-2"
                htmlFor="emailRadioBtn"
              >
                <small>
                Intakes
                </small>
              </label>

              <input
                type="radio"
                className="btn-check method"
                name="method"
                id="smsRadioBtn"
                value="sms"
                // checked={sendBy === "sms"}
                // onChange={(e) => setSendBy(e.target.value)}
              />
              <label
                className="btn btn-outline-secondary radioLabel"
                htmlFor="smsRadioBtn"
              >
                <small>
                  Appointments
                </small>
              </label>
          </div>
          <div className="col-8">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search Intakes.."
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="btn btn-info input-group-text"
                disabled={!query}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
      </div>
      
    </div>
  );
}

export default SearchBar;
