import React from "react";
import { Card } from "@material-ui/core";

const red = {
	display: "flex",
	backgroundColor: "rgba(230, 90, 90,1)",
	color: "white",
	height: "6.5rem",
	width: "6.5rem",
	fontSize: "15px",
	textAlign: "center",
	justifyContent: "center",
	alignContent: "center",
	alignItems: "center",
};

const green = {
	display: "flex",
	backgroundColor: "rgba(61, 173, 38)",
	color: "white",
	height: "6.5rem",
	width: "6.5rem",
	textAlign: "center",
	justifyContent: "center",
	alignContent: "center",
	alignItems: "center",
};

const orange = {
	display: "flex",
	backgroundColor: "rgba(245, 197, 66,1)",
	color: "white",
	height: "6.5rem",
	width: "6.5rem",
	textAlign: "center",
	justifyContent: "center",
	alignContent: "center",
	alignItems: "center",
};

const ProductBuzz = (props) => {
	if (props.polarity === "negative") {
		return <Card style={red}>{props.name}</Card>;
	} else if (props.polarity === "positive") {
		return <Card style={green}>{props.name}</Card>;
	} else {
		return <Card style={orange}>{props.name}</Card>;
	}
};

export default ProductBuzz;
