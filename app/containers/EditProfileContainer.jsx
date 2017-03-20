
import EditProfile from '../components/EditProfile';
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

const EditProfileContainer = connect(mapStateToProps, mapDispatch)(EditProfile);

export default EditProfileContainer;
