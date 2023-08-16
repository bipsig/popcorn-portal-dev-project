import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const TvShows = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/person/${id}/tv_credits`
    );

    return (
        <Carousel
            title="TV Shows"
            data={data?.cast}
            loading={loading}
            endpoint="tv"
        />
    );
};

export default TvShows;