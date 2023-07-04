import React from 'react'
import { useState } from 'react';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';

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
						Trending
					</span>
					<SwitchTabs data={["Day", "Week"]} onTabChange = {onTabChange}/>
				</ContentWrapper>
			</div>
		</div>
	)
}

export default Trending
