import React, { useContext } from "react";
import SmartnosisApi from "../api";
import ProviderContext from "./ProviderContext";

function SearchBar({
  setCurrView,
  setSearchRes,
  query,
  setQuery,
  setLastView,
  currView,
}) {
  const { currUser } = useContext(ProviderContext);

  const search = async (e) => {
    e.preventDefault();
    const res = await SmartnosisApi.search(query, currUser.providerId);
    if (currView !== "Results") setLastView(currView);
    setCurrView("Results");
    setSearchRes(res.data);
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <form onSubmit={search}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by first or last name..."
              id="query"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-info input-group-text" disabled={!query}>
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
