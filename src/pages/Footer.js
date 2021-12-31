import "./footer.css"
import logo from '../images/logofooter.png'
import { useHistory } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';

const Footer = () => {

  const history = useHistory;
  return (
    <div class="footer footer-bgimage">
      <div class="contain">

        <div class="columnss">
          <h1>ABOUT</h1>
          <ul>
            <li>Popular Sites</li>
            <li>Donation</li>
            <li>About us</li>
          </ul>
        </div>

        <div class="columnss">
          <h1>USEFUL LINKS</h1>
          <ul>
            <li>FAQ</li>
            <li>Terms & Conditions</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div class="columnss">
          <h1>FOR BUSINESS</h1>
          <ul>
            <li>Clain your business page</li>
            <li>Success stories</li>
            <li>Business support</li>
            <li>Advertise</li>
          </ul>
        </div>

        <div class="columnss social">
          <a href="/">
            <img style={{ width: 230, cursor: 'pointer',position: 'relative',left: -16,}}href="/#/"src={logo} alt="Logo"
            />
          </a>
          <a href="#">
            <a href=""><i class="fab fa-twitter"></i></a>
          </a>
          <a href="#">
            <a href=""><i class="fab fa-facebook-square"></i></a>
          </a>
          <a href="#">
          <i class="fab fa-snapchat-ghost"></i>
          </a>
          <a href="#">
          <i class="fab fa-instagram"></i>
          </a>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  );
};
export default Footer;