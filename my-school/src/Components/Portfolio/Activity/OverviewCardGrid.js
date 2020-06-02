import React from 'react'
import {Grid, Box, Text, Tag} from '@chakra-ui/core'
import { pillColor } from "../../../utils/pillColor";
import moment from "moment";

const OverviewCardGrid = ({props, hours, mins}) => {

    return(
        <Grid
                templateColumns=".5fr 3fr"
                templateRows=".5fr auto 1fr 1fr 1fr"
                width="50%"
                height="90%"
                gap={6}
              >
                <Box width="100%">
                  <Text fontWeight="900">Subject:</Text>
                </Box>
                <Box width="100%">
                  {" "}
                  <Box>
                    <Tag
                      bg={pillColor(props.activity.subject)}
                      color={
                        pillColor(props.activity.subject).split(".")[0] + ".800"
                      }
                      rounded="full"
                      minHeight="1rem"
                    >
                      {props.activity.subject}
                    </Tag>
                  </Box>
                </Box>
                <Box width="100%">
                  <Text fontWeight="900">Description:</Text>
                </Box>
                <Box width="100%">
                  <Text>{props.activity.description}</Text>
                </Box>
                <Box width="100%">
                  <Text fontWeight="900">Duration:</Text>
                </Box>
                <Box width="100%">
                  {hours}hr {mins}m
                </Box>
                <Box width="100%">
                  <Text fontWeight="900">Created:</Text>
                </Box>
                <Box width="100%">
                  {moment(props.activity.created_at).format("ll").toUpperCase()}
                </Box>
                <Box width="100%">
                  <Text fontWeight="900">Submitted:</Text>
                </Box>
                <Box width="100%">
                  {" "}
                  {moment(props.activity.completion_date)
                    .format("ll")
                    .toUpperCase()}
                </Box>
              </Grid>
    )
}
export default OverviewCardGrid