import React, { useState } from "react";
import { authUser } from "./API";

const AccountSettings = ({ user }) => {
  const [update, setUpdate] = useState(false);

  return (
    <div>
      <>
        {/* {update && userReviews.id == editId ? (
          <EditForm
            book={userReviews}
            setUpdate={setUpdate}
            userReviews={userReviews}
            setUserReviews={setUserReviews}
          ></EditForm>
        ) : null} */}
        <button
          id="admin-cancel-edit"
          onClick={() => {
            setUpdate(false);
          }}
        >
          Cancel Edit
        </button>
      </>
    </div>
  );
};
export default AccountSettings;
