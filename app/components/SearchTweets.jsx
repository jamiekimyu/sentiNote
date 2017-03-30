import React from 'react';
import {connect} from 'react-redux';
import GraphCarousel from './Graphs';
import {getSearchTweets} from '../reducers/twitter';
import { emotinator, tweetsToParagraph, sentiMentator, bayesinator, customRenderer } from '../utils';
import sentiment from 'sentiment'
import { TagCloud } from "react-tagcloud";
let emotionWord, emotionInstances, array= [], emotion = require('../emotion')

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchTweets(term){
      dispatch(getSearchTweets(term));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    searchTweets: state.twitter.searchTweets,
    teachDocs: state.teachDoc.allTeachDocs
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
    let content = tweetsToParagraph(this.props.searchTweets)
    let sentimentObject = sentiMentator(sentiment(content))
    let [emotionObject, emotionCount] = emotinator(content)
    let teachDocs = this.props.teachDocs
    let [smartObject] = bayesinator(teachDocs, content)


    return (
      <div>
        <div className="row">
          <form onSubmit={(event) => this.handleSubmit(event)} className='margLeft20'>
            <div className="form-group">
              <label htmlFor="name" className="col-sm-3 control-label">Search by Topic</label>
              <div className="col-sm-10">
                <input
                  onChange={(event) => this.handleChange(event)}
                  value={this.state.twitterSearchTerm} name="twitterSearchTerm"
                  type="text"
                  className="form-control"
                  placeholder="kittens"
                />
              </div>
            </div>
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">submit</button>
            </div>
          </form>
        </div>

        <div className="row row-centered">
          <GraphCarousel emotionObject={emotionObject} sentimentObject={sentimentObject} smartObject={smartObject} />
          <TagCloud
            minSize={1}
            maxSize={2}
            tags={emotionCount.concat([])}
            renderer={customRenderer}
            shuffle={false}
            onClick={
              tag => {
              emotionWord=tag.value
              emotionInstances=tag.count
              array = (emotion[tag.value])
              this.setState({alertShow:true})
              }
            }
          />
        </div>

        <div className='row'>
        {
          this.state.alertShow&&(
          <div className="alert alert-info" onClick={e=>{this.setState({alertShow:false})}}>

            <a className="close" aria-label="close">&times;</a>
            <h4 id='emotText'>{emotionWord[0].toUpperCase()+emotionWord.slice(1)}</h4>
            <p>Instances: {emotionInstances} </p>
            <span>Associated Emotions: </span>
            { array.map(emotion=>(<span>{emotion + " "}</span>)) }
          </div>
          )
        }
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTweets);
