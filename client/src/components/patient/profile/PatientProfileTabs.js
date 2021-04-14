/*
  Component, part of Patient Profile, contains tabs.
  @imported in PatientProfile
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import EventIcon from "@material-ui/icons/Event";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";
import FaceIcon from "@material-ui/icons/Face";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
// Components
import Diary from "./profile-tabs/Diary";
import Recepies from "./profile-tabs/Recepies";

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	},
	infoItems: {
		marginLeft: ".5em",
		fontSize: "1.3em"
	}
});

class PatientProfileTabs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
		this.handleChange = this.handleChange.bind(this);
		this.generalInfo = this.generalInfo.bind(this);
		this.medicalQuestions = this.medicalQuestions.bind(this);
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	generalInfo(user, classes) {
		return (
			<div className="profileGrid">
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
					 <Typography variant="subtitle2">						
					 {`Call contact ${user.settings.emergency.fName} ${
								user.settings.emergency.lName
							} which is ${
								user.settings.emergency.relation
							}, Phone number: ${
								user.settings.emergency.phoneNumber
							}`}
					</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}

	medicalQuestions(user) {
		return (
			<div>
				<div className="">
					<Typography variant="h5">{`Allergies: ${
						user.settings.allergies
					}`}</Typography>
					<Typography variant="h5">
						{`Allergies on medicines: ${
							user.settings.medAllergies
						}`}
					</Typography>
					<Typography variant="h5">{`Injuries: ${
						user.settings.injuries
					}`}</Typography>
					<Typography variant="h5">{`Past operations: ${
						user.settings.operations
					}`}</Typography>
					<Typography variant="h5">{`Current medicines: ${
						user.settings.currMeds
					}`}</Typography>
				</div>
			</div>
		);
	}

	render() {
		const { classes, user } = this.props;
		const { value } = this.state;
		return (
			<div>
				<div className={classes.root}>
					<AppBar position="static" color="inherit" elevation={0}>
						<Tabs
							value={value}
							onChange={this.handleChange}
							centered
							variant="fullWidth">
							<Tab label="General" />
							<Tab label="Medical questions" />
							<Tab label="E-card" />
							<Tab label="Recepies" />
						</Tabs>
					</AppBar>
					{value === 0 && (
						<TabContainer>
							{this.generalInfo(user, classes)}
						</TabContainer>
					)}
					{value === 1 && (
						<TabContainer>
							{this.medicalQuestions(user)}
						</TabContainer>
					)}
					{value === 2 && (
						<TabContainer>
							<Diary user={user} />
						</TabContainer>
					)}
					{value === 3 && (
						<TabContainer>
							<Recepies user={user} />
						</TabContainer>
					)}
				</div>
			</div>
		);
	}
}

PatientProfileTabs.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

export default withStyles(styles)(PatientProfileTabs);
