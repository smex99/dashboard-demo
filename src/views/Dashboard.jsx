import React, { useEffect, useState } from "react";
import { uniq } from "lodash";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import {
	Container,
	Grid,
	Typography,
	Card,
	CardHeader,
	CardContent,
	Button,
	IconButton,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { DateRangePicker } from "@matharumanpreet00/react-daterange-picker";
import { makeStyles } from "@material-ui/core/styles";
// Data
import { sentiment } from "../data/general_sentiment_data";
import { product } from "../data/all_products_data";
import { product as productS } from "../data/product_sentiment_data";
import { buzzWord } from "../data/buzz_words_data";
// Components
import ProductBuzz from "../components/ProductBuzz";

/* Adapt sentiments from API **/
const sentimentAdapter = (sentiments) => {
	let labels = [];
	let data = [];
	let backgroundColor = [];

	sentiments.forEach((sentiment) => {
		labels.push(sentiment.polarity);
		data.push(sentiment.score_sentiment);
		backgroundColor.push(sentiment.color);
	});

	let result = {
		labels,
		datasets: [
			{
				data,
				backgroundColor,
				hoverBackgroundColor: backgroundColor,
			},
		],
	};

	return result;
};

/* Adapt products from API **/
const productAdapter = (products) => {
	const colors = [
		"#32a852",
		"#153c66",
		"#a530b3",
		"#92aede",
		"#4d2224",
		"#f59207",
	];
	let data = []; // count of comments per product
	let labels = []; // product name

	// Generate a list of uniq product id's
	let productIds = [];
	let productNames = [];

	products.forEach((product) => {
		productIds.push(product.id_product);
		productNames.push(product.product_name);
	});

	const uniqProductIds = uniq(productIds);
	labels = uniq(productNames);

	uniqProductIds.forEach((id) => {
		let result;
		// filter the products array based on a uniq id
		result = products.filter((product) => id === product.id_product);
		// push the count into data object
		data.push(result.length);
	});

	let result = {
		labels,
		datasets: [
			{
				data,
				backgroundColor: colors,
				hoverBackgroundColor: colors,
			},
		],
	};

	return result;
};

/* Create product datasets based on product polarity **/
const productSentimentAdapter = (productSentiment) => {
	let neutralData = [];
	let negativeData = [];
	let positiveData = [];

	productSentiment.forEach((item) => {
		if (item.polarity === "positive")
			positiveData.push({ t: item.date, y: item.score_product / 100 });
		else if (item.polarity === "negative")
			negativeData.push({ t: item.date, y: item.score_product / 100 });
		else neutralData.push({ t: item.date, y: item.score_product / 100 });
	});

	let result = {
		datasets: [
			{
				label: "Positive",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				lineTension: 0.1,
				backgroundColor: "rgba(61, 173, 38,0.4)",
				borderColor: "rgba(61, 173, 38,1)",
				borderCapStyle: "butt",
				pointHoverBackgroundColor: "rgba(61, 173, 38,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: positiveData,
			},
			{
				label: "Negative",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				lineTension: 0.1,
				backgroundColor: "rgba(230, 90, 90,0.4)",
				borderColor: "rgba(230, 90, 90,1)",
				borderCapStyle: "butt",
				pointHoverBackgroundColor: "rgba(230, 90, 90,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: negativeData,
			},
			{
				label: "Neutral",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				lineTension: 0.1,
				backgroundColor: "rgba(245, 197, 66,0.4)",
				borderColor: "rgba(245, 197, 66,1)",
				borderCapStyle: "butt",
				pointHoverBackgroundColor: "rgba(245, 197, 66,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: neutralData,
			},
		],
	};

	return result;
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	container: {
		marginBottom: "1rem",
	},
}));

