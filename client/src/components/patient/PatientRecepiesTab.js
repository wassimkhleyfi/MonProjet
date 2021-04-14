/*
  Component fot patient, to see own recepies, without control functions
  @imported at PatientTabs
*/
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { connect } from "react-redux";
import { getPatientsRecepies } from "../../actions/utilsActions";
import TableHead from "@material-ui/core/TableHead";

const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5
	}
});

class TablePaginationActions extends React.Component {
	handleFirstPageButtonClick = event => {
		this.props.onChangePage(event, 0);
	};

	handleBackButtonClick = event => {
		this.props.onChangePage(event, this.props.page - 1);
	};

	handleNextButtonClick = event => {
		this.props.onChangePage(event, this.props.page + 1);
	};

	handleLastPageButtonClick = event => {
		this.props.onChangePage(
			event,
			Math.max(
				0,
				Math.ceil(this.props.count / this.props.rowsPerPage) - 1
			)
		);
	};

	render() {
		const { classes, count, page, rowsPerPage, theme } = this.props;

		return (
			<div className={classes.root}>
				<IconButton
					onClick={this.handleFirstPageButtonClick}
					disabled={page === 0}
					aria-label="First Page">
					{theme.direction === "rtl" ? (
						<LastPageIcon />
					) : (
						<FirstPageIcon />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleBackButtonClick}
					disabled={page === 0}
					aria-label="Previous Page">
					{theme.direction === "rtl" ? (
						<KeyboardArrowRight />
					) : (
						<KeyboardArrowLeft />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Next Page">
					{theme.direction === "rtl" ? (
						<KeyboardArrowLeft />
					) : (
						<KeyboardArrowRight />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Last Page">
					{theme.direction === "rtl" ? (
						<FirstPageIcon />
					) : (
						<LastPageIcon />
					)}
				</IconButton>
			</div>
		);
	}
}

TablePaginationActions.propTypes = {
	classes: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
	withTheme: true
})(TablePaginationActions);

let counter = 0,
	rows = [];
function createData(doctor, meds, order, date) {
	counter += 1;
	return { id: counter, doctor, meds, order, date };
}

const styles = theme => ({
	root: {
		width: "100%"
	},
	table: {
		minWidth: 500
	},
	tableWrapper: {
		overflowX: "auto"
	},
	inputAdjustment: {
		width: "100%",
		margin: "1em"
	},
	btnAdd: {
		width: "20%",
		marginRight: "2em"
	}
});

class PatientRecepiesTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			rowsPerPage: 5
		};
		this.handleChangePage = this.handleChangePage.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	componentDidMount = () => {
		this.props.getPatientsRecepies(this.props.auth.user.id);
	};

	render() {
		const { classes } = this.props;
		const { rowsPerPage, page } = this.state;
		const emptyRows =
			rowsPerPage -
			Math.min(rowsPerPage, rows.length - page * rowsPerPage);
		let { patientRecepie } = this.props.general;
		if (patientRecepie == null) {
		} else {
			if (rows.length === 0) {
				for (let i = 0; i < patientRecepie.length; i++) {
					rows.unshift(
						createData(
							patientRecepie[i].doctor,
							patientRecepie[i].meds,
							patientRecepie[i].order,
							patientRecepie[i].date
						)
					);
				}
			}
		}
		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Docteur</TableCell>
								<TableCell>Quels médicaments utiliser</TableCell>
								<TableCell>Dans quel ordre</TableCell>
								<TableCell>Date</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map(row => {
									return (
										<TableRow key={row.id}>
											<TableCell
												style={{ fontSize: "1.2em" }}
												component="th"
												scope="row">
												{row.doctor}
											</TableCell>
											<TableCell
												style={{ fontSize: "1.2em" }}>
												{row.meds}
											</TableCell>
											<TableCell
												style={{ fontSize: "1.2em" }}>
												{row.order}
											</TableCell>
											<TableCell
												style={{ fontSize: "1.2em" }}>
												{row.date}
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 48 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									colSpan={3}
									count={rows.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										native: true
									}}
									onChangePage={this.handleChangePage}
									onChangeRowsPerPage={
										this.handleChangeRowsPerPage
									}
									ActionsComponent={
										TablePaginationActionsWrapped
									}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</Paper>
		);
	}
}

PatientRecepiesTab.propTypes = {
	auth: PropTypes.object.isRequired,
	general: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	general: state.general
});

export default connect(
	mapStateToProps,
	{ getPatientsRecepies }
)(withStyles(styles)(PatientRecepiesTab));
