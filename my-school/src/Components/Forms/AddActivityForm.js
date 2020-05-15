import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Flex,
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
} from "@chakra-ui/core";
import { useForm } from 'react-hook-form';
import DateSelector from '../DateSelector';

const AddActivityForm = () => {
    const { handleSubmit, errors, register, formState } = useForm();

    // Gets subject values from db
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

    function onSubmit(data) {
        console.log(data)
    }

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
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title, Subject, Description, Duration, Submission Date, Upload Photo */}
            <Box w={1/2} px={20}>
                <FormControl  isRequired isInvalid={errors.name}>
                    <FormLabel htmlFor="name">Title</FormLabel>
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
                    <Select id="subject" placeholder="Select...">
                        {subjects.map(s => {
                            return (
                                <option value={s.id} key={s.id}>{s.name}</option>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea placeholder="Tell us all about what you did in this activity!" />
                </FormControl>

                <p style={{fontWeight: "bold"}}>How long did it take to complete this activity?</p>
                <Box borderWidth="1px" borderColor="#D4D4D4" rounded="4px" p="32px">
                    <p style={{fontWeight: "bold"}}>Duration</p>
                    <Flex>
                        <FormControl>
                            <FormLabel htmlFor="hours">Hours</FormLabel>
                            <NumberInput id="hours" defaultValue={0} w="120px" mr="32px">
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="minutes">Minutes</FormLabel>
                            <NumberInput id="minutes" defaultValue={0} max={59} w="120px">
                                <NumberInputField />
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
                    <DateSelector />
                    <Button type="submit" w="120px" isLoading={formState.isSubmitting}>Submit</Button>
                </Flex>

            </Box>
        </form>
    )
}

export default AddActivityForm;