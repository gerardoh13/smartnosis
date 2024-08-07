const createCheckbox = (el, func, data, type) => {
  return (
    <div className="form-check mb-3" key={el}>
      <input
        className="form-check-input"
        type="checkbox"
        value={el}
        id={el}
        onChange={func}
        checked={
          type === "symptoms" ? data.symptoms.has(el) : data.conditions.has(el)
        }
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
  return new Date(epoch * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const validatePhone = (phone) => {
  if (phone.lenght > 12) return;
  phone = phone.replaceAll("-", "");
  for (let i = 0; i < phone.length; i++) {
    if (isNaN(phone[i])) return;
  }
  return phone;
};

const deleteNulls = (data) => {
  for (let key in data) {
    if (!data[key]) delete data[key];
  }
};

const getEmojiMarks = () => {
  return [
    {
      value: 1,
      label: (
        <>
          <span className="bit" />
          <i className="bi bi-emoji-expressionless-fill emoji" />
        </>
      ),
    },
    {
      value: 2,
      label: (
        <>
          <span className="bit" />
          <i className="bi bi-emoji-frown-fill emoji" />
        </>
      ),
    },
    {
      value: 3,
      label: (
        <>
          <span className="bit" />
          <i className="bi bi-emoji-angry-fill emoji" />
        </>
      ),
    },
    {
      value: 4,
      label: (
        <>
          <span className="bit" />
          <i className="bi bi-emoji-grimace-fill emoji" />
        </>
      ),
    },
    {
      value: 5,
      label: (
        <>
          <span className="bit" />
          <i className="bi bi-emoji-dizzy-fill emoji" />
        </>
      ),
    },
  ];
};
export { createCheckbox, getMidnights, formatTime, validatePhone, deleteNulls, getEmojiMarks };
