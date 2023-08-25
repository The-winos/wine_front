import React, { useEffect } from "react";
// import * as d3 from "d3"; // Import D3.js library

const UserData = ({ user }) => {
//   useEffect(() => {
//     if (user && user.userReviews) {
//       renderGraphs();
//     }
//   }, [user]);

//   const renderGraphs = () => {
//     const svg = d3
//       .select("#pieChart")
//       .append("svg")
//       .attr("width", 300)
//       .attr("height", 300);
//     const data = user.userReviews.map((review) => ({
//       label: review.wineType,
//       value: review.rating,
//     }));

//     const pie = d3.pie().value((d) => d.value);
//     const arc = d3.arc().innerRadius(0).outerRadius(100);

//     const arcs = svg
//       .selectAll("arc")
//       .data(pie(data))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     arcs
//       .append("path")
//       .attr("d", arc)
//       .attr("fill", (d, i) => d3.schemeCategory10[i]);

//     arcs
//       .append("text")
//       .attr("transform", (d) => `translate(${arc.centroid(d)})`)
//       .attr("text-anchor", "middle")
//       .text((d) => d.data.label);
//   };

  return (
    <div className="user-data-container">
      {/* Render graphs here */}
      <div id="pieChart" className="chart"></div>
    </div>
  );
};

export default UserData;
