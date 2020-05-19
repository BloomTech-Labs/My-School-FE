import React, { useEffect } from 'react';
import moment from 'moment';
import {
    Box,
    Flex,
    Text,
    useToast
} from '@chakra-ui/core';

const NewActivityPreview = ({ preview }) => {
    // console.log("preview props:", props)
    const toast = useToast();

    // Displays success toast when page loads
    useEffect(() => {
        toast({
            title: "Success!",
            description: `${preview.name} added to your portfolio`,
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "top-right"
        })
    }, [])

    // Formats duration into hours and minutes for display
    const hours = Math.floor(preview.duration / 60);
    const minutes = preview.duration % 60;

    return (
        <>
            <Box>
                <Text fontSize="2xl">{preview.name}</Text>
                <Flex>
                    <Text>Subject: </Text>
                    <Text>{preview.subject}</Text>
                </Flex>
                <Flex>
                    <Text>Description: </Text>
                    <Text>{preview.description ? preview.description : "N/A"}</Text>
                </Flex>
                <Flex>
                    <Text>Duration: </Text>
                    <Text>{preview.duration ? `${hours}h${minutes}m` : "N/A"}</Text>
                </Flex>
                <Flex>
                    <Text>Date Completed: </Text>
                    <Text>{moment(preview.completion_date).format('l')}</Text>
                </Flex>
            </Box>
        </>
    )
}

export default NewActivityPreview;