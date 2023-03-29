import React, { useState } from "react";
import { authUser } from "./API";
import EditAccount from "./EditAccount";

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
        <EditAccount user={user} />
      </>
    </div>
  );
};
export default AccountSettings;
