import React from 'react';
import Footer from './Footer';
import {connect} from 'react-redux';
import {getTweets, getSearchTweets, getTopicTweets} from '../reducers/twitter';

const mapDispatchToProps = dispatch => {
  return {
    getTweets(screenName){
      dispatch(getTweets(screenName));
    },
    getSearchTweets(term){
      dispatch(getSearchTweets(term));
    },
    getTopicTweets(topic){
      dispatch(getTopicTweets(topic));
    }
  };
};

export class Twitter extends React.Component{
  constructor(props){
    super(props);
    const initialState = {
      twitterHandle: '',
      twitterSearchTerm: '',
      twitterTopic: ''
    };
    this.state = initialState;
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.getTweets(this.state.twitterHandle);
  }

  handleSearchSubmit(event){
    event.preventDefault();
    this.props.getSearchTweets(this.state.twitterSearchTerm);
  }

  handleTopicSubmit(event){
    event.preventDefault();
    this.props.getTopicTweets(this.state.twitterTopic)
  }

  render(){
    return (
      <div className="flex-container">
        <div className="content min-height-600">
          <h1>Welcome To SentiNote Twitter</h1>
          <form onSubmit={(event) => this.handleSubmit(event)} className='col-xs-6 col-md-4'>
            <div className="form-group">
                  <label htmlFor="name" className="col-sm-2 control-label">Twitter Handle:</label>
                  <div className="col-sm-10">
                    <input onChange={(event) => this.handleChange(event)} value={this.state.twitterHandle} name="twitterHandle" type="text" className="form-control" />
                  </div>
                </div>

                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-primary">submit</button>
               </div>
          </form>

          <form onSubmit={(event) => this.handleSearchSubmit(event)} className='col-xs-6 col-md-4'>
            <div className="form-group">
              <label htmlFor="name" className="col-sm-2 control-label">Twitter Search Term:</label>
              <div className="col-sm-10">
                <input onChange={(event) => this.handleChange(event)} value={this.state.twitterSearchTerm} name="twitterSearchTerm" type="text" className="form-control" />
              </div>
            </div>

            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">submit</button>
            </div>
          </form>

        <form onSubmit={(event) => this.handleTopicSubmit(event)} className='col-xs-6 col-md-4' >
          <div className="form-group">
            <label htmlFor="name" className="col-sm-2 control-label">Twitter Search Topic:</label>
            <div className="col-sm-10">
              <input onChange={(event) => this.handleChange(event)} value={this.state.twitterTopic} name="twitterTopic" type="text" className="form-control" />
            </div>
          </div>

          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-primary">submit</button>
          </div>
        </form>
      </div>
        <Footer />
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(Twitter);
