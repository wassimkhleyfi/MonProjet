/*
	Component, that display a few charts, with stats info for doctor
	@imported in DoctorTabs
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
	paperStats: {
		margin: "1%"
	},
	headerMargin: {
		marginTop: "1vh"
	}
});

class Stats extends Component {
	render() {
		const { classes } = this.props;
		const {
			quantity,
			sexesPie,
			sexesBar,
			business,
			satisfaction,
			monthlyVisitors
		} = this.props.stats;
		return (
			<div className="grid-stats">
				<div className="stats-quantity">
					<Paper elevation={3}>
						<Typography
							className={classes.headerMargin}
							align="center"
							variant="h5">
							Nbre de patients
						</Typography>
						<Typography align="center" variant="subtitle1">
							vous avez
						</Typography>
						<Chart
							height="100%"
							width="100%"
							type="radialBar"
							options={quantity.options}
							series={quantity.series}
						/>
						<Typography align="center" variant="subtitle1">
							Patients
						</Typography>
					</Paper>
				</div>

				<div className="stats-sex">
					<Paper elevation={3}>
						<Typography
							className={classes.headerMargin}
							align="center"
							variant="h5">
							Sexe
						</Typography>
						<Chart
							options={sexesPie.options}
							series={sexesPie.series}
							type="pie"
							width="100%"
							height="150%"
						/>
					</Paper>
				</div>

				<div className="stats-ages">
					<Paper elevation={3}>
						<Typography
							className={classes.headerMargin}
							align="center"
							variant="h5">
							Ages
						</Typography>
						<Chart
							options={sexesBar.options}
							series={sexesBar.series}
							height="150%"
							width="100%"
							type="bar"
						/>
					</Paper>
				</div>

				<div className="stats-visits">
					<Paper elevation={3}>
						<Typography
							className={classes.headerMargin}
							align="center"
							variant="h5">
							Visites
						</Typography>
						<Chart
							options={business.options}
							series={business.series}
							height="150%"
							width="100%"
							type="line"
						/>
					</Paper>
				</div>

				<div className="stats-satisfaction">
					<Paper elevation={3}>
						<Typography
							className={classes.headerMargin}
							align="center"
							variant="h5">
							Satisfaction Patients
						</Typography>
						<Chart
							options={satisfaction.options}
							series={satisfaction.series}
							type="donut"
							height="150%"
							width="100%"
						/>
					</Paper>
				</div>

				<div className="stats-month">
					<Paper elevation={3}>
						<Typography
							className={classes.headerMargin}
							align="center"
							variant="h5">
							Statistiques mensuelles
						</Typography>
						<Typography align="center" variant="subtitle1">
							vous avez
						</Typography>
						<Chart
							type="radialBar"
							options={monthlyVisitors.options}
							series={monthlyVisitors.series}
							height="100%"
							width="100%"
						/>
						<Typography align="center" variant="subtitle1">
							Visites ce mois
						</Typography>
					</Paper>
				</div>
			</div>
		);
	}
}

Stats.propTypes = {
	classes: PropTypes.object.isRequired,
	stats: PropTypes.object.isRequired
};

export default withStyles(styles)(Stats);
