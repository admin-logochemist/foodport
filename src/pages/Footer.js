import "./footer.css"
import logo from '../images/logofooter.png'
import { useHistory } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
  
const Footer = () => {

  const history = useHistory;
  return (
    <div class="footer-clean">
      <footer className="footer-bgimage">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-sm-4 col-md-3 item fonts">
              <h3
                style={{
                  color: "#d70000",
                }}
              >
                ABOUT
              </h3>
              <ul>
                <li>
                  <a href="#">Popular Sites</a>
                </li>
                <li>
                  <a href="#">Donation</a>
                </li>
                <li>
                  <a href="/#/about-us">About us</a>
                </li>
              </ul>
            </div>
            <div class="col-sm-4 col-md-3 item fonts">
              <h3
                style={{
                  color: "#d70000",
                }}
              >
                USEFUL LINKS
              </h3>
              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="/#/termsandconditions">Terms & Conditions</a>
                </li>
                <li>
                  <a href="/#/contact">Contact Us</a>
                </li>
              </ul>
            </div>
            <div class="col-sm-4 col-md-3 item fonts">
              <h3
                style={{
                  color: "#d70000",
                }}
              >
                FOR BUSINESS
              </h3>
              <ul>
                <li>
                  <a href="#">Clain your business page</a>
                </li>
                <li>
                  <a href="#">Success stories</a>
                </li>
                <li>
                  <a href="#">Business support</a>
                </li>
                <li>
                  <a href="#">Advertise</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-3 item social">
              <a href="#">
              <SocialIcon bgColor="#d70000" fgColor="#fff" url="https://twitter.com/" />
              </a>
              <a href="#">
              <SocialIcon bgColor="#d70000" fgColor="#fff" url="https://facebook.com/" />
              </a>
              <a href="#">
              <SocialIcon bgColor="#d70000" fgColor="#fff" url="https://snapchat.com/" />
              </a>
              <a href="#">
              <SocialIcon bgColor="#d70000" fgColor="#fff" url="https://instagram.com/" />
              </a>
              <img 
                  style={{
                  width: 250,
                  padding: 10,
                  marginLeft: 10,
                  cursor: 'pointer',
                }}
                 href="/#/"
                src={logo}
                alt="Logo"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;