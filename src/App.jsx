import React from "react";
import Dashboard from "./views/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	title: {
		flexGrow: 1,
	},
}));

function App() {
	const classes = useStyles();

	return (
		<>
			<div className="navbar">
				<AppBar position="static">
					<Toolbar>
						<Typography className={classes.title}>
							THE GOOD DATAFACTORY
						</Typography>
						<Typography>Dashboard</Typography>
					</Toolbar>
				</AppBar>
			</div>

			<Dashboard />
		</>
	);
}

export default App;
