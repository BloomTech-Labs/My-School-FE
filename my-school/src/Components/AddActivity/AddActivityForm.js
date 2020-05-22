import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Flex,
    Text,
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

const AddActivityForm = ({activities, setActivities}) => {
    const methods = useForm();
    const { handleSubmit, errors, register, formState } = methods;
    const toast = useToast();

    const [image, setImage] = useState('');

    // Preview state...will get passed to Preview component
    const [preview, setPreview] = useState();

    // Gets subject value options from db
    const [subjects, setSubjects] = useState([]);
    useEffect(() => {
        axios.get("https://my-school-v1.herokuapp.com/api/subjects")
        .then(res => {
            setSubjects(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    // Photo upload change handler
    const handleImageUpload = e => {
        setImage(e.target.files[0])
    }

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
            formData.append('photo', image, image.name);
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
                setActivities([res.data[0], ...activities])
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
                setActivities([res.data[0], ...activities])
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

    // Form validation for title input
    function validateTitle(value) {
        let error;
        if (value.length === 0) {
            error = "A title is required";
        } else if (value.length < 3)  {
            error = "Title must be at least 3 characters long";
        }
        return error || true;
    }

    return (
        <>
        { preview ? <NewActivityPreview preview={preview} /> 
        : 
        <FormContext {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title, Subject, Description, Duration, Submission Date, Upload Photo */}
        <Flex px={20}>
            <Box w={1/2} px={16} pb={32}>
                <Text fontSize="lg" fontWeight="500" pt="16px" pb="36px">Add an Activity</Text>
                <FormControl isInvalid={errors.name} mb="20px">
                    <FormLabel htmlFor="name">Title<span style={{color: "#e53e3e", margin: "4px"}}>*</span></FormLabel>
                    <Input 
                        type="text" 
                        id="name"
                        name="name" 
                        placeholder="What's the name of the activity you completed?" 
                        ref={register({ validate: validateTitle })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl my="20px">
                    <FormLabel htmlFor="subject">Subject</FormLabel>
                    <Select id="subject" name="subject" placeholder="Select..." ref={register} >
                        {subjects.map(s => {
                            return (
                                <option value={s.id} key={s.id}>{s.name}</option>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl my="20px">
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea id="description" name="description" placeholder="Tell us all about what you did in this activity!" ref={register} />
                </FormControl>

                <p style={{fontWeight: "bold"}}>How long did it take to complete this activity?</p>
                <Box borderWidth="1px" borderColor="#D4D4D4" rounded="4px" p="32px" m="8px 0 16px">
                    <p style={{fontWeight: "bold"}}>Duration</p>
                    <Flex>
                        <FormControl mt="8px">
                            <FormLabel htmlFor="hours">Hours</FormLabel>
                            <NumberInput mr="20px" defaultValue={0}>
                                <NumberInputField id="hours" name="hours"  w="120px" ref={register} mr="0px" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl mt="8px">
                            <FormLabel htmlFor="minutes">Minutes</FormLabel>
                            <NumberInput max={59}defaultValue={0}>
                                <NumberInputField id="minutes" name="minutes"   w="120px" ref={register} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </Flex>
                </Box>

                <p style={{fontWeight: "bold"}} mt="20px">Confirm Submission Date</p>
                <Flex align="flex-end" justify="space-between"  flexWrap="wrap" my="8px">
                    <DateSelector onSubmit/>
                    <Button 
                        type="submit" 
                        w="120px" 
                        mt="16px"
                        isLoading={formState.isSubmitting}
                        // isDisabled={!name ? true : false}
                    >Submit</Button>
                </Flex>

            </Box>
            <Box w={1/2} px={16}>
                <Text fontSize="lg" fontWeight="500" pt="16px" pb="36px">Upload an Activity Photo</Text>
                <Button>Choose File</Button>
                <Input 
                    type="file" 
                    name="image" 
                    id="image"
                    placeholder="Upload an image"
                    onChange={handleImageUpload}
                />
            </Box>
            </Flex>
        </form>
        </FormContext>
        }
        </>
    )
}

export default AddActivityForm;