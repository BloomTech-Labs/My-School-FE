import React, { useState, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
// components
import DeleteEntryButton from "./DeleteEntryButton";
import EditActivityModal from "./EditActivityModal";
// styling

import { Tag, Grid, Box } from "@chakra-ui/core";
import "../App.css";

function ActivityCard(props) {
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const history = useHistory();


  useEffect(() => {
    if (props.activity.duration !== null) {
      const hours = Math.floor(props.activity.duration / 60);
      const minutes = props.activity.duration % 60;
      setHour(hours);
      setMin(minutes);
    } else {
      setHour(0);
      setMin(0);
    }
  }, [props.activity.duration]);


  const pushToOverview = (id) => {
    history.push(`/activity/${id}`);
  };

  const pillColor = (subject) => {
    switch (subject) {
      case "English":
        return "red";
      case "Math":
        return "orange";
      case "Science":
        return "yellow";
      case "Social Studies":
        return "green";
      case "Art":
        return "teal";
      case "Music":
        return "blue";
      case "Health":
        return "cyan";
      case "Physical Education":
        return "purple";
      default:
        return "pink";
    }
  };

  return (
    <Grid
      templateColumns=".75fr .25fr 1fr .5fr .25fr .25fr"
      alignItems='center'
      className="activity-card"
    >
      <Box width="100%" fontSize='1.2rem' fontWeight='500'>
        <p className="link" onClick={() => pushToOverview(props.activity.id)}>
          {props.activity.name.length < 35
            ? props.activity.name
            : `${props.activity.name.slice(0, 31)}...`}
        </p>
      </Box>
      <Box>
        {hour}hrs {min}m
      </Box>
      <Box textAlign="center">
        <Tag variantColor={pillColor(props.activity.subject)} rounded="full">
          {props.activity.subject}
        </Tag>
      </Box>
      <Box>
        <p>
          {moment(props.activity.completion_date).format("ll").toUpperCase()}
        </p>
      </Box>
      <Box>
        <EditActivityModal
          margin="20px"
          activity={props.activity}
          defaultHour={hour}
          defaultMin={min}
        />
      </Box>
      <Box>
        <DeleteEntryButton user={props.user} activity={props.activity} />
      </Box>
    </Grid>
  );
}

export default ActivityCard;
