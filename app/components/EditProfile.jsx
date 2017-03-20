import React, {Component} from 'react';
import { Link } from 'react-router';
import Footer from './Footer';
import { Field, reduxForm } from 'redux-form'


// export default function User (props) {

//   const user = props.user.user
//   const myEntries = props.user.myEntries
//   if(user) return (
//   	<div className="flex-container">
//       <div className="content">
//         <div className="userInfo row">
//           <h2>Edit User Info</h2>
//             <form onSubmit={this.props.addEntry}>
//                 <Field name="title" type="text" className="" component={renderField} id="title" label="Title" />
//                 <Field name="content" type="text" className="form-control field" component={renderField} id="content" label="Content" />
//                 <Field name="user" type="hidden"  value={this.props.user} component={renderField} />
//                 <button type="submit" disabled={submitting} className="btn btn-primary">Add Entry</button>
//             </form>
//          </div>
//         </div>
//       <Footer />
//     </div>
//   )
//   else return (
//     <div>You are not logged in</div>
//   )
// }


class ProfileForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="userInfo">
        <h2>Edit Your Profile!</h2>
        <form onSubmit={handleSubmit} >
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="photoURL">Photo URL</label>
            <Field name="photoURL" component="input" type="email"/>
          </div>
          <div>
            <label htmlFor="description">description</label>
            <Field name="description" component="input" type="text"/>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

    );
  }
}

// Decorate the form component
ProfileForm = reduxForm({
  form: 'profile' // a unique name for this form
})(ProfileForm);

export default ProfileForm;

