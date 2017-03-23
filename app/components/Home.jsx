import React from 'react';
import {Link} from 'react-router'


const Home = () => (
	<div className="container">
		<div className='row'>
			<h1 className='text-danger' id='homeTitle'>SentiMentum</h1>
			<h4 className='text-primary' id='homeSubTitle'>A Multi-Purpose Sentiment Analysis Tool</h4>
		</div>
		<div className="row row-centered top75">
			<Link to='/info'>
				<div id='box1' className="col-xs-6 col-md-4 col-centered">
					<img id='info' className='img-responsive center' src='/info.png'/>
					<img  id='infoText' className='img-responsive' src='/infoText.png'/>
					
				</div> 
			</Link>
			<Link to='/journalInput'>
				<div id='box2' className="col-xs-6 col-md-4 col-centered">
					<img id='journal' className='img-responsive center' src='journal.png'/>
					<img  id='journalText' className='img-responsive' src='/journalText.png'/>
				</div> 
			</Link>
			<Link to='/twitter'>
				<div id='box3' className="col-xs-6 col-md-4 col-centered">  
					<img id='birdie' className='img-responsive center' src='/birdie.png'/>
					<img  id='tweetText' className='img-responsive' src='/tweetText.png'/>
				</div> 
			</Link>
			<Link to='/songInput'>
				<div id='box4' className="col-xs-6 col-md-4 col-centered ">
					<img id='note' className='img-responsive center' src='/note.png'/>
					<img  id='infoText' className='img-responsive' src='/songText.png'/>
				</div>
			</Link>
			<Link to='/movies'>
				<div id='box5' className="col-xs-6 col-md-4 col-centered">
					<img id='movie' className='img-responsive center' src='/movieReel.png'/>
					<img  id='yelpText' className='img-responsive' src='/movieText.png'/>
				 </div> 
			</Link>
			<Link to='/aboutUs'>
				<div id='box6' className="col-xs-6 col-md-4 col-centered">  
					<img id='about' className='img-responsive center' src='/about.png'/>
				</div> 
			</Link>
		</div> 
	</div>
	);
export default Home;