const Dashboard = () => {
	useEffect(() => {
		setGeneralSentiment(sentimentAdapter(sentiment));
		setShareComments(productAdapter(product));
		setProductSentiment(productSentimentAdapter(productS));
	}, []);

	const [generalSentiment, setGeneralSentiment] = useState({});
	const [shareComments, setShareComments] = useState({});
	const [productSentiment, setProductSentiment] = useState({});

	const [open, setOpen] = useState(false);
	const [dateRange, setDateRange] = useState({});

	const classes = useStyles();

	const toggleDatepicker = () => setOpen(!open);

	return (
		<div className={classes.root}>
			<Container maxWidth="xl" className={classes.container}>
				<Typography variant="h6" gutterBottom>
					Last 7 days: Summary
				</Typography>
				<Grid container spacing={2}>
					<Grid item md={4} sm={12}>
						<Card>
							<CardHeader
								title={<Typography variant="h6">Sentiments</Typography>}
								action={
									<IconButton aria-label="settings">
										<MoreVertIcon />
									</IconButton>
								}
							/>
							<CardContent>
								<Pie
									data={generalSentiment}
									options={{
										legend: {
											display: false,
										},
									}}
								/>
							</CardContent>
						</Card>
					</Grid>

					<Grid item md={4} sm={12}>
						<Card>
							<CardHeader
								title={<Typography variant="h6">Share Comments</Typography>}
								action={
									<IconButton aria-label="settings">
										<MoreVertIcon />
									</IconButton>
								}
							/>

							<CardContent>
								<Doughnut
									data={shareComments}
									options={{
										legend: {
											display: false,
										},
									}}
								/>
							</CardContent>
						</Card>
					</Grid>

					<Grid item md={4} sm={12}>
						<Card>
							<CardHeader
								title={<Typography variant="h6">BuzzWords</Typography>}
								action={
									<IconButton aria-label="settings">
										<MoreVertIcon />
									</IconButton>
								}
							/>
							<CardContent>
								<Grid container>
									{buzzWord.map((word) => {
										return (
											<Grid
												item
												component="div"
												key={word.text}
												style={{
													color: word.color,
													paddingTop:
														(Math.random() * 100).toFixed().toString() + "px",
													fontWeight: (parseInt(word.weight) * 100).toString(),
													fontSize:
														(parseInt(word.weight) * 8).toString() + "px",
												}}
											>
												{word.text}
											</Grid>
										);
									})}
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>

			<Container maxWidth="xl" className={classes.container}>
				<Grid container spacing={2}>
					<Grid item md={5} sm={12}>
						<Card>
							<CardHeader
								disableTypography
								title={<Typography variant="h6">Product Buzz</Typography>}
								action={
									<IconButton aria-label="settings">
										<MoreVertIcon />
									</IconButton>
								}
							/>

							<CardContent>
								<Grid container spacing={2}>
									{product.map((item) => {
										return (
											<Grid item key={item.uuid}>
												<ProductBuzz
													polarity={item.polarity}
													name={item.product_name}
												/>
											</Grid>
										);
									})}
								</Grid>
							</CardContent>
						</Card>
					</Grid>

					<Grid item md={7} sm={12}>
						<Card>
							<CardHeader
								title={<Typography variant="h6">Sentiments</Typography>}
								action={
									<IconButton aria-label="settings">
										<MoreVertIcon />
									</IconButton>
								}
							/>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item md={12} sm={12}>
										<Button
											color="primary"
											variant="contained"
											onClick={() => toggleDatepicker()}
										>
											{open ? "Close" : "Date range"}
										</Button>

										<DateRangePicker
											open={open}
											onChange={(range) => setDateRange(range)}
										/>

										<div style={{ marginTop: "1rem" }}>
											<Line
												data={productSentiment}
												options={{
													scales: {
														xAxes: [
															{
																type: "time",
																distribution: "series",
																time: {
																	unit: "week",
																	tooltipFormat: "lll",
																},
																ticks: {
																	max: dateRange.endDate,
																	min: dateRange.startDate,
																},
															},
														],
													},
												}}
											/>
										</div>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Dashboard;
