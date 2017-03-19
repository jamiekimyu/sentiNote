import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import sentiment from 'sentiment'
import PieChart from './Graphs/PieChart'
import Footer from './Footer';
import { TagCloud } from "react-tagcloud";


class SongInput extends Component {

  constructor(props) {
    super(props)
    this.state = { alertShow:false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.analyzeSong(e)
  }  

  render(){
    console.log('preloos',this.props)
    const submitting = this.props.submitting;
    let sentimentObject = this.props.sent;
    let emotionObject = this.props.emot
    
    console.log('sentiment rating:',sentimentObject); 
    console.log('emotion analysis:', emotionObject )


    return (
        <div className='container'>
          <div className="row ">
            <h1 id='songHeading'>Analyze Song Lyrics</h1>
          </div>
        
          <div className="row ">
            <form className='' onSubmit={this.handleClick}>
            <div class="form-group row row-centered">
            <div className="col-xs-12  col-md-4 ">
              <Field name="song_title" type="text" className="" component={renderField} label="Title" />
            </div>
             <div className="col-xs-12 col-md-4 ">
              <Field name="song_artist" type="text" className="" component={renderField} label="Artist" />
              </div>
               <div className="col-xs-12 col-md-4 ">
              <button type="submit" disabled={submitting} id='songSubmit' className="btn btn-success">Analyze Song</button>
            </div>
            </div>
            </form>
               <div className='row row-centered' id='pT'>
                <textarea  cols='160' value={this.props.lyrics} placeholder="Lyrics" id='lyricText' />
              </div>
            
          </div>
        
          <div className="row row-centered">
            <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
              <PieChart sentimentObject={sentimentObject} emotionObject={emotionObject}/>
            </div>  
            <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
              <PieChart sentimentObject={sentimentObject} emotionObject={emotionObject}/>
            </div> 
            <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
              <PieChart sentimentObject={sentimentObject} emotionObject={emotionObject}/>
            </div>     
          </div> 
          <Footer/>
        </div>
    )
  }
}


export default SongInput;

const renderField = ({ input, label, type, meta: {touched, error} }) => {
  return (
  <div className="content">
      <div className="left">
        <div><label>{label}</label></div>
          <div className='left'>
          <input {...input} placeholder={label} type='textarea' className="form-control field" id={"song"+label} required/>
          {touched && error && <span>{error}</span>}
          </div>
      </div>  
  </div>
)}




      
    //   for(let key in preData) {
    //     data.push({value: key, count: preData[key][1]})
    //   }
    // }

    // const customRenderer = (tag, size, color) => (
    //   <span key={tag.value}
    //     style={{
    //       fontSize: `${size+1}em`,
    //       margin: '3px',
    //       padding: '3px',
    //       display: 'inline-block',
    //       color: `${color}`
    //     }}>{tag.value}</span>
    // );



        //     <div className="flex-container">
        //    <TagCloud 
        //     minSize={1}
        //     maxSize={2}
        //     tags={data.concat([])}
        //     onClick={
        //       tag => {
        //         emotionWord=tag.value; 
        //         emotionInstances=tag.count; 
        //         array = (emotion[tag.value]);
        //         this.setState({alertShow:true});
        //       }
        //     }
        //     renderer={customRenderer}
        //     shuffle={false}          
        //   />
        //   {
        //     this.state.alertShow&&(
        //       <div className="alert alert-info" onClick={e=>{this.setState({alertShow:false})}}>
        //         <a className="close" aria-label="close">&times;</a>
        //         <p>Emotion Lexicon KeyWord : {emotionWord}</p>
        //         <p>Instances: {emotionInstances} </p>
        //         <span>Associated Emotions: </span>
        //         { array.map(emotion=>(<span>{emotion + " "}</span>)) }
        //       </div>
        //     )
        //   }
        // </div>














