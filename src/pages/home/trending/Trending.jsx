import React from 'react'
import { useState } from 'react';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';

import useFetch from '../../../hooks/useFetch';

import "./style.scss";


const Trending = () => {

	const [endpoint, setEndpoint] = useState ("day");

	const { data, loading } = useFetch (`/trending/all/${endpoint}`);

	const onTabChange = (tab) => {
		setEndpoint (tab === "Day" ? "day" : "week");
	}

	return (
		<div>
			<div className="carousel-section">
				<ContentWrapper>
					<span className="carousel-title">
					Popcorn Picks: The Latest and Greatest in Entertainment
					</span>
					<SwitchTabs data={["Day", "Week"]} onTabChange = {onTabChange}/>
				</ContentWrapper>
				<Carousel data = {data?.results} loading = {loading} />
			</div>
		</div>
	)
}

export default Trending
