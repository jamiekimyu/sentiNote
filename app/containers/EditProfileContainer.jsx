
import EditProfile from '../components/EditProfile';
import { connect } from 'react-redux';
import {authenticated} from '../reducers/auth';
import axios from 'axios';


let name, description, photoURL, user_id, initialValues = {};
const mapStateToProps = (state) => {
  let profile = state.form.profile, user = state.auth.user;
  name = profile ? profile.values ? profile.values.name ? profile.values.name : user.name : user.name : user.name;
  description = profile ? profile.values ? profile.values.description ? profile.values.description : user.description : user.description : user.description;
  photoURL = profile ? profile.values ? profile.values.photoURL ? profile.values.photoURL : user.photoURL : user.photoURL : user.photoURL
  user_id = state.auth.user.id
  initialValues= {name,description,photoURL} //initial values are passed from state as prop to fields

  return {
    user: state.auth,
    name,
    description,
    photoURL,
    user_id,
    initialValues
  }
};

const mapDispatch = dispatch => {
	return {
		handleSubmit: ( e ) => {
			//this is where we can perform axios request to update user
			e.preventDefault();

			axios.put(`/api/users/${user_id}`, {name, photoURL, description})
			.then( res => {
				dispatch(authenticated(res.data));
				window.location.replace('/user'); //this may have to change once deployed!!
			})
			.catch( err => console.error(err))
		}
	}
}

const EditProfileContainer = connect(mapStateToProps, mapDispatch)(EditProfile);

export default EditProfileContainer;
