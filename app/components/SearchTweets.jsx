import React from 'react';
import {connect} from 'react-redux';
// import PieChart from './Graphs/PieChart';
import {getSearchTweets} from '../reducers/twitter';
import {emotinator, tweetsToParagraph} from '../utils';

const mapDispatchToProps = (dispatch) => {
	return {
		getSearchTweets(term){
			dispatch(getSearchTweets(term));
		}
	};
};

const mapStateToProps = (state) => {
	return {
		searchTweets: state.twitter.searchTweets
	};
};

export class SearchTweets extends React.Component{
	constructor(props){
		super(props);
		const initialState = {
			twitterSearchTerm: '',
		};
		this.state = initialState;
	}

	handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

	handleSubmit(event){
		event.preventDefault();
		this.props.getSearchTweets(this.state.twitterSearchTerm);
	}

	render(){
		return (
			<div>
				<form onSubmit={(event) => this.handleSubmit(event)}>
					<div className="form-group">
						<label htmlFor="name" className="col-sm-2 control-label">Twitter Search Term:</label>
						<div className="col-sm-10">
							<input
								onChange={(event) => this.handleChange(event)}
								value={this.state.twitterSearchTerm} name="twitterSearchTerm"
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
{/*					<PieChart emotionObject={emotinator(tweetsToParagraph(this.props.searchTweets))[0]} />*/}
				</div>

		</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTweets);
