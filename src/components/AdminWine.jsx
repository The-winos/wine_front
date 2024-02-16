import React from "react";
import { useEffect, useState } from "react";
import { deleteItem, getFavorites, getSaved, getWineById, updateWine, getReviewsByWineId, getFavoritesByWine } from "./API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSearch } from "./SearchBar";

const AdminWine = ({ allWine, updatingTheWine, setUpdatingTheWine, wineButton, setWineButton, filteredWines, setFilteredWines, allReviews}) => {
  const [author, setAuthor] = useState("");
  const [flavor, setFlavor] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [updatingWine, setUpdatingWine] = useState({});
  const [changeImage, setChangeImage] = useState(false);
  const [searchWineName, setSearchWineName]=useState("")
  const [sortColumn, setSortColumn] = useState("name");
const [sortDirection, setSortDirection] = useState("asc");

const handleSort = (column) => {
  if (sortColumn === column) {
    // If the same column is clicked, toggle the sort direction
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  } else {
    // If a different column is clicked, set it as the new sorting column and default to ascending
    setSortColumn(column);
    setSortDirection("asc");
  }
};

  function calculateReviewNumber(wineId){
    const reviewNumber=allReviews.filter((review)=>review.wine_id===wineId);
    return reviewNumber.length
  }
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

  const sortedWines = [...filteredWines].sort((a, b) => {
    // Compare based on the selected column
    switch (sortColumn) {
      case "flavor":
      case "region":
        return a[sortColumn].localeCompare(b[sortColumn]);
      case "price":
        return sortDirection === "asc"
          ? (a[sortColumn] || 0) - (b[sortColumn] || 0)
          : (b[sortColumn] || 0) - (a[sortColumn] || 0);
      case "rating":
        return sortDirection === "asc"
          ? a[sortColumn] - b[sortColumn]
          : b[sortColumn] - a[sortColumn];
      case "reviews":
        return sortDirection === "asc"
          ? calculateReviewNumber(a.id) - calculateReviewNumber(b.id)
          : calculateReviewNumber(b.id) - calculateReviewNumber(a.id);
      default:
        return a.name.localeCompare(b.name); // Default to sorting by name
    }
  });


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

      setUpdatingTheWine(false)
      toast.success(`${updatingWine.name} deleted`)


    } catch (error) {
      console.error(error);
    }
  }
  //Searches
  useEffect(() => {
    const filterUsers = async () => {
      const filteredResults = await Promise.all(
        allWine.map(async (use) => {
          if (use.name.toLowerCase().includes(searchWineName.toLowerCase())) {
            return use;
          }
        })
      );
      setFilteredWines(filteredResults.filter((use) => use !== undefined));
    };
    filterUsers();
  }, [searchWineName]);

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
                {changeImage && (
                <div className="avatar-grid">
                  <h6>Choose Wine Image</h6>
                  <br />
                  <img
        src="/images/1-green_wine.png"
        alt="image"
        className={`image ${image === "1-green_wine.png" ? "selected" : ""}`}
        onClick={() => setImage("1-green_wine.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/2-purple_wine.png"
        alt="image"
        className={`image ${image === "2-purple_wine.png" ? "selected" : ""}`}
        onClick={() => setImage("2-purple_wine.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/3-reddish-purple_wine.png"
        alt="image"
        className={`image ${image === "3-reddish-purple_wine.png" ? "selected" : ""}`}
        onClick={() => setImage("3-reddish-purple_wine.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
                  <button
                    onClick={() => {
                      setChangeImage(false);
                    }}
                    variant="outline-secondary"
                    size="sm"
                  >
                    Close
                  </button>
                </div>
              )}
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

{filteredWines && filteredWines.length ? (
  <div className="wine-list-container">

    {wineButton ? (
      <>
      <div className="text-center py-2">
        <h6>Average Rating</h6>
      <span className="badge bg-danger mx-2 rounded-circle pr-3"> 1
                  &nbsp;

                </span>

                <span className="badge bg-primary mx-2 rounded-circle">
                  &nbsp;2
                </span>

                <span className="badge bg-secondary mx-2 rounded-circle">
                  &nbsp;3
                </span>

                <span className="badge bg-info mx-2 rounded-circle pr-3">
                  &nbsp;4
                </span>

                <span className="badge bg-success mx-2 rounded-circle">
                  &nbsp;5
                </span>

   </div>

<div className="text-center py-2">
  <input
    type="text"
    id="type-filter"
    name="search-wine"
    value={searchWineName}
    onChange={(event) => {
      handleSearch(event, setSearchWineName);
    }}
    placeholder="Search wines..."
  />
</div>


      <table className="table m-4">
        <thead>
        <tr>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("name")}>Name</th>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("flavor")}>Type</th>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("region")}>Region</th>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("price")}>Average Price</th>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("rating")}>Average Rating</th>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("reviews")}>Number of Reviews</th>
  </tr>
        </thead>
        <tbody>
        {sortedWines.map((wine) =>{
            return (
              <tr key={`winelist-${wine.id}`}>
                <td
                  style={{ color:
                    wine.rating === 1
                      ? "red"
                      : wine.rating === 2
                      ? "blue"
                      : wine.rating === 3
                      ? "black"
                      : wine.rating === 4
                      ? "#199EF3"
                      : "green",
                    cursor: "pointer" }}
                  onClick={() => handleWineClick(wine.id)}
                  title="Click to edit"
                >
                  {wine.name}</td>
                  <td>{wine.flavor}</td>
                  <td>{wine.region}</td>
                  <td>{wine.price==null ? "N/A" :
                  wine.price/100}</td>
                  <td>{wine.rating}</td>
                  <td>{calculateReviewNumber(wine.id)}</td>

              </tr>
            );
          })}
          </tbody>
          </table>
      </>
    ) : null}
  </div>
) : null}


      <ToastContainer />
    </>
  );
};

export default AdminWine;
