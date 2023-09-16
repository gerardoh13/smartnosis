const createCheckbox = (el, handleCheckbox, data) => {
    return (
      <div className="form-check mb-3" key={el}>
        <input
          className="form-check-input"
          type="checkbox"
          value={el}
          id={el}
          onChange={handleCheckbox}
          checked={data.symptoms.has(el)}
          name="symptoms"
        />
        <label className="form-check-label" htmlFor={el}>
          <strong>{el}</strong>
        </label>
      </div>
    );
  };

export { createCheckbox };
