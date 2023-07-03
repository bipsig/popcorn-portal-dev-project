import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
//Search Icon Import
import { SlMenu } from "react-icons/sl";
//Hamburger Menu Icon Import
import { VscChromeClose } from "react-icons/vsc";
//CLose Icon Import
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/icon-nobg-removebg-preview.png";

const Header = () => {
    const [show, setShow] = useState("top");
    //State Variable to change the look of the Navigation Bar based on the scroll location of the page
    const [lastScrollY, setLastScrollY] = useState(0);
    //State Variable to set the location of the particular scroll region to decide the look of the Navigation Bar
    const [mobileMenu, setMobileMenu] = useState(false);
    //State Variable to decide whether the Hamburger Menu shall be visible or not
    const [query, setQuery] = useState("");
    //State Variable to store the the search string entered by the user
    const [showSearch, setShowSearch] = useState("");
    //State Variable to decide whether the Search bar of Header shall be visible or not

    const navigate = useNavigate();
    const location = useLocation();

    useEffect (() => {
        window.scrollTo (0, 0);
    }, [location])
    //Resetting the location of the page to beginning of the page whenever we navigate from one page to another
    
    const controlNavbar = () => {
        //console.log (window.scrollY);

        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow ("hide");
            }
            else {
                setShow ("show");
            }
        }
        else {
            setShow ("top");
        }
        setLastScrollY (window.scrollY);
    };
    //Function that controls the look of the Header. When scrolled down to a certain extent (200px), the header is hidden. When scrolled a little bit up, the header is visible again and when reaches the top of the page yet again the header is blurred. The styling is done in the scss file.

    useEffect (() => {
        window.addEventListener ("scroll", controlNavbar);

        return () => {
            window.removeEventListener ("scroll", controlNavbar);
        }
    }, [lastScrollY]);
    //Triggers the function to control Navbar when some scrolling is done

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    }
    //Function to open the Search Bar of Header

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    }
    //Function to open the hamburger menu in smaller screens

    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate (`/search/${query}`);
            setTimeout(() => {
                setShowSearch (false);
            }, 1000);
        }
    }
    //Generates the page to navigate when a search query is entered

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate ("/explore/movie");
        }
        else {
            navigate ("/explore/tv");
        }
        setMobileMenu (false);
    }
    //Navigates between pages when the links in the Header is clicked

    return (
        <header className={`header ${mobileMenu ? "mobile-view" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                    <img src={logo} alt="" />
                </div>

                <ul className="menu-items">
                    <li className="menu-item" onClick = {() => navigationHandler ("movie")}>
                        Movies
                    </li>
                    <li className="menu-item" onClick = {() => navigationHandler ("tv")}>
                        TV Shows
                    </li>
                    <li className="menu-item">
                        <HiOutlineSearch onClick = {openSearch}/>
                    </li>
                </ul>

                <div className="mobile-menu-items">
                    <HiOutlineSearch onClick={openSearch}/>

                    {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
                </div>
            </ContentWrapper>

            {showSearch && (
                <div className="search-bar">
                    <ContentWrapper>
                        <div className="search-input">
                            <input
                                type="text"
                                placeholder="Embark on a Movie and Series Adventure..."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose onClick={() => setShowSearch(false)} />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;