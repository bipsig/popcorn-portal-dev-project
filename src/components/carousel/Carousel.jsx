import React, { useRef, useEffect, useState } from "react";
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
//Default Poster if no poster is being fetched from the API

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
//Circle Component depicting the rating of the movie/series along with the poster
import Genres from "../genres/Genres";
//Genres Component that is depicting the genres of the movie/series along with the poster

const Carousel = ({ data, loading, endpoint }) => {
	const carouselContainer = useRef();
	//Similar to querySelector, is used to target a particular element in the rendered HTML

	const { url } = useSelector((state) => state.home);

	const navigate = useNavigate();
	//Provide navigation to other pages when a particular movie is clicked

	const [scrollInterval, setScrollInterval] = useState(null);
	//Decide whether the carousel should scroll or not

	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	//Capture the value of the screen width at a particular instant

	const navigation = (direction) => {
		const container = carouselContainer.current;
		const scrollAmount =
			direction === "left"
				? container.scrollLeft - (container.offsetWidth + 20)
				: container.scrollLeft + (container.offsetWidth + 20);

		container.scrollTo({
			left: scrollAmount,
			behavior: "smooth",
		});
	};
	//Applying functionality to the arrows being placed with the carousel and hence moving it left or right

	const startScrolling = () => {
		const container = carouselContainer.current;
		const maxScrollLeft = container.scrollWidth - container.clientWidth;
		const shouldResetScroll = container.scrollLeft >= maxScrollLeft;

		const screenWidth = window.innerWidth;
		const breakpoint = 768; // Adjust this value to match your md screen breakpoint

		if (screenWidth >= breakpoint) {
			setScrollInterval(
				setInterval(() => {
					const container = carouselContainer.current;
					const maxScrollLeft = container.scrollWidth - container.clientWidth;
					const shouldResetScroll = container.scrollLeft >= maxScrollLeft;

					if (shouldResetScroll) {
						container.scrollTo({
							left: 0,
							behavior: "smooth",
						});
					} else {
						navigation("right");
					}
				}, 5000)
			);
		}
	};
	//Automatic scrolling after 5 seconds and stopping scrolling in md screens

	const stopScrolling = () => {
		clearInterval(scrollInterval);
	};

	const handleResize = () => {
		setScreenWidth(window.innerWidth);
	  };
	
	  useEffect(() => {
		startScrolling();
		window.addEventListener('resize', handleResize);
		return () => {
		  stopScrolling();
		  window.removeEventListener('resize', handleResize);
		};
	  }, []);

	
	  const skeletonItem = () => {
		return (
			<div className="skeleton-item">
				<div className="poster-block skeleton">
					<div className="text-block">
						<div className="title skeleton"></div>
						<div className="date skeleton"></div>
					</div>
				</div>
			</div>
		);
	};
	//Cards with blur effect to render when the API call is not yet made

	return (
		<div
			className="carousel"
			onMouseEnter={stopScrolling}
			onMouseLeave={startScrolling}
		>
			<ContentWrapper>
				<BsFillArrowLeftCircleFill
					className="carousel-left-nav arrow"
					onClick={() => navigation("left")}
				/>

				<BsFillArrowRightCircleFill
					className="carousel-right-nav arrow"
					onClick={() => navigation("right")}
				/>

				{!loading ? (
					<div className="carousel-items" ref={carouselContainer}>
						{data?.map((item) => {
							const posterUrl = item.poster_path
								? url.poster + item.poster_path
								: PosterFallback;
							return (
								<div
									key={item.id}
									className="carousel-item"
									onClick={() => navigate(`/${item.media_type || endpoint }/${item.id}`)}
								>
									<div className="poster-block">
										<Img src={posterUrl} />
										<CircleRating rating={item.vote_average.toFixed(1)} />
										<Genres data={item.genre_ids.slice(0, 2)} />
									</div>
									<div className="text-block">
										<span className="title">{item.title || item.name}</span>
										<span className="date">
											{dayjs(item.release_date).format("MMMM D, YYYY")}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className="loading-skeleton">
						{skeletonItem()}
						{skeletonItem()}
						{skeletonItem()}
						{skeletonItem()}
						{skeletonItem()}
					</div>
				)}
			</ContentWrapper>
		</div>
	);
};

export default Carousel;
