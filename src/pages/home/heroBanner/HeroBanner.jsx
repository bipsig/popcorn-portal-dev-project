import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';

import "./style.scss";

import useFetch from '../../../hooks/useFetch';

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {

    const [background, setBackground] = useState ("");
    //State variable to store the URL of the generated image.
    const [query, setQuery] = useState ("");
    //State Variable to store the string value entered by the User for Searching
    const navigate = useNavigate ();

    const {url} = useSelector ((state) => state.home);

    const {data, loading} = useFetch ("/movie/upcoming")
    //API Call to fetch the upcoming movies with their data

    useEffect(() => {
        const interval = setInterval(() => {
            const bg =
                url.backdrop +
                data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
            setBackground(bg);
        }, 5000);

        return () => clearInterval(interval);
    }, [data, url]);
    //Randomly select a movie/series from the generated list and convert it into the required URL for rendering purposes. THe image keeps changing every 5 seconds.

    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate (`/search/${query}`);
        }
    }
    //Handle the Search Box and hence navigate to the required page

    return (
        <div>
            <div className="hero-banner">
                {!loading && 
                    <div className="backdrop-image">
                        <Img src = {background}/>
                    </div>
                }
                
                <div className="opacity-layer">
                    
                </div>
                
                <ContentWrapper>
                    <div className="hero-banner-content">
                        <span className="title">
                            Unleashing Cinematic Magic
                        </span>
                        <span className="subtitle">
                            Discover the World of Movies and Series - Trailers, News, and Reviews!
                        </span>

                        <div className="search-input">
                            <input 
                                type="text"
                                placeholder="Embark on a Movie and Series Adventure..."
                                onChange={(e) => setQuery (e.target.value)}
                                onKeyUp={searchQueryHandler} 
                            />
                            <button>Search</button>
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        </div>
  )
}

export default HeroBanner;
