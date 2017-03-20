
import EditProfile from '../components/EditProfile';
import { connect } from 'react-redux';
import {authenticated} from '../reducers/auth';
import axios from 'axios';


let name, description, photoURL, user_id;
let initialValues = {};
const mapStateToProps = (state) => {
  let profile = state.form.profile;
  let user = state.auth.user;


  name = profile ? profile.values ? profile.values.name ? profile.values.name : user.name : user.name : user.name;
  description = profile ? profile.values ? profile.values.description ? profile.values.description : user.description : user.description : user.description;
  photoURL = profile ? profile.values ? profile.values.photoURL ? profile.values.photoURL : user.photoURL : user.photoURL : user.photoURL
  user_id = state.auth.user.id


  //initial values are passed from state as prop to fields
  initialValues= {
  		name,
  		description,
  		photoURL
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

			axios.put(`/api/users/${user_id}`, {
				name,
				photoURL,
				description
			})
			.then( res => {
				dispatch(authenticated(res.data))
				console.log('attempting to redirect with localhost. Change for deployed app');
				window.location.replace('http://localhost:1337/user') //this may have to change once deployed!!
			})
			.catch( err => console.error(err))
		}
	}
}

const EditProfileContainer = connect(mapStateToProps, mapDispatch)(EditProfile);

export default EditProfileContainer;
