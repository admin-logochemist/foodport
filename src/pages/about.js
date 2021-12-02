import React from 'react';
import "./about.css"
import Footer from './Footer'
import { SocialIcon } from 'react-social-icons';
import Navbar from '../components/Navbar'
const About = () => {
	return (
		<>
		<Navbar/>
		<div>
			<div className="About-main">
				<div className="About-text">
					<h1>ABOUT US</h1>
				</div>
			</div>
			<br/>
			<div className="para">
			<h1>List your restaurant or shop on Foodport.</h1>
				<p className="paragraph__about">Would you like millions of new customers to enjoy your amazing food and groceries? So would we!
					It's simple: we list your menu and product lists online, help you process orders, pick them up, and deliver them to hungry pandas – in a heartbeat!
					Interested? Let's start our partnership today!</p>
			</div>
			<br/>
			<Footer/>
			<div className="copright__About">
				<h1>Copyright 2020.All rights reserved.</h1>
				<SocialIcon style={{ height: 30 }} url="https://twitter.com/" />
				<SocialIcon style={{ height: 30 }} url="https://facebook.com/" />
				<SocialIcon style={{ height: 30 }} url="https://instagram.com/" />
			</div>
		</div>
		</>
	);
};

export default About;
