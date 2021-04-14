/*
  Component that display doctor as a card in patient`s tab my doctors
  @imported at DoctorsList
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import DateIcon from "@material-ui/icons/DateRange";
import PhoneIcon from "@material-ui/icons/Phone";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PlaceIcon from "@material-ui/icons/Place";
import StarIcon from "@material-ui/icons/Star";
import HealingIcon from "@material-ui/icons/Healing";
import CabinetIcon from "@material-ui/icons/MeetingRoom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
// Helpers
import getAvatarInitials from "../../helpers/getAvatarInitials";
import { colors } from "../../helpers/palette";
// Actions
import { unsubscribeFromDoctor } from "../../actions/utilsActions";
// Components
import DoctorProfile from "../doctor/profile/DoctorProfile";

const styles = {
	card: {
		width: "23vw"
	},
	media: {
		height: 100
	},
	bigAvatar: {
		width: 60,
		height: 60,
		margin: "0 10px 10px 0"
	},
	typoMargin: {
		marginBottom: "-6px",
		marginLeft: "1em"
	},
	appBar: {
		position: "relative"
	}
};

class UserCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileOpen: false,
			openConfirmUnsubscribe: false
		};
		this.closeProfile = this.closeProfile.bind(this);
		this.Transition = this.Transition.bind(this);
		this.calculateAge = this.calculateAge.bind(this);
		this.unsubscribe = this.unsubscribe.bind(this);
		this.renderSwitch = this.renderSwitch.bind(this);
	}

	closeProfile = () => {
		this.setState({ profileOpen: false });
	};

	Transition(props) {
		return <Slide direction="up" {...props} />;
	}

	calculateAge(birthday) {
		// birthday is a date
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	unsubscribe = () => {
		unsubscribeFromDoctor(this.props.parent, this.props.user._id);
		window.location.reload();
	};

	renderSwitch(arg) {
		switch (arg) {
			case "0-3":
				return "Up to 3 years of med practice";
			case "3-5":
				return "5 years of med practice";
			case "5-10":
				return "Almost 10 years of med practice";
			case "10-15":
				return "15 years of med practice";
			case "15+":
				return "More than 15 years of med practice";
			default:
				return "N/A";
		}
	}

	render() {
		const { classes, user } = this.props;
		if (!user.settings) {
			user.settings = {
				birthday: "N/A",
				address: {
					city: "N/A",
					street: "N/A",
					number: "N/A"
				},
				phone: "N/A",
				work: "N/A",
				clinicName: "N/A",
				cabinet: "N/A",
				workPhone: "N/A",
				specialty: "N/A",
				yearsOfPractice: "N/A"
			};
		}
		let birthday, pickedDate, recievedDate;
		let initials = getAvatarInitials(user.firstName, user.lastName).join(
			""
		);
		if (user.settings.birthday) {
			pickedDate = user.settings.birthday.split("-");
			recievedDate = new Date(...pickedDate);
			birthday = `${recievedDate.getDate()}.${recievedDate.getMonth() +
				1}.${recievedDate.getFullYear()} (${this.calculateAge(
				recievedDate
			)} years)`;
		} else birthday = "N/A";
		return (
			<div>
				<Card className={classes.card}>
					<CardActionArea>
						<CardMedia
							className={`${classes.media} ${user.color}`}
							src="none"
						/>
						<CardContent>
							{/* Title */}
							<div className="flex flex-center">
								<Avatar
									sizes="large"
									style={{
										backgroundColor: `${
											colors[user.color].bgc
										}`
									}}
									className={`${classes.bigAvatar}`}>
									{initials}
								</Avatar>
								<Typography variant="h5" component="h2">
									{`Dr. ${user.firstName} ${user.lastName}`}
								</Typography>
							</div>
							{/* Clinic name */}
							<div className="flex flex-center creditsPos">
								<LocalHospitalIcon />
								<Typography
									component="p"
									variant="body2"
									className={classes.typoMargin}>
									{`${user.settings.clinicName || "N/A"}`}
								</Typography>
							</div>
							{/* Clinic address */}
							<div className="flex flex-center creditsPos">
								<PlaceIcon />
								<Typography
									component="p"
									variant="body2"
									className={classes.typoMargin}>
									{user.settings
										? `${user.settings.address.city ||
												"N/A"}, ${user.settings.address
												.street || "N/A"} ${user
												.settings.address.number ||
												"N/A"}`
										: "N/A"}
								</Typography>
							</div>
							{/* Cabinet */}
							<div className="flex flex-center creditsPos">
								<CabinetIcon />
								<Typography
									component="p"
									variant="body2"
									className={classes.typoMargin}>
									{user.settings.cabinet
										? `Cabinet #${user.settings.cabinet}`
										: "N/A"}
								</Typography>
							</div>
							{/* Date of birth */}
							<div className="flex flex-center creditsPos">
								<DateIcon />
								<Typography
									component="p"
									variant="body2"
									className={classes.typoMargin}>
									{birthday}
								</Typography>
							</div>
							{/* Phone number */}
							<div className="flex flex-center creditsPos">
								<PhoneIcon />
								<Typography
									component="p"
									variant="body2"
									className={classes.typoMargin}>
									{user.settings.workPhone || "N/A"}
								</Typography>
							</div>
							{/* Specialty */}
							<div className="flex flex-center creditsPos">
								<HealingIcon />
								<Typography
									component="p"
									variant="body2"
									className={classes.typoMargin}>
									{`${user.settings.specialty || "N/A"}`}
								</Typography>
							</div>
							{/* Years of practice */}
							<div className="flex flex-center creditsPos">
								<StarIcon />
								<Typography
									component="p"
									variant="body2"
									className={classes.typoMargin}>
									{this.renderSwitch(
										user.settings.yearsOfPractice
									)}
								</Typography>
							</div>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button
							onClick={() =>
								this.setState({ openConfirmUnsubscribe: true })
							}>
							DESINSCRIRE
						</Button>
						<Button
							onClick={() => {
								this.setState({ profileOpen: true });
							}}>
							VOIR PROFILE
						</Button>
					</CardActions>
				</Card>
				<Dialog
					fullScreen
					open={this.state.profileOpen}
					onClose={this.closeProfile}
					TransitionComponent={this.Transition}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								onClick={this.closeProfile}
								aria-label="Close">
								<CloseIcon />
							</IconButton>
							<Typography
								variant="h6"
								color="inherit"
								className={classes.flex}>
								{`${this.props.user.firstName} ${
									this.props.user.lastName
								}`}
							</Typography>
						</Toolbar>
					</AppBar>
					<DoctorProfile user={this.props.user} />
				</Dialog>

				<Dialog
					open={this.state.openConfirmUnsubscribe}
					onClose={() =>
						this.setState({ openConfirmUnsubscribe: false })
					}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description">
					<DialogTitle id="alert-dialog-title">
						{"Unregister"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
						Voulez-vous vraiment vous désinscrire de ce médecin?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() =>
								this.setState({ openConfirmUnsubscribe: false })
							}
							color="secondary">
							Annuler
						</Button>
						<Button
							variant="contained"
							onClick={this.unsubscribe}
							color="secondary"
							autoFocus>
							Oui, désinscrire
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

UserCard.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

export default withStyles(styles)(UserCard);
