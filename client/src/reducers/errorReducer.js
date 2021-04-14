import { GET_ERRORS, CLEAR_ERRORS } from "../actions/constants";

const initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ERRORS:
			return action.data;

		case CLEAR_ERRORS:
			return {};

		default:
			return state;
	}
}
