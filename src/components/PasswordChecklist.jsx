import React from "react";

const PasswordChecklist = ({
  hasUpperCase,
  hasLowerCase,
  hasDigit,
  isLengthValid,
}) => {
  return (
    <div className="password-checklist">
      <div className={`check-item ${isLengthValid ? "success" : "error"}`}>
        {isLengthValid ? (
          <i className={`fa fa-check`}></i>
        ) : (
          <i className={`fa fa-times`}></i>
        )}
        At least 8 characters
      </div>
      <div className={`check-item ${hasUpperCase ? "success" : "error"}`}>
        {hasUpperCase ? (
          <i className={`fa fa-check`}></i>
        ) : (
          <i className={`fa fa-times`}></i>
        )}
        At least one uppercase letter
      </div>
      <div className={`check-item ${hasLowerCase ? "success" : "error"}`}>
        {hasLowerCase ? (
          <i className={`fa fa-check`}></i>
        ) : (
          <i className={`fa fa-times`}></i>
        )}
        At least one lowercase letter
      </div>
      <div className={`check-item ${hasDigit ? "success" : "error"}`}>
        {hasDigit ? (
          <i className={`fa fa-check`}></i>
        ) : (
          <i className={`fa fa-times`}></i>
        )}
        At least one number
      </div>
    </div>
  );
};

export default PasswordChecklist;
