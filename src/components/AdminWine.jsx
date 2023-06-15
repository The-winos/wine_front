import React from "react";
import { useEffect, useState } from "react";
import { deleteItem, getFavorites, getSaved, getWineById, updateWine, getReviewsByWineId, getFavoritesByWine } from "./API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminWine = ({ allWine, updatingTheWine, setUpdatingTheWine, wineButton, setWineButton}) => {
  const [author, setAuthor] = useState("");
  const [flavor, setFlavor] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [updatingWine, setUpdatingWine] = useState({});
  const [changeImage, setChangeImage] = useState(false);

  async function handleWineClick(wineId) {
    setUpdatingTheWine(true);
    const wineToUpdate = await getWineById(wineId);
    setAuthor(wineToUpdate.author_id);
    setFlavor(wineToUpdate.flavor);
    setImage(wineToUpdate.image_url);
    setName(wineToUpdate.name);
    setRegion(wineToUpdate.region);
    setUpdatingWine(wineToUpdate);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      author === updatingWine.author_id &&
      flavor === updatingWine.flavor &&
      image === updatingWine.image_url &&
      name === updatingWine.name &&
      region === updatingWine.region
    ) {
      return;
    }
    try {
      setUpdatingWine({
        ...updatingWine,
        author: author !== "" ? author : updatingWine.author_id,
        flavor: flavor !== "" ? flavor : updatingWine.flavor,
        image: image !== "" ? image : updatingWine.image_url,
        name: name !== "" ? name : updatingWine.name,
        region: region !== "" ? region : updatingWine.region,
      });
      const updateInfo = await updateWine(
        updatingWine.id,
        author,
        name,
        image,
        updatingWine.price,
        region,
        flavor
      );
      setAuthor("");
      setName("");
      setImage("");
      setRegion("");
      setFlavor("");
      setUpdatingTheWine(false);
      toast.success("Wine updated");
    } catch (error) {
      console.error(error);
    }
  }

  function showConfirmation(message) {
    return new Promise((resolve, reject) => {
      const confirmed = window.confirm(message);
      if (confirmed) {
        resolve(true);
      } else {
        return;
      }
    });
  }

  //must delete reviews, favorites and saved prior to delete
  async  function handleDelete(type, id){
    try {
      const confirmDeletion = await showConfirmation(`Are you sure you want to delete wine ${updatingWine.name}`);
      if (!confirmDeletion){
        return;
      }
      const reviews= await getReviewsByWineId(id);
      await Promise.all(reviews.map((review) => deleteItem("reviews", review.id)));

      const favorites= await getFavoritesByWine(id)
      console.log(favorites, "any favorites?")
      if(favorites.length){
      await Promise.all(favorites.map((favorite)=>{
        deleteItem("favorites", favorite.id)
      }))}

      const saved= await getSaved(id)
      if(saved.length){
      await Promise.all(saved.map((save)=>{
        deleteItem("saved", save.id)
      }))}

      const result = await deleteItem(type, id);
      console.log(result);
      setUpdatingTheWine(false)
      toast.success(`${updatingWine.name} deleted`)


    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {updatingTheWine ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="admin-form border p-2 m-3 mb-4"
          >
            <h3 className="d=flex justify-content-center pb-3">
              You are updating {updatingWine.name}
            </h3>
            <div className="row">
              <div className="col">
                <h6>Update Image</h6>
                <img
                  src={`/images/${updatingWine.image_url}`}
                  alt="wine image"
                  className="img-fluid"
                  style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "contain",
                    objectPosition: "center center",
                    cursor: "pointer",
                  }}
                  onClick={() => setChangeImage(true)}
                />
              </div>
              <div className="col">
                <h5>{updatingWine.name}</h5>
                <h6>Update Name</h6>
                <input
                  placeholder="Enter corrected name"
                  className="wine-name"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />

              </div>
              <div className="col">
                <h5>{updatingWine.flavor}</h5>
                <h6>Update Type</h6>
                <select
                  placeholder="flavor"
                  className="flavor"
                  type="text"
                  value={flavor}
                  onChange={(event) => {
                    setFlavor(event.target.value);
                  }}
                >
                  <option value="">Choose...</option>
                  <option value="Cabernet">Cabernet Sauvignon</option>
                  <option value="Syrah">Syrah</option>
                  <option value="Zinfandel">Zinfandel</option>
                  <option value="Pinot Noir">Pinot Noir</option>
                  <option value="Merlot">Merlot</option>
                  <option value="Malbec">Malbec</option>
                  <option value="Tempranillo">Tempranillo</option>
                  <option value="Riesling">Riesling</option>
                  <option value="Pinot Grigio">Pinot Grigio</option>
                  <option value="Sauvigon">Sauvigon Blanc</option>
                  <option value="Chardonnay">Chardonnay</option>
                  <option value="Moscato">Moscato</option>
                  <option value="TreTerzi">TreTerzi</option>
                  <option value="Petite Sirah">Petite Sirah </option>
                  <option value="Red Blend">Red Blend</option>
                  <option value="White Blend">White Blend</option>
                  <option value="Rose">Rosé</option>
                  <option value="White Zinfandel">White Zinfandel</option>
                  <option value="Other">Other</option>
                </select>

              </div>
              <div className="col">
                <h5>{updatingWine.region}</h5>
                <h6>Update Region</h6>
                <input
                  placeholder="Enter corrected region"
                  className="wine-region"
                  type="text"
                  value={region}
                  onChange={(event) => {
                    setRegion(event.target.value);
                  }}
                />
                </div>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
        type="button"
        className="btn btn-danger ml-2"
        onClick={() => handleDelete('wines', updatingWine.id)}
      >
        Delete
      </button>
          </form>
          <ToastContainer />
        </>
      ) : null}

      {allWine && allWine.length ? (
        <>
          {/* put key here if you want one */}
          {wineButton ?(<>
          {allWine
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((wine) => {
              return (
                <div key={`winelist-${wine.id}`}>
                  <h5
                    style={{ cursor: "pointer" }}
                    onClick={() => handleWineClick(wine.id)}
                  >
                    {wine.name}
                  </h5>
                </div>
              );
            })}
        </>
      ) : null}
      </>):null}
      <ToastContainer />
    </>
  );
};

export default AdminWine;
