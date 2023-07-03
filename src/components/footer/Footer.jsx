import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menu-items">
                    <li className="menu-item">Terms Of Use</li>
                    <li className="menu-item">Privacy-Policy</li>
                    <li className="menu-item">About</li>
                    <li className="menu-item">Blog</li>
                    <li className="menu-item">FAQ</li>
                </ul>

                <div className="info-text">
				Unleash your cinematic curiosity with Popcorn Portal. Discover, explore, and indulge in a world of movies and series. From insightful reviews to exciting trailers, we've got you covered. Join us and embark on an extraordinary entertainment journey.
                </div>

                <div className="social-icons">

                    <span className="icon">
                        <FaFacebookF />
                    </span>

                    <span className="icon">
                        <FaInstagram />
                    </span>

                    <span className="icon">
                        <FaTwitter />
                    </span>

                    <span className="icon">
                        <FaLinkedin />
                    </span>

                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;