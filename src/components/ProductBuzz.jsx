import React from "react";
import { Card } from "@material-ui/core";

const red = {
	backgroundColor: "rgba(230, 90, 90,1)",
	color: "white",
	height: "5rem",
	width: "5rem",
	fontSize: "15px",
	textAlign: "center",
};

const green = {
	backgroundColor: "rgba(61, 173, 38)",
	color: "white",
	height: "5rem",
	width: "5rem",
	textAlign: "center",
};

const orange = {
	backgroundColor: "rgba(245, 197, 66,1)",
	color: "white",
	height: "5rem",
	width: "5rem",
	textAlign: "center",
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
