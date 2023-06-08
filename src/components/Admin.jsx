//same as profile but add admin functions to receive user reports, edit posts, edit users, edit badges?
import React from "react";
import { useEffect, useState } from "react";
import { getAllUsers, getAllWine } from "./API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminUser from "./AdminUser";
import AdminWine from "./AdminWine";


const Admin = ({ user }) => {
  const [allUsers, setAllUser] = useState([]);
  const [allWine, setAllWine]= useState([])

  useEffect(() => {
    async function fetchAllUsers() {
      const allTheUsers = await getAllUsers();
      setAllUser(allTheUsers);
    }
    fetchAllUsers();
  }, []);

  useEffect(()=>{
    async function fetchAllWine(){
      const allTheWine = await getAllWine();
      console.log(allTheWine)
      setAllWine(allTheWine);
    }
    fetchAllWine();
  },[])


  return (
    <div id="admin">
      <h2 className="d-flex justify-content-center pt-3">
        Welcome to the Admin Portal
      </h2>
      <>

            <AdminUser allUsers={allUsers}  user={user} />
            <AdminWine allWine={allWine} user={user}/>



      </>
      <ToastContainer />
    </div>
  );
};

export default Admin;
