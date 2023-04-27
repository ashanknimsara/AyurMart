import "../assets/styles/header.css";
import React, { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { Link } from 'react-router-dom';

const Header = () => {
  const [ ,setCounter] = useState(false);
  // eslint-disable-next-line
  

  return (
    <ScrollTrigger
      onEnter={() => setCounter(true)}
      onExit={() => setCounter(false)}
      
    >
      <div className="main__header__container">

        <div className="header__container">
          <div className="header__details__container">
            <h3 className="header__top__topic">Welcome To AyurMart</h3>
            <p className="header__bottom__para">
              Sri Lanka's No.01 Ayurvedic Store
            </p>
            <Link to="/shop">
              <button className="header__btn">SHOP NOW</button>
            </Link>

          </div>
        </div>
        <div className="header__counter">
          <div className="header__counter__details">
            {Header && (
              <>
                <h2 className="counter">
                  <CountUp start={0} end={250} duration={2} delay={2} />+
                </h2>
              </>
            )}
            <p className="counter__para">
              Island Wide Shops.
            </p>
          </div>
          <div className="header__counter__details">
            {Header && (
              <>
                <h2 className="counter">
                  <CountUp start={0} end={2000} duration={2} delay={2} />+
                </h2>
              </>
            )}
            <p className="counter__para">
              Professional & Friendly Employees
            </p>
          </div>
          <div className="header__counter__details">
            {Header && (
              <>
                <h2 className="counter">
                  <CountUp start={0} end={24} duration={2} delay={2} /> Hours
                </h2>
              </>
            )}

            <p className="counter__para">
              Customer Service Available
            </p>
          </div>
        </div>
      </div>
    </ScrollTrigger>
  );
};

export default Header;
