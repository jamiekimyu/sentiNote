
import User from '../components/UserProfile';
import { connect } from 'react-redux';
import { selectEntryById } from '../reducers/entry';



const mapStateToProps = (state) => {
  return {
  	user: state.auth
  };
};

const mapDispatch = dispatch => {
	return {
		handleClick: (e, entry_id) => {
			  dispatch(selectEntryById(entry_id));
			  e.preventDefault();
		}
	}
}

const UserContainer = connect(mapStateToProps,mapDispatch)(User);

export default UserContainer;
