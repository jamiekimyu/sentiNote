import React, {Component} from 'react';
import sentiment from 'sentiment'
import PieChartEmotion from './Graphs/PieChartEmotion';
import PieChartPolarity from './Graphs/PieChartPolarity';
import { TagCloud } from "react-tagcloud";
import { customRenderer } from '../utils';
import GraphCarousel from './Graphs';
let emotionWord, emotionInstances, array= [], emotion = require('../emotion')


class MovieInput extends Component {

  constructor(props) {
    super(props)
    this.state = { alertShow:false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.analyzeMovieScript(e)
  }

  render(){
    let {submitting, sentimentObject, emotionObject, smartObject, emotionCount, movieArray} = this.props
    return (
      <div className='container'>
        <div>
          <h1 className='title'>Analyze Movie Scripts</h1>
        </div>
        <div className="margTopBot20">
          <form className='movieForm' onSubmit={this.handleClick}>
            <select name="movieScript" id='movieSelect'>
              {
              movieArray.map((movie,i)=>(
              <option key={i}value={movie.link}>{movie.title}</option>

              ))
              }
            </select>
            <button type="submit" id='movieSubmit' className="btn btn-success" onClick={e=>this.setState({alertShow:false})}>Analyze Movie Script</button>
          </form>
        </div>

        <div>
          <div className="margTopBot20">
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
        </div>

        <div>
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
    )
  }
}

export default MovieInput;




















