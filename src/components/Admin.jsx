//same as profile but add admin functions to receive user reports, edit posts, edit users, edit badges?
import React from "react";
import { useEffect, useState } from "react";
import { getAllUsers } from "./API";


const Admin = ({user}) => {
  const [allUsers, setAllUser]=useState([])
  const[userButton, setUserButton]=useState(false)
  const[statButton, setStatButton]=useState(false)

  useEffect(() => {
    async function fetchAllUsers() {
      const allTheUsers = await getAllUsers();
      console.log(allTheUsers);
      setAllUser(allTheUsers);

    }
    fetchAllUsers();

  }, []);
  return <div id="admin">
    <>

    {userButton ? (<>
      <button
            onClick={() => {
              setUserButton(false);
            }}
            className="btn btn-primary pb-2"
          >
            All Users
          </button>

    </>):(<>
      <button
            onClick={() => {
              setUserButton(true);
            }}
            className="btn btn-primary pb-2"
          >
            Close Users
          </button>

    </>)}
    </>
  </div>;

};

export default Admin;
