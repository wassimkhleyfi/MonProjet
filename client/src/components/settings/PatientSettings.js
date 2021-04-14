/*
	Patient settings
	@imported in App
*/
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/Icon";
import CloseIcon from "@material-ui/icons/Close";
// Components
import ProfileActions from "../app-bar/ProfileActions";
// Actions
import {
	updatePatientSettings,
	getPatientSettings
} from "../../actions/settingsActions";

const styles = theme => ({
	root: {
		width: "100%"
	},
	heading: {
		fontSize: theme.typography.pxToRem(17),
		flexBasis: "33.33%",
		flexShrink: 0
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	},
	paperConfig: {
		width: "60vw",
		height: "100%",
		margin: "2em auto",
		padding: "2em"
	},
	dateField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 300
	},
	headerConfig: {
		marginBottom: "3vh",
		marginTop: "3vh"
	},
	btn: {
		margin: "3em 0 1em 1em",
		width: "10vw"
	},
	spaceAround: {
		display: "flex",
		justifyContent: "space-between"
	}
});

class PatientSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: null,
			openSnackBar: false,
			address: {
				street: "",
				city: "",
				number: ""
			},
			birthday: "",
			sex: "",
			email: "",
			work: "",
			maritalStatus: "",
			emergency: {
				fiName: "",
				laName: "",
				relation: "",
				phoneNumber: ""
			},
			phone: "",
			allergies: "",
			medAllergies: "",
			injuries: "",
			operations: "",
			currMeds: "",
			height: "",
			weight: "",
			blood: {
				type: "",
				rhesus: ""
			}
		};
		this.handleExpand = this.handleExpand.bind(this);
		this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
		this.onAddress = this.onAddress.bind(this);
		this.onEmergency = this.onEmergency.bind(this);
		this.onChangeSettings = this.onChangeSettings.bind(this);
		this.onChangeBloodType = this.onChangeBloodType.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	handleExpand = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false
		});
	};

	handleCloseSnackBar = () => {
		this.setState({ openSnackBar: false });
	};

	onAddress = ev => {
		this.setState({
			address: Object.assign({}, this.state.address, {
				[ev.target.name]: ev.target.value
			})
		});
	};

	onEmergency = ev => {
		this.setState({
			emergency: Object.assign({}, this.state.emergency, {
				[ev.target.name]: ev.target.value
			})
		});
	};

	onChangeSettings = ev => {
		this.setState({
			[ev.target.name]: ev.target.value
		});
	};

	onChangeBloodType = ev => {
		this.setState({
			blood: Object.assign({}, this.state.blood, {
				[ev.target.name]: ev.target.value
			})
		});
	};

	componentDidMount = () => {
		this.props.getPatientSettings(this.props.auth.user.id);
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.settings) {
			this.setState(Object.assign({}, nextProps.settings));
		}
	}

	onSave = ev => {
		this.setState({ openSnackBar: true, expanded: null });
		this.props.updatePatientSettings(this.state, this.props.auth.user.id);
	};

	render() {
		const { classes } = this.props;
		const { expanded } = this.state;

		return (
			<div className={classes.root}>
				<ProfileActions
					userRole="Patient"
					back={true}
					toLocation="/patient/home"
				/>
				<Paper elevation={5} className={classes.paperConfig}>
					<Typography variant="h4" className={classes.headerConfig}>
						General Settings
					</Typography>
					<ExpansionPanel
						expanded={expanded === "panel1"}
						onChange={this.handleExpand("panel1")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Adresse
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Please input your address
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<div className={classes.spaceAround}>
								<TextField
									type="text"
									onChange={this.onAddress}
									name="city"
									value={this.state.address.city}
									variant="outlined"
									label="Your city"
									placeholder="i.e. Kyiv, Kharkiv, Odessa"
								/>
								<TextField
									type="text"
									onChange={this.onAddress}
									name="street"
									variant="outlined"
									label="Your street"
									value={this.state.address.street}
									placeholder="i.e. Ivana Franka, Zelena"
								/>
								<TextField
									type="text"
									onChange={this.onAddress}
									name="number"
									variant="outlined"
									value={this.state.address.number}
									label="Your house number"
									placeholder="i.e. 46"
								/>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel2"}
						onChange={this.handleExpand("panel2")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Date of Birth
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Please input your birthday, so we know your age
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								type="date"
								variant="outlined"
								name="birthday"
								value={this.state.birthday}
								onChange={this.onChangeSettings}
								className={classes.dateField}
								label=""
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel3"}
						onChange={this.handleExpand("panel3")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Sex
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Set your sex
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<div className="flex flex-center">
								<RadioGroup
									aria-label="Gender"
									name="sex"
									value={this.state.sex}
									onChange={this.onChangeSettings}>
									<FormControlLabel
										value="female"
										control={<Radio />}
										label="Female"
									/>
									<FormControlLabel
										value="male"
										control={<Radio />}
										label="Male"
									/>
								</RadioGroup>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel4"}
						onChange={this.handleExpand("panel4")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								E-mail
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Please input your e-mail, so we can send for you
								different data
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								type="email"
								fullWidth
								name="email"
								value={this.state.email}
								onChange={this.onChangeSettings}
								variant="outlined"
								label="Your E-mail"
								placeholder="example@example.com"
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel5"}
						onChange={this.handleExpand("panel5")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Marital Status
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Tell us about your maritial status
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Select
								value={this.state.maritalStatus}
								name="maritalStatus"
								onChange={this.onChangeSettings}
								variant="outlined"
								className={classes.dateField}>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={"Single"}>Single</MenuItem>
								<MenuItem value={"Married"}>Married</MenuItem>
								<MenuItem value={"Divorced"}>Divorced</MenuItem>
								<MenuItem value={"Widowed"}>Widowed</MenuItem>
							</Select>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel6"}
						onChange={this.handleExpand("panel6")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Work
							</Typography>
							<Typography className={classes.secondaryHeading}>
								If you want to give us additional data, you can
								input your job place
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								type="text"
								fullWidth
								name="work"
								value={this.state.work}
								onChange={this.onChangeSettings}
								variant="outlined"
								label="Your Job"
								placeholder="i.e main engineer in Mercedes-benz"
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel7"}
						onChange={this.handleExpand("panel7")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Phone Number
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Give us your phone number, so that doctor can
								contact with you
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<div className="flex flex-center">
								<Typography variant="h6">+38</Typography>
								<TextField
									type="number"
									className={classes.dateField}
									label="Phone number"
									name="phone"
									value={this.state.phone}
									InputProps={{ inputProps: { max: 10 } }}
									onChange={this.onChangeSettings}
									placeholder="(XXX)-123-45-67"
									variant="outlined"
								/>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel8"}
						onChange={this.handleExpand("panel8")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Height (cm)
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Give us information about your height
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								type="number"
								className={classes.dateField}
								placeholder="Your height in cm"
								name="height"
								value={this.state.height}
								onChange={this.onChangeSettings}
								variant="outlined"
								inputProps={{ min: "0", max: "300" }}
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel9"}
						onChange={this.handleExpand("panel9")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Weight (kg)
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Give us information about your weight
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								type="number"
								className={classes.dateField}
								placeholder="Your weight in kg"
								variant="outlined"
								value={this.state.weight}
								name="weight"
								onChange={this.onChangeSettings}
								inputProps={{ min: "0", max: "300" }}
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel10"}
						onChange={this.handleExpand("panel10")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								In case of emergency
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Give us information about your trusted contact
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								type="text"
								name="fName"
								value={this.state.emergency.fName}
								onChange={this.onEmergency}
								className={classes.dateField}
								placeholder="First name"
								variant="outlined"
							/>
							<TextField
								type="text"
								name="lName"
								value={this.state.emergency.lName}
								onChange={this.onEmergency}
								className={classes.dateField}
								placeholder="Last Name"
								variant="outlined"
							/>
							<TextField
								type="text"
								name="relation"
								value={this.state.emergency.relation}
								onChange={this.onEmergency}
								className={classes.dateField}
								placeholder="Relationship"
								variant="outlined"
							/>
							<TextField
								type="number"
								name="phoneNumber"
								value={this.state.emergency.phoneNumber}
								onChange={this.onEmergency}
								className={classes.dateField}
								placeholder="Phone number"
								variant="outlined"
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<Typography variant="h4" className={classes.headerConfig}>
						Medical questions
					</Typography>

					<ExpansionPanel
						expanded={expanded === "panel11"}
						onChange={this.handleExpand("panel11")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Blood type
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Let us know your blood type
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Select
								value={this.state.blood.type}
								name="type"
								onChange={this.onChangeBloodType}
								className={classes.dateField}>
								<MenuItem value={"0"}>0</MenuItem>
								<MenuItem value={"A"}>A</MenuItem>
								<MenuItem value={"B"}>B</MenuItem>
								<MenuItem value={"AB"}>AB</MenuItem>
							</Select>

							<Select
								value={this.state.blood.rhesus}
								name="rhesus"
								onChange={this.onChangeBloodType}
								className={classes.dateField}>
								<MenuItem value={"+"}>+</MenuItem>
								<MenuItem value={"-"}>-</MenuItem>
							</Select>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel12"}
						onChange={this.handleExpand("panel12")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Allergies
							</Typography>
							<Typography className={classes.secondaryHeading}>
								What allergies do you have? (fruits, pets,
								plants, etc)
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								type="text"
								fullWidth
								value={this.state.allergies}
								name="allergies"
								onChange={this.onChangeSettings}
								variant="outlined"
								label="Your allergies"
								placeholder="i.e chocolate, dogs, lemons"
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel13"}
						onChange={this.handleExpand("panel13")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Medicine allergies
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Do you have some allergies on medicines?
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								type="text"
								fullWidth
								value={this.state.medAllergies}
								name="medAllergies"
								onChange={this.onChangeSettings}
								variant="outlined"
								label="Your medicine allergies"
								placeholder="i.e amoxicillin, ampicillin, penicillin"
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel14"}
						onChange={this.handleExpand("panel14")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Injuries
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Did you had some injuries in the past?
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								type="text"
								fullWidth
								value={this.state.injuries}
								name="injuries"
								onChange={this.onChangeSettings}
								variant="outlined"
								label="Your injuries"
								placeholder="i.e broke arm"
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel15"}
						onChange={this.handleExpand("panel15")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Operations
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Did you had some operations in the past?
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								type="text"
								fullWidth
								value={this.state.operations}
								name="operations"
								onChange={this.onChangeSettings}
								variant="outlined"
								label="Your past operations"
								placeholder="i.e plastic operations, appendix"
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						expanded={expanded === "panel16"}
						onChange={this.handleExpand("panel16")}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								Currently meds
							</Typography>
							<Typography className={classes.secondaryHeading}>
								Taking any medications, currently?
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								type="text"
								fullWidth
								name="currMeds"
								value={this.state.currMeds}
								onChange={this.onChangeSettings}
								variant="outlined"
								label="Are you taking some medicines right now?"
								placeholder="if no, leave blank"
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<div className="flex flex-end">
						<Button
							variant="outlined"
							href="/patient/home"
							color="secondary"
							className={classes.btn}>
							Cancel
						</Button>
						<Button
							variant="contained"
							onClick={this.onSave}
							color="secondary"
							className={classes.btn}>
							Save
						</Button>
					</div>
				</Paper>
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					open={this.state.openSnackBar}
					autoHideDuration={4000}
					onClose={this.handleCloseSnackBar}
					ContentProps={{
						"aria-describedby": "message-id"
					}}
					message={<span id="message-id">Saved</span>}
					action={[
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							className={classes.close}
							onClick={this.handleCloseSnackBar}>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</div>
		);
	}
}

PatientSettings.propTypes = {
	auth: PropTypes.object.isRequired,
	general: PropTypes.object.isRequired,
	settings: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	general: state.general,
	settings: state.settings
});

export default connect(
	mapStateToProps,
	{ updatePatientSettings, getPatientSettings }
)(withStyles(styles)(PatientSettings));
