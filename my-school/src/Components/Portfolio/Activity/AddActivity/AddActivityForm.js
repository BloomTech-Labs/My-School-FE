import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactGA from 'react-ga';
import {
    SimpleGrid,
    Box,
    Flex,
    Text,
    Image,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Select,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    useToast
} from "@chakra-ui/core";
import { useForm, FormContext } from 'react-hook-form';
import DateSelector from '../DateSelector';
import NewActivityPreview from './NewActivityPreview';
import validateTitle from '../../../../utils/validateTitle'

const AddActivityForm = () => {
    React.useEffect(() => {
        ReactGA.event({ category: "App", action: "Adding activity" });
    }, [])

    const methods = useForm();
    const { handleSubmit, errors, register, formState } = methods;
    const toast = useToast();

    const [image, setImage] = useState({ preview: '', raw: ''});

    // Preview state...will get passed to Preview component
    const [preview, setPreview] = useState();

    // Gets subject value options from db
    const [subjects, setSubjects] = useState([]);
    useEffect(() => {
        let isMounted = true;
        axios.get("https://my-school-v1.herokuapp.com/api/subjects")
        .then(res => {
            if (isMounted) setSubjects(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        return () => {
            isMounted = false
        }
    }, [])

    // Photo upload change handler
    const handleImageUpload = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            })
        }
    }
    console.log({image})

    // Submit handler: 2 different endpoints based on whether or not user wants to include a photo
    function onSubmit(data) {
        // converts user's duration input into minutes
        const duration = Number(data.hours) * 60 + Number(data.minutes) || null;
        // adds leading zero to day & month values to ensure completion_date is correct format
        const monthLeadingZero = data.month < 10 ? "0" + String(data.month) : String(data.month);
        const dayLeadingZero = data.day < 10 ? "0" + String(data.day) : String(data.day);
        // formats completion Date in YYYY-MM-DD format
        const completionDate = `${data.year}-${monthLeadingZero}-${dayLeadingZero}`;

        if (image) {
            const formData = new FormData();
            formData.append('photo', image.raw, image.raw.name);
            formData.set('student_id', 3); //hardcoded...change later
            formData.set('name', data.name);
            formData.set('description', data.description || null);
            formData.set('duration', duration);
            formData.set('subject_id', parseInt(data.subject) || 9);
            formData.set('completion_date', completionDate);
            formData.set('activity_type_id', 4)

            axios.post("https://my-school-v1.herokuapp.com/api/activities/attachimg", formData)
            .then(res => {
                setPreview(res.data[0])
            })
            .catch(err => {
                console.log(err)
                toast({
                    title: "An error occurred.",
                    description: "Unable to log new activity.",
                    status: "error",
                    isClosable: true
                })
            })
        } else {
            let activity = {
                student_id: 3, //hardcoded...will need to change
                name: data.name,
                description: data.description || null,
                duration: duration, 
                subject_id: parseInt(data.subject) || 9,
                completion_date: completionDate,
                activity_type_id: 4
            }
            axios.post("https://my-school-v1.herokuapp.com/api/activities", activity)
            .then(res => {
                setPreview(res.data[0])
            })
            .catch(err => {
                console.log(err)
                toast({
                    title: "An error occurred.",
                    description: "Unable to log new activity.",
                    status: "error",
                    isClosable: true
                })
            })
        }
    }


    return (
        <Box mt="36px">
        { preview ? <NewActivityPreview preview={preview} /> 
        : 
        <FormContext {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} data-testid='form-submit'>
        {/* Title, Subject, Description, Duration, Submission Date, Upload Photo */}
        {/* <Flex wrap="wrap" m="32px auto"> */}
        <SimpleGrid columns={[1, 1, 1, 2]} spacing={["20px", "20px", "20px", "128px"]} mx={["8px", "20px", "32px", "100px"]}>
            <Box w={["100%, 100%, 100%, 50%"]} >
                <FormControl isInvalid={errors.name} mb="20px" fontFamily="'Nunito'">
                    <FormLabel htmlFor="name" fontWeight="bold">Title<Box as="span" color="warningred" m="4px">*</Box></FormLabel>
                    <Input 
                        type="text" 
                        id="name"
                        name="name" 
                        placeholder="What would you like to name your activity?" 
                        ref={register({ validate: validateTitle })}
                        borderColor="gray.400"
                        errorBorderColor="warningred"
                        focusBorderColor="myschoolblue"
                        data-testid='name'
                    />
                    <FormErrorMessage color="warningred">
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl my="20px" fontFamily="'Nunito'">

                    <FormLabel htmlFor="subject" fontWeight="bold" data-testid='subjects-label'>Subject</FormLabel>
                    <Select 
                        id="subject" 
                        name="subject" 
                        placeholder="Select..." 
                        ref={register} 
                        borderColor="gray.400"
                        focusBorderColor="myschoolblue"
                        data-testid='subjects'
                    >
                        {subjects.map(s => {
                            return (
                                <option value={s.id} key={s.id}>{s.name}</option>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl my="20px" fontFamily="'Nunito'">
                    <FormLabel htmlFor="description" fontWeight="bold">Description</FormLabel>
                    <Textarea 
                        id="description" 
                        name="description" 
                        placeholder="Tell us all about what you did in this activity!" 
                        ref={register} 
                        borderColor="gray.400"
                        focusBorderColor="myschoolblue"
                        data-testid='description'
                    />
                </FormControl>

                <Text fontWeight="bold">How long did it take to complete this activity?</Text>
                <Box borderWidth="1px" borderColor="gray.400" rounded="4px" py="32px" pl="32px" m="8px 0 16px">
                    <Text fontWeight="bold">Duration</Text>
                    <Flex>
                        <FormControl mt="8px" fontFamily="'Nunito'">
                            <FormLabel htmlFor="hours" textTransform="uppercase" fontSize="0.625rem" color="gray.700" data-testid='hours'>Hours</FormLabel>
                            <NumberInput mr="20px" min={0} defaultValue={0} >
                                <NumberInputField 
                                    id="hours" 
                                    name="hours"  
                                    w="72px"  
                                    mr="0px" 
                                    borderColor="gray.400"
                                    errorBorderColor="warningred" 
                                    focusBorderColor="myschoolblue" 
                                    ref={register}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl mt="8px" fontFamily="'Nunito'">
                            <FormLabel htmlFor="minutes" textTransform="uppercase" fontSize="0.625rem" color="gray.700">Minutes</FormLabel>
                            <NumberInput max={59} min={0} defaultValue={0} data-testid='minutes>
                                <NumberInputField 
                                    id="minutes" 
                                    name="minutes"   
                                    w="72px"  
                                    borderColor="gray.400"
                                    errorBorderColor="warningred" 
                                    focusBorderColor="myschoolblue" 
                                    ref={register}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </Flex>
                </Box>
            </Box>
            <Box w={["100%, 100%, 100%, 50%"]}>
                        <Text fontSize="lg" fontWeight="700" pb="24px">Upload Activity Photo</Text>
                        <FormLabel htmlFor="image" style={{ cursor: "pointer"}}>
                            <Flex align="center" mb="12px">
                                <Box bg="gray.600" p="8px 16px" borderRadius="4px" color="white" fontSize="lg" mr="8px">Choose File</Box>
                                <Text fontSize="lg" color="gray.700">
                                    {image.raw ? `${image.raw.name}` : `No file selected`}
                                </Text>
                            </Flex>
                        </FormLabel>
                        <Input 
                            type="file" 
                            name="image" 
                            id="image"
                            placeholder="Upload an image"
                            onChange={handleImageUpload}
                            fontFamily="'Nunito'"
                            style={{ display: "none", cursor: "pointer" }}
                            data-testid='image'
                        />
                        <Box h="280px" border="1px" borderRadius="8px" borderColor="gray.400" p="24px" w="100%">
                            <Text fontSize="sm" color="gray.600" pb="22px">Attached photo:</Text>
                            {image.preview ? 
                                <Image 
                                src={image.preview} 
                                alt="preview of image selected to upload" 
                                maxHeight="200px" 
                                pb="22px"/> 
                            : null}
                        </Box>

                        <Text fontWeight="bold" mt="20px">Confirm Submission Date</Text>
                        <Flex align="flex-end" justify="space-between"  flexWrap="wrap" my="8px">
                            <DateSelector onSubmit/>
                            <Button 
                                type="submit" 
                                p="8px 16px"
                                mt="16px"
                                isLoading={formState.isSubmitting}
                                color="white"
                                bg="green.500"
                                _hover={{ bg: "green.600" }}
                                borderRadius="4px"
                                fontSize="1.125rem"
                                // isDisabled={!name ? true : false}
                                data-testid='submit'
                            >Submit</Button>
                        </Flex>
              </Box>
            {/* </Flex> */}
            </SimpleGrid>
        </form>
        </FormContext>
        }
        </Box>
    )
}

export default AddActivityForm;