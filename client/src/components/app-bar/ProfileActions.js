/*
    Component that show appbar in most screens, menu of logout etc, avatar icon in right side, and renders
dialog window for generating token for doctor
    @imported in DoctorHomepage, PatientHomepage, PatientSettings, DoctorSettings
*/
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";

import getAvatarInitials from "../../helpers/getAvatarInitials";
// Components
import LocalPatientProfile from "../patient/profile/LocalPatientProfile";
import LocalDoctorProfile from "../doctor/profile/LocalDoctorProfile";
// Actions
import { logout } from "../../actions/authorizationAction";
import { setToken, getUserData } from "../../actions/utilsActions";

const TokenGenerator = require("uuid-token-generator");

const token = new TokenGenerator().generate();

const styles = theme => ({
	root: {
		width: "100%"
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block"
		}
	},
	inputRoot: {
		color: "inherit",
		width: "100%"
	},
	avatar: {
		color: "#fff",
		backgroundColor: "#f15e09"
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: 200
		}
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex"
		}
	},
	appBar: {
		position: "relative"
	}
});

class ProfileActions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
			mobileMoreAnchorEl: null,
			open: false,
			snackOpen: false,
			openProfile: false
		};
		this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
		this.handleMenuClose = this.handleMenuClose.bind(this);
		this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
		this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
		this.dialogOpen = this.dialogOpen.bind(this);
		this.dialogClose = this.dialogClose.bind(this);
		this.dialogCopy = this.dialogCopy.bind(this);
		this.snackClose = this.snackClose.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.closeProfile = this.closeProfile.bind(this);
		this.Transition = this.Transition.bind(this);
	}

	componentDidMount() {
		this.props.getUserData(this.props.auth.user.id);
	}

	Transition(props) {
		return <Slide direction="up" {...props} />;
	}

	closeProfile = () => {
		this.setState({ openProfile: false });
	};

	handleProfileMenuOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = event => {
		this.setState({ mobileMoreAnchorEl: event.currentTarget });
	};

	handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null });
	};

	dialogOpen = () => {
		this.setState({ open: true });
	};

	dialogClose = () => {
		this.setState({ open: false });
	};

	dialogCopy = () => {
		this.setState({ snackOpen: true });
	};

	snackClose = () => {
		this.setState({ snackOpen: false });
	};

	handleSend = () => {
		let id = this.props.auth.user.id;
		this.props.setToken(token, id);
		this.setState({ open: false });
	};

	render() {
		const { anchorEl } = this.state;
		const { classes } = this.props;
		const isMenuOpen = Boolean(anchorEl);
		let initials = getAvatarInitials(
			this.props.auth.user.firstName,
			this.props.auth.user.lastName
		).join("");
		const renderMenu = (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}>
				<MenuItem
					onClick={() => {
						this.setState({ openProfile: true });
					}}>
					Mon Profile
				</MenuItem>
				{this.props.userRole === "Doctor" ? (
					<div>
						<MenuItem onClick={this.dialogOpen}>
							Obtenir clé token
						</MenuItem>
						<Link to="/doctor/home/settings">
							<MenuItem>Paramétres</MenuItem>
						</Link>
					</div>
				) : (
					""
				)}
				{this.props.userRole === "Patient" ? (
					<Link to="/patient/home/settings">
						<MenuItem onClick={this.onSettings}>Paramétres</MenuItem>
					</Link>
				) : (
					""
				)}
				<MenuItem onClick={this.props.logout}>Déconnecter</MenuItem>
			</Menu>
		);

		return (
			<div className={classes.root}>
				<Dialog
					open={this.state.open}
					onClose={this.dialogClose}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">
					Obtenir clé token
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
						Envoyez la clé à l'email de votre patient
                       pour être sûr que seul lui peut être votre patient
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Token"
							type="text"
							value={token}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.dialogClose} color="primary">
						Annuler
						</Button>
						<CopyToClipboard text={token}>
							<Button onClick={this.dialogCopy} color="primary">
								Copier
							</Button>
						</CopyToClipboard>
						<Button onClick={this.handleSend} color="primary">
							Soumettre
						</Button>
					</DialogActions>
				</Dialog>
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					open={this.state.snackOpen}
					autoHideDuration={2000}
					onClose={this.snackClose}
					ContentProps={{
						"aria-describedby": "message-id"
					}}
					message={<span id="message-id">Copied!</span>}
				/>
				<AppBar position="static">
					<Toolbar>
						{this.props.back ? (
							<IconButton href={this.props.toLocation}>
								<ArrowBack />
							</IconButton>
						) : (
							""
						)}
						<Typography
							className={classes.title}
							variant="h6"
							color="inherit"
							noWrap>
							{this.props.userRole}
						</Typography>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<IconButton
								aria-owns={
									isMenuOpen ? "material-appbar" : undefined
								}
								aria-haspopup="true"
								onClick={this.handleProfileMenuOpen}
								color="inherit">
								<Avatar className={classes.avatar}>
									{initials}
								</Avatar>
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMenu}
				<Dialog
					fullScreen
					open={this.state.openProfile}
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
								{`${this.props.auth.user.firstName} ${
									this.props.auth.user.lastName
								}`}
							</Typography>
						</Toolbar>
					</AppBar>
					{this.props.userRole === "Patient" ? (
						<LocalPatientProfile user={this.props.auth.localUser} />
					) : (
						<LocalDoctorProfile user={this.props.auth.localUser} />
					)}
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = state => ({ auth: state.auth });

ProfileActions.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	userRole: PropTypes.string.isRequired
};

export default connect(
	mapStateToProps,
	{ logout, setToken, getUserData }
)(withStyles(styles)(ProfileActions));
