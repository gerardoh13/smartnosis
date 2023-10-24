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

  const getMidnights = (date) => {
    let midnight = new Date(date);
    midnight.setHours(0, 0, 0, 0);
    let lastMidnight = midnight.getTime() / 1000;
    midnight.setDate(midnight.getDate() + 1);
    let nextMidnight = midnight.getTime() / 1000;
    return { lastMidnight, nextMidnight };
  };

  const formatTime = (epoch) => {
    return new Date(epoch * 1000).toLocaleTimeString();
  };
export { createCheckbox, getMidnights, formatTime };
