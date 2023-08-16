import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import ProfileFallback from "../../../assets/avatar.png";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import CelebRating from "../../../components/celebRating/CelebRating";

const CrewDetailsBanner = ({ video, crew }) => {

    const [show, setShow] = useState(false);
    // State Variable controling the popup component to display a video
    const [videoId, setVideoId] = useState(null);
    // State variable saving the value of the videoId to be displayed

    const { id } = useParams();
    // Extracting the movie details from the url of React Router
    const { data, loading } = useFetch(`/person/${id}`);
    // Calls the required API call for the particular movie/TV show

    const { url } = useSelector((state) => state.home);

    const [expandedBiography, setExpandedBiography] = useState(false);

    // const _genres = data?.known_for_department;
    // Stores the genres of a particular movie/TV show

    const director = crew?.filter((f) => f.job === "Director");
    // Extracts the name of the crew people who have the job as director

    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer");
    // Extracts the name of the crew people who have these particular jobs

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    // Function that converts the given runtime in a presentable form

    return (
        <div className="details-banner">
            {/* While the data is still loading, a skeleton is displayed and when loaded, a gathered data is rendered */}
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            {/* <div>
                                <div className="backdrop-image">
                                    <Img src={url.backdrop + data.backdrop_path} />
                                </div>
                            </div>
                            <div className="opacity-layer"></div> */}
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.profile_path ? (
                                            <Img
                                                className="poster-image"
                                                src={url.backdrop + data.profile_path}
                                            />
                                        ) : (
                                            <Img
                                                className="poster-image"
                                                src={ProfileFallback}
                                            />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.name || data.title}`}
                                        </div>

                                        <div className="subtitle">
                                            {data.place_of_birth}
                                        </div>

                                        {/* <Genres data={_genres} /> */}

                                        <div className="row">
                                            {/* <CircleRating rating={data.vote_average.toFixed(1)} /> */}
                                            <CelebRating rating={data.popularity > 100 ? 100 : data.popularity.toFixed(1)} />
                                        </div>

                                        <div className="biography">
                                            <div className="heading">
                                                Biography
                                            </div>
                                            <div className="description">
                                                {expandedBiography
                                                    ? data.biography
                                                    : data.biography.substring(0, 300) + '...'}
                                                {!expandedBiography ? (
                                                    <button
                                                        className="read-more-button"
                                                        onClick={() => setExpandedBiography(true)}
                                                    >
                                                        Read More
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="read-more-button"
                                                        onClick={() => setExpandedBiography(false)}
                                                    >
                                                        Read Less
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {data.gender && (
                                            <div className="information">
                                                <span className="text bold">
                                                    Gender:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.gender == 0 ? "Not Specified" : data.gender == 1 ? "Female" : data.gender == 2 ? "Male" : "Non-Binary"}
                                                </span>
                                            </div>
                                        )}

                                        <div className="information">
                                            {/* {data.status && (
                                                <div className="info-item">
                                                    <span className="text bold">
                                                        Born:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )} */}

                                            {data.birthday && (
                                                <div className="info-item">
                                                    <span className="text bold">
                                                        Born:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(data.birthday).format("MMMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}

                                            {data.deathday && (
                                                <div className="info-item">
                                                    <span className="text bold">
                                                        Died:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(data.deathday).format("MMMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}

                                            {/* {data.runtime && (
                                                <div className="info-item">
                                                    <span className="text bold">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )} */}
                                        </div>


                                        {/* {director?.length > 0 && (
                                            <div className="information">
                                                <span className="text bold">Director: </span>
                                                <span className="text">
                                                    {director.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="information">
                                                <span className="text bold">Writer: </span>
                                                <span className="text">
                                                    {writer.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className="information">
                                                <span className="text bold">Creator: </span>
                                                <span className="text">
                                                    {data.created_by.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {data.created_by.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                                {/* <VideoPopup
                                    show = {show}
                                    setShow = {setShow}
                                    videoId = {videoId}
                                    setVideoId = {setVideoId} 
                                /> */}
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="details-banner-skeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default CrewDetailsBanner;