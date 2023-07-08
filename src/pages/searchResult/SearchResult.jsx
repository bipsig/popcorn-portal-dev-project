import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import "./style.scss";

import { fetchDataFromAPI } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
	const [data, setData] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(false);
	const { query } = useParams();

	const fetchInitialData = () => {
		setLoading(true);
		fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNumber}`).then((res) => {
			setData(res);
			setPageNumber((prev) => prev + 1);
			setLoading(false);
		});
	}

	const fetchNextPageData = () => {
		fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNumber}`).then((res) => {
			if (data && data.results) {
				setData({
					...data,
					results: [...data.results, ...res?.results]
				});
			} else {
				setData(res);
			}

			setPageNumber((prev) => prev + 1);
		});
	}

	useEffect(() => {
		setPageNumber (1);
		fetchInitialData();
	}, [query])

	return (
		<div className="search-results-page">
			{loading && <Spinner initial={true} />}
			{!loading && (
				<ContentWrapper>
					{data && data.results && data?.results?.length > 0 ? (
						<>
							<div className="page-title">
								{`Search ${data.total_results > 1 ? "results" : "result"} of '${query}'`}
							</div>

							<InfiniteScroll
								className="content"
								dataLength={data.results.length}
								next={fetchNextPageData}
								hasMore={pageNumber <= data.total_pages}
								loader={<Spinner />}
							>
								{data.results.map((item) => {
									if (item.media_type === "person") return null; // Skip rendering person items
									return (
										<MovieCard key={item.id} data={item} fromSearch={true} />
									);
								})}
							</InfiniteScroll>
						</>
					) : (
						<span className="result-not-found">
							Sorry, Results not found
						</span>
					)}
				</ContentWrapper>
			)}
		</div>
	);
}

export default SearchResult;
