import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Home = () => (
  <div className="flex-container">
		<Header />

		<Sidebar />

		<div className="content min-height-600">
			<h1>Welcome To SentiNote</h1>
			<p>
				SentiNote is ...................
			</p>
		</div>

		<Footer />
  </div>
);
export default Home;
