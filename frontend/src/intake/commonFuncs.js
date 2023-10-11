const createCheckbox = (el, func, data, type) => {
    return (
      <div className="form-check mb-3" key={el}>
        <input
          className="form-check-input"
          type="checkbox"
          value={el}
          id={el}
          onChange={func}
          checked={type === "symptoms" ? data.symptoms.has(el) : data.conditions.has(el)}
          name={type}
        />
        <label className="form-check-label" htmlFor={el}>
          <strong>{el}</strong>
        </label>
      </div>
    );
  };

export { createCheckbox };
