import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CelebRating = ({ rating }) => {
    return (
        <div className="circle-rating">
            <CircularProgressbar
                value={rating}
                maxValue={100}
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 20 ? "red" : rating < 50 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CelebRating;