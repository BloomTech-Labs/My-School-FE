import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Flex,
    Text,
    FormErrorMessage,
    FormLabel,
    FormControl,
    FormHelperText,
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

const AddActivityForm = () => {
    const methods = useForm();
    const { handleSubmit, errors, register, formState } = methods;
    const toast = useToast();

    // Preview state...will get passed to Preview component
    const [preview, setPreview] = useState();
    console.log({preview})

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

    // Submit handler
    function onSubmit(data) {
        // console.log({data})
        // this adds leading zero to day & month values to ensure completion_date is correct format
        const monthLeadingZero = data.month < 10 ? "0" + String(data.month) : String(data.month);
        const dayLeadingZero = data.day < 10 ? "0" + String(data.day) : String(data.day);

        let activity = {
            // student id is currently hardcoded...change this later...
            student_id: 3,
            name: data.name,
            description: data.description || null,
            duration: Number(data.hours) * 60 + Number(data.minutes) || null, 
            subject_id: parseInt(data.subject) || 9,
            completion_date: `${data.year}-${monthLeadingZero}-${dayLeadingZero}`
        }

        console.log({activity})

        axios.post("https://my-school-v1.herokuapp.com/api/activities", activity)
            .then(res => {
                console.log(res)
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
        <Flex>
            <Box w={1/2} px={20}>
                <Text fontSize="lg" fontWeight="500" pb="37px">Add an Activity</Text>
                <FormControl isInvalid={errors.name}>
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

                <FormControl>
                    <FormLabel htmlFor="subject">Subject</FormLabel>
                    <FormHelperText>Note: Automatically sets subject to "Other" if nothing is selected.</FormHelperText>
                    <Select id="subject" name="subject" placeholder="Select..." ref={register} >
                        {subjects.map(s => {
                            return (
                                <option value={s.id} key={s.id}>{s.name}</option>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea id="description" name="description" placeholder="Tell us all about what you did in this activity!" ref={register} />
                </FormControl>

                <p style={{fontWeight: "bold"}}>How long did it take to complete this activity?</p>
                <Box borderWidth="1px" borderColor="#D4D4D4" rounded="4px" p="32px">
                    <p style={{fontWeight: "bold"}}>Duration</p>
                    <Flex>
                        <FormControl>
                            <FormLabel htmlFor="hours">Hours</FormLabel>
                            <NumberInput mr="20px" defaultValue={0}>
                                <NumberInputField id="hours" name="hours"  w="120px" ref={register} mr="0px" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl>
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

                <p style={{fontWeight: "bold"}}>Confirm Submission Date</p>
                <Flex align="flex-end" justify="space-between"  flexWrap="wrap">
                    <DateSelector onSubmit/>
                    <Button 
                        type="submit" 
                        w="120px" 
                        isLoading={formState.isSubmitting}
                        // isDisabled={!name ? true : false}
                    >Submit</Button>
                </Flex>

            </Box>
            <Box w={1/2} px={20}>
                <Text fontSize="lg" fontWeight="500" pb="61px">Upload an Activity Photo</Text>
                <Button>Choose File</Button>
            </Box>
            </Flex>
        </form>
        </FormContext>
        }
        </>
    )
}

export default AddActivityForm;