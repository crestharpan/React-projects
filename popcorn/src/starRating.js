import { useState } from "react";
import propTypes from "prop-types";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const starContainerStyle = {
  display: "flex",
  gap: "0px",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  message: propTypes.array,
  className: propTypes.string,
  onSetRating: propTypes.func,
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 35,
  message = [],
  defaultRating = 0,
  className = "",
  onSetRating,
}) {
  const [rating, SetRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleClick(rating) {
    SetRating(rating);
    onSetRating(rating);
  }

  const textStyle = {
    lineHeight: "0",
    fontSize: `${size}px`,
    color,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onMouseEnter={() => setTempRating(i + 1)}
            onMouseLeave={() => setTempRating(0)}
            onClick={() => handleClick(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
            className={className}
          />
        ))}
      </div>
      {/* <p style={textStyle}>{tempRating}</p> */}
      <p style={textStyle}>
        {message && message.length === maxRating
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

function Star({
  onClick,
  full,
  onMouseEnter,
  onMouseLeave,
  size,
  color,
  className,
}) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    cursor: "pointer",
    display: "block",
    color,
    fontSize: `${size}px`,
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

/*
FULL STAR




EMPTY STAR



*/
