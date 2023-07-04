import React from "react"; 
import { useRef } from "react";
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

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";


const Carousel = ({ data, loading }) => {
	
	const carouselContainer = useRef();

	const {url} = useSelector ((state) => state.home);

	const navigate = useNavigate();

	const navigation = (direction) => {
		const container = carouselContainer.current;

		const scrollAmounnt = 
			direction === "left" 
			? container.scrollLeft - (container.offsetWidth + 20)
			: container.scrollLeft + (container.offsetWidth + 20);

		container.scrollTo ({
			left: scrollAmounnt,
			behavior: "smooth",
		});
	}

	const skeletonItem = () => {
		return (
			<div className="skeleton-item">
				<div className="poster-block skeleton">
					<div className="text-block">
						<div className="title skeleton">
						</div>
						<div className="date skeleton">
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className = "carousel">
			<ContentWrapper>
				<BsFillArrowLeftCircleFill
					className = "carousel-left-nav arrow"
					onClick = {() => navigation("left")}
				/>

				<BsFillArrowRightCircleFill
					className = "carousel-right-nav arrow"
					onClick = {() => navigation ("right")}
				/>

				{!loading ? (
					<div 
						className="carousel-items" 
						ref = {carouselContainer}
					>
						{data?.map ((item) => {
							const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
							return (
								<div
									key = {item.id}
									className="carousel-item"
									onClick = {() => navigate (`/${item.media_type}/${item.id}`)}
								>
									<div className="poster-block">
										<Img src = {posterUrl} />
										<CircleRating 
											rating = {item.vote_average.toFixed(1)} 
										/>
										<Genres 
											data = {item.genre_ids.slice (0,2)}
										/>
									</div>
									<div className="text-block">
										<span className="title">
											{item.title || item.name}
										</span>
										<span className="date">
											{dayjs (item.release_date).format ("MMMM D, YYYY")}
										</span>
									</div>
								</div>
							)
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
	)
}

export default Carousel
