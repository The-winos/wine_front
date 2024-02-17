import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { getAllUsers } from "./API";

const AdminStats = ({user, allWine, statsButton, setStatsButoon}) => {
  const [allUsers, setAllUser] = useState([]);
  const chartRef = useRef(null);
  const userChartRef = useRef(null);

  useEffect(() => {
    if (allWine && statsButton) {
      clearGraph();
      renderGraphs(allWine);
    }
  }, [allWine, statsButton]);

  useEffect(() => {
    async function fetchAllUsers() {
      const allTheUsers = await getAllUsers();
      setAllUser(allTheUsers);

    }
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (allUsers.length > 0 && statsButton) {
      clearUserGraph();
      renderUserGraph(allUsers);
    }
  }, [allUsers, statsButton]);

  const clearGraph = () => {
    d3.select(chartRef.current).selectAll("*").remove();
  };

  const clearUserGraph = () => {
    d3.select(userChartRef.current).selectAll("*").remove();
  };

  const renderGraphs = (allWine) => {
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", 400)
      .attr("height", 400) // Increase height to accommodate larger key
      .append("g")
      .attr("transform", "translate(150,150)");

    const dataMap = d3.group(allWine, (d) => d.flavor); // Group the data by flavor

    const data = Array.from(dataMap, ([flavor, wines]) => ({ flavor, value: wines.length }));

    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.flavor)) // Domain should include all flavors
      .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f",
      "#bcbd22", "#17becf", "#aec7e8", "#ffbb78", "#98df8a", "#ff9896", "#c5b0d5", "#c49c94",
      "#f7b6d2", "#c7c7c7", "#dbdb8d", "#9edae5", "#e7ba52", "#393b79"]);


    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(80);

    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data.flavor));

    // Add a key under the graph
    const key = svg
      .append("g")
      .attr("class", "key")
      .attr("transform", `translate(-150, 100)`); // Adjust the positioning of the key

    key
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${i % 4 * 85}, ${Math.floor(i / 4) * 20})`); // Adjust the positioning for 4 columns

    key
      .selectAll(".legend")
      .append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d) => colorScale(d.flavor));

      arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data.flavor))
      .append("title") // Add a tooltip with the count
      .text((d) => `${d.data.value} ${d.data.flavor}`);

    key
      .selectAll(".legend")
      .append("text")
      .attr("x", 15)
      .attr("y", 10)
      .style("font-size", "12px")
      .text((d) => d.flavor);

      svg.append("text")
      .attr("x", 0)
      .attr("y", -100)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(`${allWine.length} wines are in the database`);
  };

  const renderUserGraph = (allUsers) => {
    // Select the div with id "user-graph" and append an SVG container
    const svg = d3
    .select(userChartRef.current)
        .append("svg")
        .attr("width", "400")
        .attr("height", 400) // Adjust height as needed
        .append("g")
        .attr("transform", "translate(150,150)");

    // Prepare the data for the pie chart
    const stateData = d3.group(allUsers, (d) => d.state);

    const data = Array.from(stateData, ([state, users]) => ({ state, value: users.length }));

    // Create the color scale
    const colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d.state))
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#aec7e8", "#ffbb78", "#98df8a", "#ff9896", "#c5b0d5", "#c49c94", "#f7b6d2", "#c7c7c7", "#dbdb8d", "#9edae5", "#e7ba52", "#393b79", "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#aec7e8", "#ffbb78", "#98df8a", "#ff9896", "#c5b0d5", "#c49c94", "#f7b6d2", "#c7c7c7", "#dbdb8d", "#9edae5", "#e7ba52", "#393b79"]);

    // Create the pie chart
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(80);

    const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", (d) => colorScale(d.data.state));

    // Add a key under the graph
    const key = svg
        .append("g")
        .attr("class", "key")
        .attr("transform", `translate(-150, 100)`); // Adjust the positioning of the key

    key
        .selectAll(".legend")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(${i % 4 * 85}, ${Math.floor(i / 4) * 20})`); // Adjust the positioning for 4 columns

    key
        .selectAll(".legend")
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", (d) => colorScale(d.state));

        arcs.append("path")
        .attr("d", arc)
        .attr("fill", (d) => colorScale(d.data.state))
        .append("title") // Add a tooltip with the count
        .text((d) => `${d.data.value} ${d.data.state}`);

    key
        .selectAll(".legend")
        .append("text")
        .attr("x", 15)
        .attr("y", 10)
        .style("font-size", "12px")
        .text((d) => d.state);

        svg.append("text")
        .attr("x", 0)
        .attr("y", -100)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(`${allUsers.length} users are in the database`);

};


  return(
    <div className="container-fluid"> {/* Using Bootstrap container-fluid for full width */}
      <div className="row">
        <div className="col-md-6"> {/* Div for the first chart */}
          {statsButton && (
            <div className="chart" ref={chartRef}></div>
          )}
        </div>
        <div className="col-md-6"> {/* Div for the second chart */}
          {statsButton && (
            <div id="user-graph" className="chart" ref={userChartRef}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
