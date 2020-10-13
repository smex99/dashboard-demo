import React from "react";
import ReactDOM from "react-dom";
import { LocalizationProvider } from "@material-ui/pickers";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
	<LocalizationProvider dateAdapter={DateFnsAdapter}>
		<App />
	</LocalizationProvider>,
	document.getElementById("root")
);

serviceWorker.unregister();
