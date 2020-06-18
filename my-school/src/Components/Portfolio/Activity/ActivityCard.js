import React, { useState, useEffect } from "react";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { pillColor } from '../../../utils/pillColor'
// components
import DeleteEntryButton from "./DeleteEntryButton";
import EditActivityModal from "./EditActivityModal";
// styling
import fontN from "../../../assets/Nunito_Sans/Nunito Sans Regular.ttf";
import { Tag, Grid, Box, Flex } from "@chakra-ui/core";

function ActivityCard(props) {
  const studentId = useParams().id;
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const history = useHistory();
  const gridTemplateColumns = props.isParent ? "1fr .3fr .3fr .3fr .5fr " : "1.25fr .25fr .25fr .25fr"

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

  return (
    <Grid
      templateColumns={gridTemplateColumns}
      alignItems='center'
      className="activity-card"
      fontFamily={fontN}
    >
      <Box width="100%" fontSize='1.2rem' fontWeight='500'>
        <p className="link" onClick={() => pushToOverview(props.activity.id)}>
          {props.activity.name.length < 29
            ? props.activity.name
            : `${props.activity.name.slice(0, 25)}...`}
        </p>
      </Box>
      <Box px="4px">
        <Tag fontSize="xs" bg={pillColor(props.activity.subject)} color={pillColor(props.activity.subject).split('.')[0] + '.800'} rounded="full" size="sm">
          {props.activity.subject}
        </Tag>
      </Box>
      <Box textTransform="uppercase" fontSize="xs" px="4px">
        {hour}hrs {min}m
      </Box>
      <Box textTransform="uppercase" fontSize="xs" px="4px">
          {moment(props.activity.completion_date).format("ll").toUpperCase()}
      </Box>
      {props.isParent ?
        (
          <Flex flexWrap="wrap" justify="center" align="center" px="4px"
          >
            <Box>
              <EditActivityModal
                margin="20px"
                activity={props.activity}
                defaultHour={hour}
                defaultMin={min}
                studentId={studentId}
              />
            </Box>
            <Box>
              <DeleteEntryButton activity={props.activity} studentId={studentId} />
            </Box>
          </Flex>
        )
        :
        null}
    </Grid>
  );
}

export default ActivityCard;
