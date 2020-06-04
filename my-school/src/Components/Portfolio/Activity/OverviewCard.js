import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Text, Heading } from "@chakra-ui/core";
import OverviewCardGrid from "./OverviewCardGrid";
import OverviewCardButton from "./OverviewCardButton";
import OverviewImageBox from "./OverviewImageBox";

const OverviewCard = (props) => {
  const { id } = useParams();
  const [hours, setHours] = useState();
  const [mins, setMins] = useState();

  useEffect(() => {
    setHours(Math.floor(props.activity.duration / 60));
    setMins(props.activity.duration % 60);
  }, [hours, mins, props.activity.duration]);

  useEffect(() => {
    if (props.activity.id === Number(id)) {
      props.nameSetter(props.activity.name)
    }
  }, [props.activity, id])

  const handlePrevious = (index) => {
    props.puller(index);
  };

  const handleNext = (index) => {
    props.pusher(index);
  };

  return (
    <>
      {props.activity.id === Number(id) && (
        <>
          <Flex align="center" justify="flex-start" margin="5vh auto 0 5vw">
            <Heading as="h2">{props.activity.name}</Heading>
          </Flex>

          <Flex direction="column">
            <Flex
              direction="row-reverse"
              justify="space-between"
              align="center"
              height="50vh"
              width="90vw"
              margin="0 auto"
            >
              <OverviewImageBox props={props} />
              <OverviewCardGrid props={props} hours={hours} mins={mins} />
            </Flex>
            <Flex justify="center">
              <OverviewCardButton
                handleClick={handlePrevious}
                props={props}
                icon="chevron-left"
              />
              <Text paddingLeft=".5rem" paddingRight=".5rem">
                {props.index + 1} of {props.arrLength}
              </Text>
              <OverviewCardButton
                handleClick={handleNext}
                props={props}
                icon="chevron-right"
              />
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};
export default OverviewCard;
