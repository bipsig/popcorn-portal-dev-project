import React from 'react'

import useFetch from "../../hooks/useFetch";
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';

import "./style.scss";

const Details = () => {

	const { mediaType, id } = useParams();
	// Fetching the value of the mediaType and the movie/series id from the url of the react Router.

	const { data, loading } = useFetch (`/${mediaType}/${id}/videos`);
	// Creating an API call to get all the video links of the related Movie/TV show

	const { data: credits, loading: creditsLoading } = useFetch (`/${mediaType}/${id}/credits`);
	// Creating an API call to get the credits object containing the names of the cast and crew.

	return (
		<div>
			<DetailsBanner video = {data?.results [0]} crew={credits?.crew}/>
			<Cast data = {credits?.cast} loading = {creditsLoading} />
		</div>
	)
}
import "./style.scss";
import { useParams } from 'react-router-dom';

export default Details
