import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import App1 from "./Assignment-1/App-1";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App1 />, document.getElementById("root"));
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
