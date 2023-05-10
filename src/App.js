// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { useState, Suspense } from "react";
// import { useEffect } from "react";
// import DeviceList from "./components/DeviceList";
import DeviceForm from "./components/DeviceForm";
import "./components/DeviceList.css";
const DeviceList = React.lazy(() => import("./components/DeviceList.js"));
function App() {
  const [condition, setCondition] = useState("New");
  const [newDevices, setNewDevices] = useState(70);
  const [usedDevices, setUsedDevices] = useState(80);
  const [deviceDetails, setDeviceDetails] = useState({});
  const [action, setAction] = useState();
  const [deviceID, setDeviceID] = useState();
  const [isNewDeviceChecked, setIsNewDeviceChecked] = useState(true);
  const [isRestoreTheDevices, setIsRestoreTheDevices] = useState(false);

  const handleChange = (event) => {
    setCondition(event.target.value);
    setIsNewDeviceChecked(!isNewDeviceChecked);
    if (isRestoreTheDevices) {
      event.target.value === "newDevices"
        ? setUsedDevices(usedDevices + 1)
        : setNewDevices(newDevices + 1);
      setIsRestoreTheDevices(false);
    }
  };
  const handleItemSelection = (action, id) => {
    setAction(action);
    setDeviceID(id);
  };

  const restoreDevices = (restoration) => {
    restoration === "New"
      ? setNewDevices(newDevices + 1)
      : setUsedDevices(usedDevices + 1);
    setAction("");
  };

  const setSelectedDevice = (theDevice) => {
    theDevice === "New"
      ? setIsNewDeviceChecked(true)
      : setIsNewDeviceChecked(false);
    setCondition(theDevice);
    setIsRestoreTheDevices(true);
  };
  const setNewQuantity = (newQuantity) => {
    if (condition === "New") {
      setNewDevices(newQuantity);
    } else {
      setUsedDevices(newQuantity);
    }
  };
  return (
    <div className="App">
      <div className="condition">
        <h3 className="title">Device Registration System</h3>
        <ul className="ulDevice">
          <li className="parentLabels" onChange={handleChange}>
            <input
              type="radio"
              className="radioSel"
              value="New"
              name="deviceGroup"
              checked={isNewDeviceChecked}
            />
            <label>New Devices</label>
            <input
              type="radio"
              className="radioSel"
              value="Used"
              name="deviceGroup"
              checked={!isNewDeviceChecked}
            />
            <label>Used Devices</label>
          </li>
          <li>
            <label className="parentLabels">
              Remaining {condition} Devices
              {condition === "New" ? newDevices : usedDevices}
            </label>
          </li>
        </ul>
      </div>

      <DeviceForm
        setDeviceDetails={setDeviceDetails}
        handleItemSelection={handleItemSelection}
      />
      <Suspense fallback={<div> Record A Device ....</div>}>
        <DeviceList
          deviceDetails={deviceDetails}
          setDeviceDetails={setDeviceDetails}
          selectedDeviceID={deviceID}
          action={action}
          restoreDevices={restoreDevices}
          setNewQuantity={setNewQuantity}
          currentQuantity={condition === "New" ? newDevices : usedDevices}
          chosenOption={condition}
          setSelectedDevice={setSelectedDevice}
        />
      </Suspense>
    </div>
  );
}

export default App;
