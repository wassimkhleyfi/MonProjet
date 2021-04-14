/*
  Component that shows when you click on my profile in menu, as patient
  @imported in ProfileActions
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
//import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import EventIcon from "@material-ui/icons/Event";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";
import FaceIcon from "@material-ui/icons/Face";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// Helpers
import getAvatarInitials from "../../../helpers/getAvatarInitials";
import { colors } from "../../../helpers/palette";
// Components
// Actions
// import { getUserData } from "../../../actions/utilsActions";

const styles = theme => ({
	root: {
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		width: "80%",
		margin: "auto",
		flexGrow: 1
	},
	purpleAvatar: {
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		color: "#fff",
		width: 150,
		fontSize: "50px",
		height: 150,
		backgroundColor: deepPurple[500]
	},
	secondPaper: {
		width: "80%",
		margin: "1em auto"
	},
	infoItems: {
		marginLeft: ".5em",
		fontSize: "1.3em"
	}
});

class LocalPatientProfile extends Component {
	generalInfo(user, classes) {
		return (
			<div className="localProfileGrid">
				<div className="flex flex-center">
					<HomeIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">{`${user.settings.address.city}, ${
						user.settings.address.street
					} ${user.settings.address.number}`}</Typography>
				</div>
				<div className="flex flex-center">
					<PhoneIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">{`${
						user.settings.phone
					}`}</Typography>
				</div>
				<div className="flex flex-center">
					<EventIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">{`${
						user.settings.birthday
					}`}</Typography>
				</div>
				<div className="flex flex-center">
					<FaceIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">{`${
						user.settings.sex
					}`}</Typography>
				</div>
				<div className="flex flex-center">
					<MailIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">{`${
						user.settings.email
					}`}</Typography>
				</div>
				<div className="flex flex-center">
					<WorkIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">{`${
						user.settings.work
					}`}</Typography>
				</div>
				<div className="flex flex-center">
					<ChildFriendlyIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">{`${
						user.settings.maritalStatus
					}`}</Typography>
				</div>
				<div className="flex flex-center">
					<AccessibilityIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">{`${user.settings.height}cm/${
						user.settings.weight
					}kg`}</Typography>
				</div>
				<div className="flex flex-center">
					<FavoriteIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">{`${user.settings.blood.type} ${
						user.settings.rhesus
					}`}</Typography>
				</div>
				<ExpansionPanel className="emergencyPanel">
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography
							className={classes.infoItems}
							variant="subtitle1">
							En cas d'urgence!
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
					{`Call contact ${user.settings.emergency.fName} ${
								user.settings.emergency.lName
							} which is ${
								user.settings.emergency.relation
							}, Phone number: ${
								user.settings.emergency.phoneNumber
							}`}
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}

	render() {
		console.log(this.props);
		const { classes, user } = this.props;
		let initials = getAvatarInitials(user.firstName, user.lastName).join(
			""
		);

		return (
			<div>
				<Paper className={classes.root} elevation={1}>
					<div className="flex flex-center">
						<Avatar
							style={{
								backgroundColor: `${colors[user.color].bgc}`
							}}
							className={classes.purpleAvatar}>
							{initials}
						</Avatar>
						<Typography variant="h3">{`${user.firstName} ${
							user.lastName
						}`}</Typography>
					</div>
				</Paper>
				<Paper className={classes.secondPaper} elevation={2}>
					{this.generalInfo(user, classes)}
				</Paper>
			</div>
		);
	}
}

LocalPatientProfile.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

export default withStyles(styles)(LocalPatientProfile);
