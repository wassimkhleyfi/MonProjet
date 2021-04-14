/*
	The first page that user see, route at "/"
	@imported in App
*/
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
// Components
import Header from "../app-bar/Header";

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2
	},
	dimensions: {
		width: "30vw",
		height: "30vw",
		margin: "15vh auto"
	},
	margins: {
		margin: "1vw auto"
	}
});

class RootPage extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Header headerLabel="Projet Wassim et Hamdi" />
				<div className={classes.dimensions}>
					<Typography variant="h4" align="center">
						Welcome to Wassim & Hamdi project
					</Typography>
					<Typography variant="h6" align="center">
					Système d'information médical simple, qui permet aux patients
                    de communiquer avec les médecins et vice versa
					</Typography>
					<Link to="/register">
						<Button
							className={classes.margins}
							variant="contained"
							fullWidth={true}
							color="secondary"
							size="large">
							Register
						</Button>
					</Link>
					<Link to="/login">
						<Button
							variant="outlined"
							fullWidth={true}
							color="secondary"
							size="large">
							Login
						</Button>
					</Link>
				</div>
			</div>
		);
	}
}

RootPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RootPage);
