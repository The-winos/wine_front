import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { getWineById } from "./API";

const UserData = ({ userReviews }) => {
  const chartRef = useRef(null);

  useEffect(() => {

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
      .attr("width", 300) // Adjust the width of the SVG container
      .attr("height", 300) // Adjust the height of the SVG container
      .append("g")
      .attr("transform", "translate(150,90)"); // Adjust the translation for centering

    const wineDataPromises = userReviews.map(fetchWineData);

    try {
      const wineData = await Promise.all(wineDataPromises);

      const data = d3.rollup(
        wineData,
        (v) => v.length,
        (d) => d
      );

      const pie = d3.pie().value((d) => d[1]);
      const arc = d3.arc().innerRadius(0).outerRadius(80); // Adjust the outer radius for smaller pie

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

      // Add a key under the graph
      const key = svg
        .selectAll(".key")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("transform", (d, i) => {
          const row = Math.floor(i / 2); // Calculate the row index
          const col = i % 2; // Calculate the column index
          return `translate(${col * -80}, ${row * 30 +100})`; // Adjust the positioning
        });

      key
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", (d, i) => d3.schemeCategory10[i]);

      key
        .append("text")
        .attr("x", 15)
        .attr("y", 10)
        .style("font-size", "12px")
        .text((d) => d.data[0]); // Corrected to display category labels
    } catch (error) {
      console.error("Error fetching wine data:", error);
    }
  };



  return (
    <div className="user-data-container">

      <div ref={chartRef} className="chart"></div>
    </div>
  );
};

export default UserData;
