import React, {useEffect} from "react";
import { getAllWine } from "./API";
import WineDetails from "./WineDetails";

const WineFeed = ({allWine, setAllWine, setWineInfo, wineInfo}) => {
useEffect(()=>{
  async function fetchAllWine(){
    const allTheWine = await getAllWine();
    console.log(allTheWine)
    setAllWine(allTheWine);
  }
  fetchAllWine();
}, []);

  return(
  <div id="wineFeed">
    <h2 id="all-wine-title">Find new Wines!</h2>
    <div id="wines" className="wine">
      {allWine && allWine.length ? allWine.map((wine)=>{
        return(
          <div>
            <WineDetails
            key={`allWines-${wine.id}`}
            wine={wine}
            setWineInfo={setWineInfo}
            />
          </div>
        );
      }):null}
    </div>
  </div>
  );
};

export default WineFeed;
