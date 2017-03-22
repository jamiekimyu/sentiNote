import React from 'react';
import {connect} from 'react-redux';
import PieChart from './Graphs/PieChart';
import {getUserTweets} from '../reducers/twitter';
import {emotinator, tweetsToParagraph} from '../utils';

const mapDispatchToProps = (dispatch) => {
	return {
		getUserTweets(screenName){
			dispatch(getUserTweets(screenName));
		}
	};
};

const mapStateToProps = (state) => {
	return {
		userTweets: state.twitter.userTweets
	};
};

export class UserTweets extends React.Component{
	constructor(props){
		super(props);
		const initialState = {
			twitterHandle: ''
		};
		this.state = initialState;
	}

	handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

	handleSubmit(event){
		event.preventDefault();
		this.props.getUserTweets(this.state.twitterHandle);
	}

	render(){
		return (
			<div>
				<form onSubmit={(event) => this.handleSubmit(event)}>
					<div className="form-group">
						<label htmlFor="name" className="col-sm-2 control-label">Twitter Handle:</label>
						<div className="col-sm-10">
							<input
								onChange={(event) => this.handleChange(event)}
								value={this.state.twitterHandle} name="twitterHandle"
								type="text"
								className="form-control"
							/>
						</div>
					</div>

					<div className="col-sm-offset-2 col-sm-10">
						<button type="submit" className="btn btn-primary">submit</button>
					</div>
				</form>

				<div id="pieBox1" className="col-xs-12 col-md-6 col-centered">
					<PieChart emotionObject={emotinator(tweetsToParagraph(this.props.userTweets))[0]} />
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTweets);
