import "./../home.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
const DEV_API = process.env.REACT_APP_DEV_API;

function Hometest() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  const casa = () => {
    axios
      .post(DEV_API + `/api/users/login`)
      .then((res) => {
        console.log("ressss", res);
      })
      .catch((res) => {
        console.log("We couldnt retrieve your Article");
      });
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => casa()}>Click me</button>
    </div>
  );
}

export default Hometest;
