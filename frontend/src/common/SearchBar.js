import React, { useState, useContext } from "react";
import SmartnosisApi from "../api";
import ProviderContext from "./ProviderContext";

function SearchBar() {
  const { currProvider } = useContext(ProviderContext);

  const [query, setQuery] = useState("");

  const search = async (e) => {
    e.preventDefault();
    const res = await SmartnosisApi.searchAppts(query, currProvider.id);
    console.log(res);
  };
  return (
    <div className="card mb-3">
      <form onSubmit={search}>
        <div className="row my-4">
          <div className="col-3">
            <p className="card-title ms-2 text-center">Search</p>
          </div>
          <div className="col-8 m-auto">
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
                // disabled={!query}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
