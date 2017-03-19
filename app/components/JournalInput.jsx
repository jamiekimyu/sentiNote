import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import sentiment from 'sentiment'
import PieChart from './Graphs/PieChart'
import Footer from './Footer';
import { TagCloud } from "react-tagcloud";
import { emotinator } from "../utils";

class JournalInput extends Component {

  render(){
    let {submitting, sentimentObject, emotionObject, handleSubmit, addEntry, user} = this.props
    
    return (
      <div className='container'>
        <div className="row">
             <h1 id='journalHeader'>Journal</h1>
        </div>
        <div className="row row-centered">
              <form className='journalForm' onSubmit={addEntry}>
                  <Field name="title" type="text" className="" component={renderField} id="title" label="Title" /> 
                  <button type="submit" disabled={submitting} className="btn btn-success" id='journalSubmit'>Add This Entry to My Journal and Clear Graphs</button>
                  <div><Field name="content" type="text" className="form-control field" component={renderField} id="content" label="Content" /></div>
                  <Field name="user" type="hidden"  value={user} component={renderField} />
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

        </div>
        <Footer/>
      </div>

    )
  }
}

export default JournalInput;


const renderField = ({ input, label, type, meta: {touched, error} }) => {
  return (
  <div className="content">
  {
    label==='Title'&&(
      <div className="">
          <input {...input} placeholder={label} type='textarea' className="form-control field" id="journalTitle" required/>
          {touched && error && <span>{error}</span>}
      </div>
    )
  }
 {
    label==='Content'&&(
      <div className="">
          <textarea {...input} placeholder={label} type='textarea' className="form-control field" id="journalContent" required/>
          {touched && error && <span>{error}</span>}
      </div>
    )
  }
  </div>
)}

   // for(let key in preData) {
   //      data.push({value: key, count: preData[key][1]})
   //    }



          //   <div id='cloudKey' className="col-xs-12 col-md-8 col-centered">
          //       <TagCloud 
          //   minSize={1}
          //   maxSize={2}
          //   tags={data.concat([])}
          //   onClick={
          //     tag => {
          //       emotionWord=tag.value; 
          //       emotionInstances=tag.count; 
          //       array = (emotion[tag.value]);
          //     }
          //   }
          //   renderer={customRenderer}
          //   shuffle={false}          
          // />
          //   </div> 


    //               const customRenderer = (tag, size, color) => (
    //   <span key={tag.value}
    //     style={{
    //       fontSize: `${size+1}em`,
    //       margin: '3px',
    //       padding: '3px',
    //       display: 'inline-block',
    //       color: `${color}`
    //     }}>{tag.value}</span>
    // );



















