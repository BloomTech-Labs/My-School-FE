import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import OverviewCard from "./OverviewCard";
import { getAllActivitiesForUser } from "../../../actions/actions-portfolio";
import Loader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/core";

const ActivityOverview = ({
  activities,
  getAllActivitiesForUser,
  isLoading,
}) => {
  const history = useHistory();
  const [sortedActivities, setSortedActivities] = useState([]);
  const [arrLength, setArrLength] = useState();

  const override = css`
    margin-top: 10rem;
  `;

  useEffect(() => {
    getAllActivitiesForUser(3);
  }, [getAllActivitiesForUser]);

  useEffect(() => {
    const sorted = activities.sort((a, b) => b.id - a.id);
    setSortedActivities(sorted);
  }, [setSortedActivities, activities]);

  useEffect(() => {
    setArrLength(sortedActivities.length);
  }, [arrLength, sortedActivities]);

  const pusher = (index) => {
    const neededIndex = index + 1;
    if (neededIndex === sortedActivities.length) {
      return null;
    } else {
      history.push(`/activity/${sortedActivities[neededIndex].id}`);
    }
  };

  const puller = (index) => {
    const neededIndex = index - 1;
    if (neededIndex < 0) {
      return null;
    } else {
      history.push(`/activity/${sortedActivities[neededIndex].id}`);
    }

  };

  return (
    <>
      {isLoading === true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <Loader color={"#375E97"} css={override} />
        </div>
      ) : (
        sortedActivities.map((act) => (
          <OverviewCard
            key={act.id}
            activity={act}
            index={sortedActivities.indexOf(act)}
            pusher={pusher}
            puller={puller}
            arrLength={arrLength}
          />
        ))
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities,
    isLoading: state.portfolioReducer.isLoading,
    error: state.portfolioReducer.error,
  };
};

export default connect(mapStateToProps, { getAllActivitiesForUser })(
  ActivityOverview
);
