import React, { useEffect } from 'react';
import moment from 'moment';
import {
    SimpleGrid,
    Box,
    Flex,
    Text,
    Image,
    useToast
} from '@chakra-ui/core';

const NewActivityPreview = ({ preview, loading, setIsLoading }) => {
    console.log("preview props:", preview)
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
        <SimpleGrid columns={[1, 1, 1, 2]} spacing={["20px", "20px", "20px", "128px"]} mx={["8px", "20px", "32px", "100px"]} color="gray.800">
            <Box w={["100%, 100%, 100%, 50%"]}>
                <Text fontSize="1.125rem" fontWeight="bold" color="gray.800" pb="32px">{preview.name}</Text>
                <Flex pb="24px">
                    <Text fontSize="xs" textTransform="uppercase" color="gray.800" w="25%">Subject: </Text>
                    <Text w="75%">{preview.subject}</Text>
                </Flex>
                <Flex pb="24px">
                    <Text fontSize="xs" textTransform="uppercase" w="25%">Description: </Text>
                    <Text fontSize="sm" w="75%">{preview.description ? preview.description : "No description provided"}</Text>
                </Flex>
                <Flex pb="24px">
                    <Text fontSize="xs" textTransform="uppercase" w="25%">Duration: </Text>
                    <Text fontSize="sm" w="75%">{preview.duration ? `${hours}h ${minutes}m` : "Duration not provided"}</Text>
                </Flex>
                <Flex pb="24px">
                    <Text fontSize="xs" textTransform="uppercase" w="25%">Date Completed: </Text>
                    <Text fontSize="sm" w="75%">{moment(preview.completion_date).format('L')}</Text>
                </Flex>
            </Box>
            <Box w={["100%, 100%, 100%, 50%"]}>
                <Box h="280px" border="1px" borderRadius="8px" borderColor="gray.400" p="24px" w="100%">
                    <Text fontSize="sm" color="gray.600" pb="22px">Attached Photo:</Text>
                    {preview.photo ? 
                    <Image 
                        src={preview.photo} 
                        alt={preview.name} 
                        maxHeight="200px" 
                        pb="22px"
                    />
                    : <Text color="gray.800">No image uploaded</Text>}
                </Box>
            </Box>
        </SimpleGrid>
        </>
    )
}

export default NewActivityPreview;