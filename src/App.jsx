import React from "react";
import Dashboard from "./views/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import './App.css';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: "1rem",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

function App() {
	const classes = useStyles();

	return (
		<>
			<div className={classes.root}>
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
