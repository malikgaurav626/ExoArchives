import "./dashboard.css";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserSelection,
  setBtnRoute,
  setRouteLocation,
} from "../../redux/store";

export default function Dashboard() {
  const canvasTRef = useRef();
  const data = useSelector((state) => state.data);
  const [filteredData, setFilteredData] = useState([]);
  const btnRoute = useSelector((state) => state.btnRoute);
  const uniqueHeaders = useSelector((state) => state.uniqueHeaders);
  const userSelection = useSelector((state) => state.userSelection);
  const dispatch = useDispatch();

  // Handles the different theme selections.
  useEffect(() => {
    const body = document.getElementById("body-id");
    if (btnRoute == 0) body.style.filter = "hue-rotate(0deg)";
    else if (btnRoute == 1) body.style.filter = "hue-rotate(310deg)";
    else if (btnRoute == 2) body.style.filter = "hue-rotate(204deg)";
    else if (btnRoute == 3) body.style.filter = "hue-rotate(58deg)";
  }, [btnRoute]);

  // Handles the Search button click and updates the filtered List state
  function handleSearch() {
    // Stores the actual Selection of the user and filteres out the default selections for the select inputs
    const actualSelection = {};

    if (userSelection["Host Name"] && userSelection["Host Name"] != "Host Name")
      actualSelection["Host Name"] = userSelection["Host Name"];
    if (
      userSelection["Discovery Method"] &&
      userSelection["Discovery Method"] != "Discovery Method"
    )
      actualSelection["Discovery Method"] = userSelection["Discovery Method"];
    if (
      userSelection["Discovery Year"] &&
      userSelection["Discovery Year"] != "Discovery Year"
    )
      actualSelection["Discovery Year"] = userSelection["Discovery Year"];
    if (
      userSelection["Discovery Facility"] &&
      userSelection["Discovery Facility"] != "Discovery Facility"
    )
      actualSelection["Discovery Facility"] =
        userSelection["Discovery Facility"];

    console.log("actual selection", actualSelection);

    const processedData = data.filter((planet) => {
      for (const key in actualSelection) {
        if (planet[key] !== actualSelection[key]) {
          return false; // Filter out planets that don't match any actualSelection criteria
        } else return true;
      }
      return false;
    });

    // Filters out the updates for the same planet name.
    const uniqueHostNames = new Set();
    const uniqueProcessedData = processedData.filter((planet) => {
      if (!uniqueHostNames.has(planet["Host Name"])) {
        uniqueHostNames.add(planet["Host Name"]);
        return true;
      }
      return false;
    });
    setFilteredData(uniqueProcessedData);
  }

  // all the sorting for different columns is handled by the functions starting with sort
  function sortAscendingName() {
    const nameData = [...filteredData];
    nameData.sort((planet1, planet2) => {
      if (planet1["Planet Name"] < planet2["Planet Name"]) {
        return -1;
      }
      if (planet1["Planet Name"] > planet2["Planet Name"]) {
        return 1;
      }
      return 0;
    });
    setFilteredData(nameData);
  }
  function sortDescendingName() {
    const nameData = [...filteredData];
    nameData.sort((planet1, planet2) => {
      if (planet1["Planet Name"] < planet2["Planet Name"]) {
        return 1;
      }
      if (planet1["Planet Name"] > planet2["Planet Name"]) {
        return -1;
      }
      return 0;
    });
    setFilteredData(nameData);
  }
  function sortAscendingHostName() {
    const nameData = [...filteredData];
    nameData.sort((planet1, planet2) => {
      if (planet1["Host Name"] < planet2["Host Name"]) {
        return -1;
      }
      if (planet1["Host Name"] > planet2["Host Name"]) {
        return 1;
      }
      return 0;
    });
    setFilteredData(nameData);
  }
  function sortDecendingHostName() {
    const nameData = [...filteredData];
    nameData.sort((planet1, planet2) => {
      if (planet1["Host Name"] < planet2["Host Name"]) {
        return 1;
      }
      if (planet1["Host Name"] > planet2["Host Name"]) {
        return -1;
      }
      return 0;
    });
    setFilteredData(nameData);
  }
  function sortAscendingDate() {
    const nameData = [...filteredData];
    nameData.sort((planet1, planet2) => {
      if (planet1["Discovery Year"] < planet2["Discovery Year"]) {
        return -1;
      }
      if (planet1["Discovery Year"] > planet2["Discovery Year"]) {
        return 1;
      }
      return 0;
    });
    setFilteredData(nameData);
  }
  function sortDecendingDate() {
    const nameData = [...filteredData];
    nameData.sort((planet1, planet2) => {
      if (planet1["Discovery Year"] < planet2["Discovery Year"]) {
        return 1;
      }
      if (planet1["Discovery Year"] > planet2["Discovery Year"]) {
        return -1;
      }
      return 0;
    });
    setFilteredData(nameData);
  }
  function sortAscendingMethod() {
    const nameData = [...filteredData];
    nameData.sort((planet1, planet2) => {
      if (planet1["Discovery Method"] < planet2["Discovery Method"]) {
        return -1;
      }
      if (planet1["Discovery Method"] > planet2["Discovery Method"]) {
        return 1;
      }
      return 0;
    });
    setFilteredData(nameData);
  }
  function sortDecendingMethod() {
    const nameData = [...filteredData];
    nameData.sort((planet1, planet2) => {
      if (planet1["Discovery Method"] < planet2["Discovery Method"]) {
        return 1;
      }
      if (planet1["Discovery Method"] > planet2["Discovery Method"]) {
        return -1;
      }
      return 0;
    });
    setFilteredData(nameData);
  }
  function sortAscendingFacility() {
    const nameData = [...filteredData];
    nameData.sort((planet1, planet2) => {
      if (planet1["Discovery Facility"] < planet2["Discovery Facility"]) {
        return -1;
      }
      if (planet1["Discovery Facility"] > planet2["Discovery Facility"]) {
        return 1;
      }
      return 0;
    });
    setFilteredData(nameData);
  }
  function sortDecendingFacility() {
    const nameData = [...filteredData];
    nameData.sort((planet1, planet2) => {
      if (planet1["Discovery Facility"] < planet2["Discovery Facility"]) {
        return 1;
      }
      if (planet1["Discovery Facility"] > planet2["Discovery Facility"]) {
        return -1;
      }
      return 0;
    });
    setFilteredData(nameData);
  }

  // handles the canvas animation on the top right of medium to large screens.
  useEffect(() => {
    const canvas = canvasTRef.current;
    const context = canvas.getContext("2d");
    const lineSpacing = 40;
    const animationSpeed = 0.5; // Adjust animation speed
    let offset = 0;

    canvas.width = 160;
    canvas.height = 160;

    function drawLines() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw horizontal lines
      for (let j = 0; j < canvas.height; j += lineSpacing) {
        context.beginPath();
        context.moveTo(0, (j + offset) % canvas.height);
        context.lineTo(canvas.width, (j + offset) % canvas.height);
        context.strokeStyle = "#3ec6b6";
        context.lineWidth = 1;
        context.stroke();
      }

      // Draw vertical lines
      for (let i = 0; i < canvas.width; i += lineSpacing) {
        context.beginPath();
        context.moveTo((i + offset) % canvas.width, 0);
        context.lineTo((i + offset) % canvas.width, canvas.height);
        context.strokeStyle = "#3ec6b6";
        context.lineWidth = 1;
        context.stroke();
      }

      offset += animationSpeed;

      requestAnimationFrame(drawLines);
    }

    drawLines();

    return () => {
      // Cleanup code if needed
    };
  }, []);
  return (
    <>
      <div className="welcome-container dashboard-container">
        
        {/* Main Heading Is Here*/}
        
        <div className="row m-0 p-0">
          <div className="col-lg-8 col-md-8 col-12 p-2 dashboard-heading-container">
            <div className="w-100 h-100 dashboard-heading position-relative">
              <div onClick={() => dispatch(setRouteLocation(0))}>
                Nasa ExoPlanets Archives
              </div>
              <div className="vaporSquad-container d-md-none d-flex align-items-center justify-content-center">
                <div className="theme-container d-flex align-items-center">
                  <button
                    className={
                      "theme-btn " + (btnRoute == 0 ? "btn-active" : "")
                    }
                    onClick={() => dispatch(setBtnRoute(0))}
                  ></button>
                  <button
                    className={
                      "theme-btn " + (btnRoute == 1 ? "btn-active" : "")
                    }
                    onClick={() => dispatch(setBtnRoute(1))}
                  ></button>
                  <button
                    className={
                      "theme-btn " + (btnRoute == 2 ? "btn-active" : "")
                    }
                    onClick={() => dispatch(setBtnRoute(2))}
                  ></button>
                  <button
                    className={
                      "theme-btn " + (btnRoute == 3 ? "btn-active" : "")
                    }
                    onClick={() => dispatch(setBtnRoute(3))}
                  ></button>
                </div>
                <div
                  className="navbar-toggler menu-btn vaporSquad me-2 ms-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse-id"
                  aria-controls="navbarCollapse-id"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  menu
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 d-none d-md-flex justify-content-center">
            <canvas
              ref={canvasTRef}
              className="dashboard-mesh d-none d-sm-block"
            ></canvas>
          </div>
        </div>

        {/* dropdown menu for small screens */}

        <div className="navbar navbar-expand-lg d-md-none">
          <div className="container-fluid">
            <div
              className="row mt-2 d-md-none m-0 p-0 collapse navbar-collapse"
              id="navbarCollapse-id"
            >
              <div className="col-12 text-center m-0 p-0">
                <select
                  className="nav-btn m-0"
                  value={userSelection["Host Name"]}
                  onChange={(e) =>
                    dispatch(
                      setUserSelection({
                        ...userSelection,
                        "Host Name": e.target.value,
                      })
                    )
                  }
                >
                  <option className="option-item" value={"Host Name"}>
                    Host Name
                  </option>
                  {uniqueHeaders["Host Name"]?.map((host, i) => (
                    <option
                      key={"hn-" + i}
                      value={host}
                      className="option-item"
                    >
                      {host}
                    </option>
                  ))}
                </select>

                <select
                  className="nav-btn m-0"
                  value={userSelection["Discovery Method"]}
                  onChange={(e) =>
                    dispatch(
                      setUserSelection({
                        ...userSelection,
                        "Discovery Method": e.target.value,
                      })
                    )
                  }
                >
                  <option className="option-item">Discovery Method</option>
                  {uniqueHeaders["Discovery Method"]?.map((method, i) => (
                    <option
                      key={"dm-" + i}
                      value={method}
                      className="option-item"
                    >
                      {method}
                    </option>
                  ))}
                </select>

                <select
                  className="nav-btn m-0"
                  value={userSelection["Discovery Year"]}
                  onChange={(e) =>
                    dispatch(
                      setUserSelection({
                        ...userSelection,
                        "Discovery Year": e.target.value,
                      })
                    )
                  }
                >
                  <option className="option-item">Discovery Year</option>
                  {uniqueHeaders["Discovery Year"]?.map((year, i) => (
                    <option
                      key={"dy-" + i}
                      value={year}
                      className="option-item"
                    >
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  className="nav-btn m-0"
                  value={userSelection["Discovery Facility"]}
                  onChange={(e) =>
                    dispatch(
                      setUserSelection({
                        ...userSelection,
                        "Discovery Facility": e.target.value,
                      })
                    )
                  }
                >
                  <option className="option-item">Discovery Facility</option>
                  {uniqueHeaders["Discovery Facility"]?.map((facility, i) => (
                    <option
                      key={"df-" + i}
                      value={facility}
                      className="option-item"
                    >
                      {facility}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 mt-2 m-0 p-0 text-center">
                <div
                  className="nav-btn lookup-btn"
                  onClick={() => {
                    setFilteredData([]);
                    dispatch(
                      setUserSelection({
                        "Host Name": "Host Name",
                        "Discovery Method": "Discovery Method",
                        "Discovery Year": "Discovery Year",
                        "Discovery Facility": "Discovery Facility",
                      })
                    );
                  }}
                >
                  Clear
                </div>
                <div className="nav-btn lookup-btn" onClick={handleSearch}>
                  Probe
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2 m-0 p-0">
          <div className="col-12 col-md-8 p-2">

            {/* actual data location */}

            <div className="dashboard-logs-container">
              <div className="row m-0 p-0 dashboard-main-row mb-1 position-sticky top-0">
                <div className="col-3 col-name d-flex align-items-center justify-content-center planet-column">
                  <div className="dropdown dropdown-center">
                    <a
                      href="#"
                      role="button"
                      id="planetNameDropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="dropdown-toggle"
                    >
                      <span className="d-none d-sm-inline">Planet </span>&nbsp;
                      <span>Name</span>
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="planetNameDropdown"
                    >
                      <div
                        className="dropdown-item"
                        onClick={sortAscendingName}
                      >
                        Ascending
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={sortDescendingName}
                      >
                        Descending
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-2 col-name d-flex align-items-center justify-content-center planet-column">
                  <div className="dropdown dropdown-center">
                    <a
                      href="#"
                      role="button"
                      id="hostNameDropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="dropdown-toggle"
                    >
                      <span>Host</span>
                      <span className="d-none d-sm-inline">&nbsp;Name</span>
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="hostNameDropdown"
                    >
                      <div
                        className="dropdown-item"
                        onClick={sortAscendingHostName}
                      >
                        Ascending
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={sortDecendingHostName}
                      >
                        Descending
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-2 col-name d-flex align-items-center justify-content-center planet-column">
                  <div className="dropdown dropdown-center">
                    <a
                      href="#"
                      role="button"
                      id="yearDropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="dropdown-toggle"
                    >
                      Year
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="yearDropdown"
                    >
                      <div
                        className="dropdown-item"
                        onClick={sortAscendingDate}
                      >
                        Ascending
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={sortDecendingDate}
                      >
                        Descending
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-2 col-name d-flex align-items-center justify-content-center planet-column">
                  <div className="dropdown dropdown-center">
                    <a
                      href="#"
                      role="button"
                      id="methodDropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="dropdown-toggle"
                    >
                      Method
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="methodDropdown"
                    >
                      <div
                        className="dropdown-item"
                        onClick={sortAscendingMethod}
                      >
                        Ascending
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={sortDecendingMethod}
                      >
                        Descending
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3 col-name d-flex align-items-center justify-content-center">
                  <div className="dropdown dropdown-center">
                    <a
                      href="#"
                      role="button"
                      id="sortDropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="dropdown-toggle"
                    >
                      Facility
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="sortDropdown"
                    >
                      <div
                        className="dropdown-item"
                        onClick={sortAscendingFacility}
                      >
                        Ascending
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={sortDecendingFacility}
                      >
                        Descending
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {filteredData.map((planet, i) => (
                <div key={"r-" + i} className="row data-row m-0 p-0">
                  <div
                    key={"c1-" + i}
                    className="col-3 m-0 p-0 d-flex justify-content-center planet-name"
                  >
                    <a
                      target="__blank"
                      href={extractHrefValue(planet["External Link"])}
                    >
                      {planet["Planet Name"]} {"  "}{" "}
                      <img
                        src={"../../../assets/external-link.png"}
                        style={{
                          width: "12px",
                        }}
                        className="external-img"
                      />
                    </a>
                  </div>
                  <div
                    key={"c2-" + i}
                    className="col-2 m-0 p-0 d-flex justify-content-center planet-columns "
                  >
                    {planet["Host Name"]}
                  </div>
                  <div
                    key={"c3-" + i}
                    className="col-2 m-0 p-0 d-flex justify-content-center planet-columns"
                  >
                    {planet["Discovery Year"]}
                  </div>
                  <div
                    key={"c4-" + i}
                    className="col-2 m-0 p-0 d-flex justify-content-center planet-columns"
                  >
                    {planet["Discovery Method"]}
                  </div>
                  <div
                    key={"c5-" + i}
                    className="col-3 m-0 p-0 d-flex justify-content-center planet-columns"
                  >
                    {planet["Discovery Facility"]}
                  </div>
                  <hr className="m-0 mb-2 p-0 position-relative h-row"></hr>
                </div>
              ))}
              {filteredData.length == 0 ? (
                <div
                  className="d-flex w-100 mt-5 mb-5 justify-content-center align-items-center base-message"
                  style={{
                    textShadow: "0px 0px 1px #3ec6b6",
                  }}
                >
                  <p className="text-center">
                    Do some pseudo astronomy,&nbsp;
                    <a
                      href="https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PS"
                      target="__blank"
                      className="nasa-external-list"
                    >
                      check out full detailed lists
                    </a>
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-4 d-md-block d-none p-2 dashboard-search-col">
            <div className="dashboard-search-container position-relative w-100 h-100 d-flex justify-content-center align-items-center">
              <div className="search-lookup">Archive Search</div>
              <div className="right-menu text-center">
                <select
                  className="large-nav-btn m-1"
                  value={userSelection["Host Name"]}
                  onChange={(e) =>
                    dispatch(
                      setUserSelection({
                        ...userSelection,
                        "Host Name": e.target.value,
                      })
                    )
                  }
                >
                  <option className="option-item" value={"Host Name"}>
                    Host Name
                  </option>
                  {uniqueHeaders["Host Name"]?.map((host, i) => (
                    <option
                      key={"hn-" + i}
                      value={host}
                      className="option-item"
                    >
                      {host}
                    </option>
                  ))}
                </select>
                <select
                  className="large-nav-btn m-1"
                  value={userSelection["Discovery Method"]}
                  onChange={(e) =>
                    dispatch(
                      setUserSelection({
                        ...userSelection,
                        "Discovery Method": e.target.value,
                      })
                    )
                  }
                >
                  <option className="option-item">Discovery Method</option>
                  {uniqueHeaders["Discovery Method"]?.map((method, i) => (
                    <option
                      key={"dm-" + i}
                      value={method}
                      className="option-item"
                    >
                      {method}
                    </option>
                  ))}
                </select>
                <select
                  className="large-nav-btn m-1"
                  value={userSelection["Discovery Year"]}
                  onChange={(e) =>
                    dispatch(
                      setUserSelection({
                        ...userSelection,
                        "Discovery Year": e.target.value,
                      })
                    )
                  }
                >
                  <option className="option-item">Discovery Year</option>
                  {uniqueHeaders["Discovery Year"]?.map((year, i) => (
                    <option
                      key={"dy-" + i}
                      value={year}
                      className="option-item"
                    >
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  className="large-nav-btn m-1"
                  value={userSelection["Discovery Facility"]}
                  onChange={(e) =>
                    dispatch(
                      setUserSelection({
                        ...userSelection,
                        "Discovery Facility": e.target.value,
                      })
                    )
                  }
                >
                  <option className="option-item">Discovery Facility</option>
                  {uniqueHeaders["Discovery Facility"]?.map((facility, i) => (
                    <option
                      key={"df-" + i}
                      value={facility}
                      className="option-item"
                    >
                      {facility}
                    </option>
                  ))}
                </select>

                <div className="large-btns-container m-2 p-2">
                  <div
                    className="large-nav-btn ps-2 pe-2 pt-1 pb-1"
                    onClick={() => {
                      setFilteredData([]);
                      dispatch(
                        setUserSelection({
                          "Host Name": "Host Name",
                          "Discovery Method": "Discovery Method",
                          "Discovery Year": "Discovery Year",
                          "Discovery Facility": "Discovery Facility",
                        })
                      );
                    }}
                  >
                    Clear
                  </div>
                  <div
                    className="large-nav-btn ps-2 pe-2 pt-1 pb-1 ms-3"
                    onClick={handleSearch}
                  >
                    Probe
                  </div>
                </div>
                <div className="vaporSquad-container d-flex align-items-center justify-content-center">
                  <div className="theme-container d-flex align-items-center">
                    <button
                      className={
                        "theme-btn " + (btnRoute == 0 ? "btn-active" : "")
                      }
                      onClick={() => dispatch(setBtnRoute(0))}
                    ></button>
                    <button
                      className={
                        "theme-btn " + (btnRoute == 1 ? "btn-active" : "")
                      }
                      onClick={() => dispatch(setBtnRoute(1))}
                    ></button>
                    <button
                      className={
                        "theme-btn " + (btnRoute == 2 ? "btn-active" : "")
                      }
                      onClick={() => dispatch(setBtnRoute(2))}
                    ></button>
                    <button
                      className={
                        "theme-btn " + (btnRoute == 3 ? "btn-active" : "")
                      }
                      onClick={() => dispatch(setBtnRoute(3))}
                    ></button>
                  </div>
                  <div className="vaporSquad ms-auto">vaporSquad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function extractHrefValue(inputString) {
  const hrefIndex = inputString.indexOf("href=") + 5;
  if (hrefIndex >= 5) {
    const endIndex = inputString.indexOf(" ", hrefIndex);
    if (endIndex === -1) {
      return inputString.substring(hrefIndex);
    } else {
      return inputString.substring(hrefIndex, endIndex);
    }
  }
  return null;
}
