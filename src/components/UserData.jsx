import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { getWineById } from "./API";

const UserData = ({ userReviews }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    console.log("UserData component rendered");
    clearGraph(); // Clear any existing graph before rendering
    if (userReviews) {
      renderGraphs(userReviews);
    }
  }, [userReviews]);

  const clearGraph = () => {
    d3.select(chartRef.current).selectAll("*").remove();
  };

  const fetchWineData = async (review) => {
    try {
      const wine = await getWineById(review.wine_id);
      return wine.flavor; // Adjust this based on your actual wine data structure
    } catch (error) {
      console.error(error);
      return "Unknown Wine"; // Default value if there's an error fetching wine data
    }
  };

  const renderGraphs = async (userReviews) => {
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", 300)
      .attr("height", 300)
      .append("g")
      .attr("transform", "translate(150,150)");

    const wineDataPromises = userReviews.map(fetchWineData);

    try {
      const wineData = await Promise.all(wineDataPromises);

      const data = d3.rollup(
        wineData,
        (v) => v.length,
        (d) => d
      );

      const pie = d3.pie().value((d) => d[1]);
      const arc = d3.arc().innerRadius(0).outerRadius(100);

      const arcs = svg
        .selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => d3.schemeCategory10[i]);

      arcs
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text((d) => d.data[0]);
    } catch (error) {
      console.error("Error fetching wine data:", error);
    }
  };

  return (
    <div className="user-data-container">
      {console.log(userReviews, "check this")}
      <div ref={chartRef} className="chart"></div>
    </div>
  );
};

export default UserData;
