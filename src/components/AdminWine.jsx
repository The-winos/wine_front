import React from "react";
import { useEffect, useState } from "react";
import { getWineById } from "./API";

const AdminWine = ({ allWine, user }) => {
  const [author, setAuthor] = useState("");
  const [flavor, setFlavor] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [updatingTheWine, setUpdatingTheWine] = useState(false);
  const [updatingWine, setUpdatingWine] = useState({});
  const [wineButton, setWineButton] = useState(false);

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
        author: author !== "" ? author:updatingWine.author_id,
        flavor: flavor !== "" ? flavor : updatingWine.flavor,
        image: image !== "" ? image : updatingWine.image_url,
        name: name !== "" ? name : updatingWine.name,
        region: region !== "" ? region : updatingWine.region
      })
      // const updateInfo =await

    } catch (error) {

    }
  }

  return <div id="adminWine">I am AdminWine</div>;
};

export default AdminWine;
