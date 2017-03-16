
import User from '../components/UserProfile';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
  	user: state.auth
  };
};

const mapDispatch = dispatch => {
	return {
	}
}

const UserContainer = connect(mapStateToProps,mapDispatch)(User);

export default UserContainer;
