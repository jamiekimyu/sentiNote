import React, {Component} from 'react';
import EntryListing from './EntryListing';


export default class EntryList extends Component {

	constructor(props){
		super(props);
		this.state = {
			currIndex: 0
		}
		this.handleNext = this.handleNext.bind(this);
		this.handlePrevious = this.handlePrevious.bind(this);
	}

	handleNext(){
		if(this.state.currIndex === this.props.entries.length -1){
			this.setState({
				currIndex: 0
			})
		}
		else{
			this.setState({
				currIndex: this.state.currIndex + 1
			});
		}
	}

	handlePrevious(){
		if(this.state.currIndex === 0){
			this.setState({
				currIndex: this.props.entries.length - 1
			})
		}
		else{
			this.setState({
				currIndex: this.state.currIndex - 1
			})
		}
	}

	render() {
		if(this.props.entries.length > 0){
			return (
				<div className='row row-centered'>
					<div className="entryListing">
						<EntryListing entry={this.props.entries[this.state.currIndex]}/>
					</div>
					<br />
					<div className='toggleTools'>
						<button className="toggle" onClick={this.handlePrevious}>Previous</button>
						<button className="toggle" onClick={this.handleNext}>Next</button>
						<span>Entry: {this.state.currIndex}/ {this.props.entries.length - 1}</span>
					</div>
				</div>
			);
		}
		else{
			return <div></div>
		}

	}
};
