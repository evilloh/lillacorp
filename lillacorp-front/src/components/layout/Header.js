import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "./../../images/lillacorp-logo-png.png";
import "./../header.scss";

const Header = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__superior">
          <div></div>
          <div>
            <Link to="/" className="navbar__logo">
              <img src={logo}></img>
            </Link>
          </div>
          <div className="navbar__superior__user-container">
            <Link to="/profile" id="userCircle"></Link>
          </div>
        </div>
        <div className="navbar__links__container">
          <ul className="navbar__links__ul">
            <li className="nav-item">
              <Link to="/" className="navbar__links__link">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/test" className="navbar__links__link">
                Mangusta d'oro
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/article/add" className="navbar__links__link">
                Lilac
              </Link>
            </li>
          </ul>
          <ul className="navbar__links__ul">
            <li className="nav-item">
              <Link to="/about" className="navbar__links__link">
                Videi
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="navbar__links__link">
                Bacheca
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mangusta" className="navbar__links__link">
                Lillachoice
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  branding: "My App",
};

Header.propTypes = {
  branding: PropTypes.string.isRequired,
};

export default Header;
