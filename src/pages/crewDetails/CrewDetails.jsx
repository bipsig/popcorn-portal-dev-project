import React from 'react'

import useFetch from "../../hooks/useFetch";


import { useParams } from 'react-router-dom';
import CrewDetailsBanner from './crewDetailsBanner/CrewDetailsBanner';
import CrewImages from './crewImages/CrewImages';
import Movies from './carousels/Movies';
import TvShows from './carousels/TvShows';

const CrewDetails = () => {

	const { mediaType, id } = useParams();
	// Fetching the value of the mediaType and the movie/series id from the url of the react Router.

	// const { data, loading } = useFetch (`/${mediaType}/${id}/videos`);
	// // Creating an API call to get all the video links of the related Movie/TV show

	// const { data: credits, loading: creditsLoading } = useFetch (`/${mediaType}/${id}/credits`);
	// // Creating an API call to get the credits object containing the names of the cast and crew.

	return (
		<div>
			<CrewDetailsBanner />
            <CrewImages />
            <Movies id={id} />
            <TvShows id={id} />
		</div>
	)
}

export default CrewDetails;
