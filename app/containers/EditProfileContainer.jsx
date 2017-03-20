
import EditProfile from '../components/EditProfile';
import { connect } from 'react-redux';


let name, description, photoURL, user_id;
let initialValues = {};
const mapStateToProps = (state) => {
  let profile = state.form.profile;
  let user = state.auth.user;


  name = profile ? profile.values ? profile.values.name ? profile.values.name : user.name : user.name : user.name;
  description = profile ? profile.values ? profile.values.description ? profile.values.description : user.description : user.description : user.description;
  photoURL = profile ? profile.values ? profile.values.photoURL ? profile.values.photoURL : user.photoURL : user.photoURL : user.photoURL
  user_id = state.auth.user.id

  initialValues={
  	initialValues: {
  		name,
  		description,
  		photoURL
  	}
  }

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
			console.log('name: ', name)
			console.log('photoURL: ', photoURL)
		}
	}
}

const EditProfileContainer = connect(mapStateToProps, mapDispatch)(EditProfile);

export default EditProfileContainer;
