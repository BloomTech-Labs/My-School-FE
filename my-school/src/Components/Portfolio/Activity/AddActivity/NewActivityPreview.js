import React, { useEffect } from 'react';
import moment from 'moment';
import {
    Box,
    Flex,
    Text,
    Image,
    useToast
} from '@chakra-ui/core';

const NewActivityPreview = ({ preview, studentName, historyPusher }) => {
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
    }, [toast, preview.name])

    // Formats duration into hours and minutes for display
    const hours = Math.floor(preview.duration / 60);
    const minutes = preview.duration % 60;

    return (
        <>
            <Text padding='2rem 0rem 2rem 10rem' fontSize="1.125rem" fontWeight="700" color="gray.800"><span onClick={historyPusher}>{studentName !== '' ? `${studentName}'s Portfolio` : ''}</span> / {preview.name} - Preview </Text>
            <Flex>
                <Box w={1 / 2} px={20}>
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
                <Box w={1 / 2} px={20}>
                    <Box border="1px solid #C4C4C4" borderRadius="8px">
                        <Text>Assignment Photo</Text>
                        {preview.photo ?
                            <Image
                                src={preview.photo}
                                alt={preview.name}
                                size="100px"
                                objectFit="cover"
                            />
                            : <Text>No image uploaded</Text>}
                    </Box>
                </Box>
            </Flex>
        </>
    )
}

export default NewActivityPreview;