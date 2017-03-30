import React from 'react';
import {connect} from 'react-redux';
// import PieChart from './Graphs/PieChart';
import {getUserHistoryTweets} from '../reducers/twitter';
import {emotinator, tweetsToParagraph} from '../utils';

const mapDispatchToProps = (dispatch) => {
	return {
		getUserHistoryTweets(screenName, pages){
			dispatch(getUserHistoryTweets(screenName, pages));
		}
	};
};

const mapStateToProps = (state) => {
	return {
		historyTweets: state.twitter.historyTweets
	};
};

export class UserHistoryTweets extends React.Component{
	constructor(props){
		super(props);
		const initialState = {
			twitterHandle: '',
			pages: 0,
		};
		this.state = initialState;
	}

	handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

	handleSubmit(event){
		event.preventDefault();
		this.props.getUserHistoryTweets(this.state.twitterHandle, this.state.pages);
	}

	render(){
		return (
			<div className='twitter'>
				<form onSubmit={(event) => this.handleSubmit(event)} className='margLeft20'>
					<div className="form-group">
						<label htmlFor="name" className="col-sm-2 control-label">Search by Handle</label>
						<div className="col-sm-10">
							<input
								onChange={(event) => this.handleChange(event)}
								value={this.state.twitterHandle} name="twitterHandle"
								type="text"
								className="form-control"
								placeholder="@theRealDonald"
							/>
						</div>
					</div>

					<div>
						<input
							type="number"
							min={1}
							max={16}
							value={this.state.pages}
							onChange={(event) => this.handleChange(event)}
							name="pages"
							className="form-group"
						/>
					</div>

					<div className="form-group col-sm-offset-2 col-sm-10">
						<button type="submit" className="btn btn-primary">submit</button>
					</div>
				</form>
				<div>
					<ol>

					{this.props.historyTweets.map((tweet, idx) => {
						return <li key={idx}>{tweet.text}</li>
					})}
				</ol>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHistoryTweets);
