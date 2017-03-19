import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import sentiment from 'sentiment'
import PieChart from './Graphs/PieChart'
import Footer from './Footer';
import { TagCloud } from "react-tagcloud";

let emotionWord, emotionInstances, array = [], data  = [], emotion = require('../emotion')
const renderField = ({ input, label, type, meta: {touched, error} }) => {
  return (
  <div className="content">
  {
    label==='Title'&&(
      <div className="">
        <div><label>{label}</label></div>
          <input {...input} placeholder={label} type='textarea' className="form-control field" />
          {touched && error && <span>{error}</span>}
      </div>
    )
  }
 {
    label==='Content'&&(
      <div className="">
        <div><label>{label}</label></div>
          <textarea {...input} placeholder={label} type='textarea' className="form-control field" />
          {touched && error && <span>{error}</span>}
      </div>
    )
  }
  </div>
)}

class JournalInput extends Component {

  render(){
    const submitting = this.props.submitting;
    
    var sentimentObject = sentiment(this.props.content);
    console.log('contentsscore',sentimentObject); 


    let emotionObject = {}
    let wordArray = this.props.content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(' ')

     let preData = {}

      wordArray.forEach(word=>{
        if(emotion[word]){
          if(!preData[word]){
            preData[word]=[emotion[word],1]
          }else{
            preData[word][1]=preData[word][1]+1
          }
          emotion[word].forEach(match=>{
            if (!emotionObject[match]) {
              emotionObject[match]=1

            }else{
              emotionObject[match] = emotionObject[match] + 1
            }
          })
        }
      })
      
      for(let key in preData) {
        data.push({value: key, count: preData[key][1]})
      }
    console.log('emotion!', emotionObject )

        const customRenderer = (tag, size, color) => (
      <span key={tag.value}
        style={{
          fontSize: `${size+1}em`,
          margin: '3px',
          padding: '3px',
          display: 'inline-block',
          color: `${color}`
        }}>{tag.value}</span>
    );

    return (
      <div className='container'>
        <div className="row row-centered">
              <form onSubmit={this.props.addEntry}>
                  <Field name="title" type="text" className="" component={renderField} id="title" label="Title" />
                  <Field name="content" type="text" className="form-control field" component={renderField} id="content" label="Content" />
                  <Field name="user" type="hidden"  value={this.props.user} component={renderField} />
                  <button type="submit" disabled={submitting} className="btn btn-primary">Add Entry</button>
                </form>
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
         <div className="row row-centered">
            <div id='cloudKey' className="col-xs-12 col-md-8 col-centered">
                <TagCloud 
            minSize={1}
            maxSize={2}
            tags={data.concat([])}
            onClick={
              tag => {
                emotionWord=tag.value; 
                emotionInstances=tag.count; 
                array = (emotion[tag.value]);
              }
            }
            renderer={customRenderer}
            shuffle={false}          
          />
            </div> 
        </div>
        <Footer/>
      </div>

    )
  }
}

export default JournalInput;




















