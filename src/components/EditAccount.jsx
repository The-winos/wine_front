// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { updateUser } from "./API";

// const EditAccount = ({ user }) => {
//   const [name, setName] = useState(user.name || "");
//   const [lastName, setLastName] = useState(user.lastName || "");
//   const [username, setUserName] = useState(user.username || "");
//   const [location, setLocation] = useState(user.location || "");
//   const [bio, setBio] = useState(user.bio || "");
//   const [update, setUpdate] = useState(false);
//   const [userInfo, setUserInfo] = useState(false);

//   useEffect(() => {
//     async function fetchUserInfo() {
//       if (userInfo) {
//         const userBlock = await updateUser(user.id);
//       }
//     }
//     fetchUserInfo();
//   }, [userInfo]);

//   return (

//   );
// };

// export default EditAccount;
