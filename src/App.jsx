import "./App.css";
import Overlay from "./components/overlay";
import WelcomeBody from "./pages/welcome";
import DashBoard from "./pages/dashboard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setData, setIsDataLoaded, setUniqueHeaders } from "./redux/store";

function App() {
  const routeLocation = useSelector((state) => state.routeLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);
  return (
    <>
      <Overlay />
      {routeLocation == 0 ? (
        <WelcomeBody />
      ) : routeLocation == 1 ? (
        <DashBoard />
      ) : (
        ""
      )}
    </>
  );
}

export default App;

async function fetchData(dispatch) {
  try {
    const response = await fetch("../assets/nasaarchives.csv");
    const csvData = await response.text();
    const jsonData = csvToJson(csvData);

    dispatch(setData(jsonData));
    calculateUniqueEntries(jsonData, dispatch);
    dispatch(setIsDataLoaded(true));
  } catch (e) {
    console.error(e);
  }
}

function csvToJson(csvData) {
  const lines = csvData.trim().split("\n");
  const headerLine = lines[0].replace(/\s+/g, " ").trim(); // Clean up header
  const headers = headerLine.replace(/\r$/, "").split(",");
  const jsonData = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].replace(/\r$/, "").split(","); // Remove trailing \r
    const entry = {};

    for (let j = 0; j < headers.length; j++) {
      entry[headers[j]] = values[j];
    }

    jsonData.push(entry);
  }

  return jsonData;
}

function calculateUniqueEntries(jsonData, dispatch) {
  let uniqueHeaders = {
    'Host Name': [],
    'Discovery Method': [],
    'Discovery Year': [],
    'Discovery Facility': [],
};

  jsonData.forEach((entry) => {
    Object.keys(uniqueHeaders).forEach((header) => {
      if (!uniqueHeaders[header].includes(entry[header])) {
        uniqueHeaders[header].push(entry[header]);
      }
    });
  });

  uniqueHeaders['Host Name'].sort();
  uniqueHeaders['Discovery Year'].sort();
  uniqueHeaders['Discovery Method'].sort();
  uniqueHeaders['Discovery Facility'].sort();
  console.log( "unique headers",uniqueHeaders);


  // Dispatch the unique entries to Redux
  dispatch(setUniqueHeaders(uniqueHeaders));
  // return uniqueHeaders;
}