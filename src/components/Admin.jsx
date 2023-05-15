//same as profile but add admin functions to receive user reports, edit posts, edit users, edit badges?
import React from "react";
import { useEffect, useState } from "react";
import { getAllUsers } from "./API";

const Admin = ({ user }) => {
  const [allUsers, setAllUser] = useState([]);
  const [userButton, setUserButton] = useState(false);
  const [statButton, setStatButton] = useState(false);

  useEffect(() => {
    async function fetchAllUsers() {
      const allTheUsers = await getAllUsers();
      console.log(allTheUsers);
      setAllUser(allTheUsers);
    }
    fetchAllUsers();
  }, []);
  return (
    <div id="admin">
      <>
        {userButton ? (
          <>
            <button
              onClick={() => {
                setUserButton(false);
              }}
              className="btn btn-primary pb-2"
            >
              Close Users
            </button>
            {allUsers && allUsers.length ? (
              <>
            <div className="text-center py-2">
  <span className="badge bg-danger mx-2 rounded-circle pr-3">
    &nbsp;
  </span>
  Admin
  <span className="badge bg-primary mx-2 rounded-circle">
    &nbsp;
  </span>
  Merchant
  <span className="badge bg-secondary mx-2 rounded-circle">
    &nbsp;
  </span>
  User
</div>


                {allUsers
                  .sort((a, b) => a.username.localeCompare(b.username))
                  .map((user) => {
                    return (
                      <div key={`userlist-${user.id}`}>
                        <h5
                          style={{
                            color:
                              user.role === "admin"
                                ? "red"
                                : user.role === "merchant"
                                ? "blue"
                                : "black",
                          }}
                        >
                          {user.username}
                        </h5>
                      </div>
                    );
                  })}
              </>
            ) : (
              <h2>No users found</h2>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setUserButton(true);
              }}
              className="btn btn-primary pb-2"
            >
              Open Users
            </button>
          </>
        )}
      </>
    </div>
  );
};

export default Admin;
