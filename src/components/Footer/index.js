import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footerSection">
    <div className="footerTitle">
      <img
        src="https://i.postimg.cc/cL5GBcQZ/Vector.png"
        alt="website-footer-logo"
      />
      <h1 className="footerTitleName">Tasty Kitchens</h1>
    </div>
    <p className="footerDesc">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="iconsCon">
      <FaPinterestSquare
        className="footerIcon"
        data-testid="pintrest-social-icon"
      />
      <FaInstagram className="footerIcon" data-testid="instagram-social-icon" />
      <FaTwitter className="footerIcon" data-testid="twitter-social-icon" />
      <FaFacebookSquare
        className="footerIcon"
        data-testid="facebook-social-icon"
      />
    </div>
  </div>
)
export default Footer
