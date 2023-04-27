import React from "react";
import "../assets/styles/footer.css";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="mainfooter__container">
      <div className="main__footer__section">
        <div className="main__footer__card">
          <h2 className="main__footer__title">AYURMART</h2>
          <p className="main__footer__para">
            Since 1985, AYURMART has started as Ayurvedic shop in colombo Sri Lanka. After Serveral years it has distributed all island with over 250+ stores.
          </p>
          <div className="footer__icon__set">
            <BsTwitter className="footer__icon"/>
            <BsFacebook className="footer__icon"/>
            <BsInstagram className="footer__icon"/>
          </div>
        </div>
        <div className="main__footer__card">
          <h2 className="main__footer__title">Quick Links</h2>
          <ul className="main__footer__ul">
            <li className="main__footer__li">Home</li>
            <li className="main__footer__li">Shop Now</li>
            <li className="main__footer__li">About Us</li>
            <li className="main__footer__li">Contact Us</li>
          </ul>
        </div>
        <div className="main__footer__card">
          <h2 className="main__footer__title">Contact Info</h2>
          <ul className="main__footer__ul">
            <li className="main__footer__li tr">call us</li>
            <li className="main__footer__li tv">+94 (71) 898-0895</li>
          </ul>
          <ul className="main__footer__ul">
            <li className="main__footer__li tr">mail us</li>
            <li className="main__footer__li tv">info@ayurmart.lk</li>
          </ul>
          
        </div>
        <div className="main__footer__card">
          <h2 className="main__footer__title">Subscribe to Our Newsletter</h2>
          <p className="main__footer__para">
            Subscribe our newsletter to get an update about all promotions of AYURMART.
          </p>
          <button className="footer__sub__btn">Join our mailing list</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
