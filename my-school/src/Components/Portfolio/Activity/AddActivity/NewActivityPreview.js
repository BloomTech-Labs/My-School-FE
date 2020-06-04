import React, { useEffect } from 'react';
import moment from 'moment';
import { pillColor } from '../../../../utils/pillColor';
import {
    SimpleGrid,
    Box,
    Flex,
    Text,
    Image,
    Tag,
    useToast
} from '@chakra-ui/core';

const NewActivityPreview = ({ preview, loading, setIsLoading }) => {
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
                <Flex pb="24px" align="center">
                    <Text fontSize="xs" textTransform="uppercase" color="gray.800" w="35%">Subject: </Text>
                    <Tag bg={pillColor(preview.subject)} color={pillColor(preview.subject).split('.')[0] + '.800'} rounded="full" fontSize="xs">{preview.subject}</Tag>
                </Flex>
                <Flex pb="24px" align="flex-start">
                    <Text fontSize="xs" textTransform="uppercase" w="35%">Description: </Text>
                    <Text fontSize="sm" w="65%">{preview.description ? preview.description : "No description provided"}</Text>
                </Flex>
                <Flex pb="24px" align="flex-end">
                    <Text fontSize="xs" textTransform="uppercase" w="35%">Duration: </Text>
                    <Text fontSize="sm" w="65%">{preview.duration ? `${hours}h ${minutes}m` : "Duration not provided"}</Text>
                </Flex>
                <Flex pb="24px" align="flex-end">
                    <Text fontSize="xs" textTransform="uppercase" w="35%">Date Completed: </Text>
                    <Text fontSize="sm" w="65%">{moment(preview.completion_date).format('L')}</Text>
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