import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Text } from "@chakra-ui/core";
import OverviewCard from "./OverviewCard";
import { getAllActivitiesForUser } from "../../../Redux/actions/actions-portfolio";
import Loader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/core";
import axios from 'axios'

const ActivityOverview = ({ activities, isLoading }) => {
  const history = useHistory();
  const [sortedActivities, setSortedActivities] = useState([]);
  const [arrLength, setArrLength] = useState();
  const [projectName, setProjectName] = useState('')

  const override = css`
    margin-top: 10rem;
  `;

  useEffect(() => {
    const sorted = activities.sort((a, b) => b.id - a.id);
    setSortedActivities(sorted);
  }, [setSortedActivities, activities]);

  useEffect(() => {
    setArrLength(sortedActivities.length);
  }, [arrLength, sortedActivities]);

<<<<<<< HEAD
  useEffect(() => {

    if (id)
      axios
        .get(`https://my-school-v1.herokuapp.com/api/users/${id}`)
        .then(res => {
          const name = res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1)
          setStudentName(name)
        })
        .catch(err => {
          console.log(err)
        });
    return undefined
  }, [id])

=======
>>>>>>> 0e8450aab9f161c3c43b1d119e8886d15821921b
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
  const nameSetter = name => {
    setProjectName(name)
  }

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
              nameSetter={nameSetter}
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
