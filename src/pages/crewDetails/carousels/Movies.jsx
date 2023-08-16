import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Movies = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/person/${id}/movie_credits`
    );

    return (
        <Carousel
            title="Movies"
            data={data?.cast}
            loading={loading}
            endpoint="movie"
        />
    );
};

export default Movies;