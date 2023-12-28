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


const Admin = ({ user, allReviews }) => {

  const [allWine, setAllWine]= useState([]);
  const [filteredWines, setFilteredWines]=useState([])
  const [userButton, setUserButton]=useState(false);
  const [updateTheUser, setUpdateTheUser] = useState(false);
  const [wineButton, setWineButton]=useState(false);
  const [updatingTheWine, setUpdatingTheWine] = useState(false);




  useEffect(()=>{
    async function fetchAllWine(){
      const allTheWine = await getAllWine();

      setAllWine(allTheWine);
      setFilteredWines(allTheWine)
    }
    fetchAllWine();
  },[])


  return (
    <div id="admin">
      <h2 className="d-flex justify-content-center pt-3">
        Welcome to the Admin Portal
      </h2>
      <>
      <div className="d-flex justify-content-center pb-2">
  {!userButton ? (
    <>
    <button
      onClick={() => {
        setUserButton(true);
        setWineButton(false);
        setUpdatingTheWine(false);
      }}
      className="btn btn-primary mx-2"
    >
      Open Users
    </button>

    </>
  ) : (<>
    <button
      onClick={() => {
        setUserButton(false);
        setUpdateTheUser(false);
      }}
      className="btn btn-primary mx-2"
    >
      Close Users
    </button>

    </>
  )}
  {!wineButton ? (
    <>
    <button
      onClick={() => {
        setWineButton(true);
        setUserButton(false);
        setUpdateTheUser(false);
      }}
      className="btn btn-primary mx-2"
    >
      Open Wines
    </button>

    </>
  ) : (<>
    <button
      onClick={() => {
        setWineButton(false);
        setUpdatingTheWine(false);
      }}
      className="btn btn-primary mx-2"
    >
      Close Wines
    </button>

    </>
  )}
</div>


<AdminUser user={user} userButton={userButton} updateTheUser={updateTheUser} setUpdateTheUser={setUpdateTheUser} allWine={allWine}/>



            <AdminWine allWine={allWine} updatingTheWine={updatingTheWine} setUpdatingTheWine={setUpdatingTheWine} wineButton={wineButton} setWineButton={setWineButton} filteredWines={filteredWines} setFilteredWines={setFilteredWines} allReviews={allReviews}/>



      </>
      <ToastContainer />
    </div>
  );
};

export default Admin;
