import React, { useEffect, useRef } from "react";

import * as d3 from "d3";

const UserData = ({ user, userReviews }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (userReviews) {
      renderGraphs(userReviews);
    }
  }, [userReviews]);

  const renderGraphs = (userReviews) => {
    console.log(userReviews);
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", 300)
      .attr("height", 300);

    const data = userReviews.map((review) => ({
      label: review.wineType,
      value: review.rating,
    }));

    const pie = d3.pie().value((d) => d.value);
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
      .text((d) => d.data.label);
  };

  return (
    <div className="user-data-container">
      <div ref={chartRef} className="chart"></div>
    </div>
  );
};

export default UserData;
