import React from 'react'
import { useState } from 'react';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';

import useFetch from '../../../hooks/useFetch';

import "./style.scss";


const Popular = () => {

	const [endpoint, setEndpoint] = useState ("movie");

	const { data, loading } = useFetch (`/${endpoint}/popular`);

	const onTabChange = (tab) => {
		setEndpoint (tab === "Movies" ? "movie" : "tv");
	}

	return (
		<div>
			<div className="carousel-section">
				<ContentWrapper>
					<span className="carousel-title">
                        Crowd Pleasers: Most-Watched Movies and TV
					</span>
					<SwitchTabs data={["Movies", "TV Shows"]} onTabChange = {onTabChange}/>
				</ContentWrapper>
				<Carousel 
                    data = {data?.results} 
                    loading = {loading}
                    endpoint = {endpoint} 
                />
			</div>
		</div>
	)
}

export default Popular;
