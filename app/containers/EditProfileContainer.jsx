
import EditProfile from '../components/EditProfile';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: state.auth
  };
};

const mapDispatch = dispatch => {
	return {
		handleSubmit: ( e ) => {
			e.preventDefault();
			console.log(arguments, "im in my method!")
		}
	}
}

const EditProfileContainer = connect(mapStateToProps, mapDispatch)(EditProfile);

export default EditProfileContainer;
