import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

const CrewImages = () => {
    const { url } = useSelector((state) => state.home);

    const { id } = useParams();

    const { data, loading } = useFetch(`/person/${id}/images`)

    const navigate = useNavigate();

    const skeleton = () => {
        return (
            <div className="skeleton-item">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    // Function that renders the skeleton component when data is still loading

    return (
        <div className="cast-section">
            <ContentWrapper>
                <div className="section-heading">Cast Portraits: Faces of the Ensemble</div>
                {!loading ? (
                    <div className="list-items">
                        {data?.profiles?.map ((item) => {
                             let imageUrl = item.file_path 
                                ? url.profile + item.file_path
                                : avatar;
                            return (
                                <div 
                                    key = {item.id}
                                >
                                    <div className="list-item">
                                        <div className="profile-image">
                                            <Img src = {imageUrl} />
                                        </div>
                                        {/* <div className="name">
                                            {item.name}
                                        </div>
                                        <div className="character">
                                            {item.character}
                                        </div> */}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="cast-skeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default CrewImages;
