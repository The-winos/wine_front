import React, { useState } from "react";
import { authUser } from "./API";
import EditAccount from "./EditAccount";

const AccountSettings = ({ users }) => {
  const [update, setUpdate] = useState(false);
  function handleChooseEdit(e) {
    setEditUser(e.target.users);
    setUpdate(true);
  }

  return (
    <div>
      <>
        {update && userReviews.id == editId ? (
          <EditAccount users={users} />
        ) : null}
      </>
      <button className="admin-buttons" id={users} onClick={handleChooseEdit}>
        Update
      </button>
    </div>
  );
};
export default AccountSettings;
