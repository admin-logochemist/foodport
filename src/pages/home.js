import React, { useState, useEffect } from 'react';
import test1 from '../images/test1.jpg'
import test2 from '../images/test2.png'
import test3 from '../images/test3.jpg'
import Footer from './Footer';
import Tabs from './Tabs'
import "./home.css"
import Tab from './Tab'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import background from '../images/shadow1.png'
import download1 from '../images/download.png'
import download2 from '../images/download2.png'
import mockup from '../images/mockup2.png'
import { SocialIcon } from 'react-social-icons';
import { Link } from "react-router-dom";
import useGeoLocation from '../hooks/useGeolocation';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import Navbar from '../components/Navbar'
const Home = () => {

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const ll = await getLatLng(results[0])
        console.log(ll);

    }
    const [locations, setLocations] = useState('')
    const [details, setDetails] = useState(null);
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    useEffect(() => {
        getUserGeolocationDetails()
    }, [])
    const getUserGeolocationDetails = () => {
        fetch(
            "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
        )
            .then(response => response.json())
            .then(data => setDetails(data));
    };
    { console.log("Location", details) }
    const location = useGeoLocation();
    return (
        <>
            <Navbar />
            <div className="home">
                <header className="banner" style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${background})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: 'no-repeat',
                    height: '100vh'
                }

                }>
                    <div className="banner__contents">
                        <h1 className="banner__title font">
                            Locate Food Trucks  & Restaurants
                            <span className="red-one font">  Anywhere!</span>
                        </h1>
                        <div className="Searchbar">
                            <PlacesAutocomplete
                                value={address}
                                onChange={setAddress}
                                onSelect={handleSelect}

                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Search Places ...',
                                                className: 'location-search-input',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';

                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                            {console.log(address)}
                        </div>
                        <h1 className="test__description"></h1>
                    </div>


                </header>

                <section className="Discover-main">
                    <div className="Discover">
                        <h1>Discover The
                            <span style={{ color: 'red' }}> Best Food In Town
                            </span></h1>
                    </div>
                    <br />
                    <br />
                    <Tabs address={address} />
                    <br />
                    <br />
                </section>
                <br />
                <br />
                <br />
                <br />
                {/* this is a section */}
                <section>
                    <div className="Red-section">
                        <div className="Red-section-sub">
                            <div className="Download-the-App">
                                <h1 className="Heading-one font-poppins">Download <span className="for-white font-poppins">The App</span></h1>
                                <p className="p-tab font-poppins">It's all your fingertips-- the restaurants you love. Find the right food to suit your mood,<br /> and make the first last. Go ahead download us</p>
                                <img className="Android-apple-image" onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = 'http://Playstore.com';
                                }} src={download1} alt="" />
                                <img className="Android-apple-image" onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = 'http://Appstore.com'
                                }} src={download2} alt="" />
                            </div>
                            <div className="Mobile-image-sec">
                                <img className="mobile-image" src={mockup} />
                            </div>
                        </div>
                    </div>
                </section>
                <br />
                <br />
                <br />
                <br />
                {/* new section */}

                <section>
                    <div className="asd">
                        <div style={{ textAlign: 'center', paddingTop: 15 }}>
                            <button
                                className="btn btn-primary"
                                onClick={getUserGeolocationDetails}
                            />
                            <h1 className="white-color font-poppins">    Customer's <span className="font-poppins" style={{ color: 'white' }}>Reviews</span></h1>
                            <div className="Simple-line" />
                        </div>
                        <div className="testimonials">
                            <div className="white-thing">
                                <div class="green">
                                    <img style={{ height: 100, width: 120, marginBottom: -10, borderRadius: '50%' }} src={test1} alt="" />
                                    <h1 className="testimonial-name font-poppins">Emma Garry</h1>
                                    <p className="font-poppins">Write a review for<span style={{ color: 'red' }}> Subway</span></p>
                                    <p style={{
                                        textAlign: 'left'
                                    }} className="font-poppins">I just wanted to say that I have fallen IN LOVE with your foods. I have sacrificed good wholesome food to “treat” myself and fulfill my hunger in the past, but i have found such satisfaction with awesome foods products.</p>
                                    <span style={{ color: 'red' }}>05 Nov, 2021</span>
                                </div>
                            </div>
                            <div className="white-thing">
                                <div class="green">
                                    <img style={{ height: 100, width: 120, marginBottom: -10, borderRadius: '50%' }} src={test2} alt="" />
                                    <h1 className="testimonial-name font-poppins">Edy Labvnosky</h1>
                                    <p className="font-poppins">Write a review for<span style={{ color: 'red' }}> SF Chickenbox</span></p>
                                    <p style={{
                                        textAlign: 'left'
                                    }} className="font-poppins">Food Port meal delivery service got me here. Their meals are great for people with busy schedule like me, and they’re healthy AND delicious. PS. I have sweet tooth and their desserts are to die for!.  Can’t wait to try more Awesome Foods!!</p>
                                    <span style={{ color: 'red' }}>11 July, 2020</span>
                                </div>
                            </div>

                            <div className="white-thing">
                                <div class="green">
                                    <img style={{ height: 100, width: 120, marginBottom: -10, borderRadius: '50%' }} src={test3} alt="" />
                                    <h1 className="testimonial-name font-poppins">Isabella Kenyon</h1>
                                    <p className="font-poppins">Write a review for<span style={{ color: 'red' }}> Olive Garden</span></p>
                                    <p style={{
                                        textAlign: 'left',

                                    }} className="font-poppins">Food Port is the perfect fit for me. I receive my vegetarian meals from Food Port, that are absolutely delicious, balanced and calorie controlled, just the way I like it. Can’t wait to try more Awesome Foods!!</p>
                                    <span style={{ color: 'red', }}>19 Aug, 2021</span>
                                </div>
                            </div>
                        </div>
                        <div className="View-all-div font-poppins">
                            <button className="View-All">View All</button>
                        </div>
                        <div className="Simple-line" />
                    </div>
                </section>
                <Footer />
                <div className="copyright-home">
                    <h1>Copyright 2020.All rights reserved.</h1>
                    <SocialIcon bgColor="#fff" fgColor="#d70000" style={{ height: 25 }} url="https://twitter.com/" />
                    <SocialIcon bgColor="#fff" fgColor="#d70000" style={{ height: 25 }} url="https://facebook.com/" />
                    <SocialIcon bgColor="#fff" fgColor="#d70000" style={{ height: 25 }} url="https://instagram.com/" />
                </div>
            </div>
        </>
    );
};
export default Home;