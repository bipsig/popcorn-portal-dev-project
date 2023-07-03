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
    const [query, setQuery] = useState ("");
    const navigate = useNavigate ();

    const {url} = useSelector ((state) => state.home);

    const {data, loading} = useFetch ("/movie/upcoming")

    useEffect (() => {
        const bg = 
            url.backdrop + 
            data?.results?.[Math.floor (Math.random() * 20)].backdrop_path;
        
        setBackground (bg);
    }, [data])

    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate (`/search/${query}`);
        }
    }

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

export default HeroBanner
