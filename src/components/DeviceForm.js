import "../App.css";
import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
export default function DeviceForm(props) {
  const [dname, setDname] = useState("");
  const [dtype, setDtype] = useState("");
  const [email, setEmail] = useState("");
  const [btnValue, setBtnValue] = useState("Register");
  const [theDeviceId, setTheDeviceId] = useState(0);

  const handleEdit = (theID) => {
    handleInputReset(dname, dtype, email);
    setTheDeviceId(theID);
    setBtnValue("Update");
    props.handleItemSelection("edit", theID);
  };

  const handleClickCancel = (event) => {
    handleInputReset("", "", "");
    setBtnValue("Register");
    event.preventDefault();
  };

  const handleClick = (event) => {
    handleInputReset("", "", "");
    const randomID = Math.floor(1000 + Math.random() * 9000);
    let id = randomID;
    setTheDeviceId(randomID);
    id = btnValue === "Register" ? randomID : theDeviceId;
    props.setDeviceDetails({
      key: id,
      dname: dname,
      dtype: dtype,
      condition: props.chosenOption,
      email: email,
      edit: <MdEdit className="actionIcon" onClick={() => handleEdit(id)} />,
      delete: (
        <MdDelete
          className="actionIcon"
          onClick={() => props.handleItemSelection("delete", id)}
        />
      ),
    });
    setBtnValue("Register");
    event.preventDefault();
  };

  const handleInputChange = (setInput, event) => {
    setInput(event.target.value);
  };

  const handleInputReset = (dname, dtype, email) => {
    setDname(dname);
    setDtype(dtype);
    setEmail(email);
  };

  return (
    <div>
      <div className="recordDevice">
        <form className="register" name="register">
          <ul className="record">
            <li>
              <label htmlFor="dname">Device Name</label>
              <input
                type="text"
                className="inputFields"
                id="dname"
                name="dname"
                placeholder="Device Name"
                value={dname}
                onChange={(event) => handleInputChange(setDname, event)}
              />
            </li>
            <li>
              <label htmlFor="dtype">Device Type</label>
              <input
                type="text"
                className="inputFields"
                id="dtype"
                name="dtype"
                placeholder="Device Type"
                value={dtype}
                onChange={(event) => handleInputChange(setDtype, event)}
              />
            </li>
            <li>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="inputFields"
                id="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(event) => handleInputChange(setEmail, event)}
              />
            </li>
            <li id="center-btn">
              <input
                type="submit"
                id="btnRegister"
                name="Register"
                className="btn"
                alt="Register"
                value={btnValue}
                onClick={handleClick}
              />
            </li>
            <li id="center-btn">
              <input
                type="submit"
                id="btnCancel"
                name="Cancel"
                className="btn"
                alt="Cancel"
                value="Cancel"
                onClick={handleClickCancel}
              />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
