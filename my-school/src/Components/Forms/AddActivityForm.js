import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Flex,
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
} from "@chakra-ui/core";
// import { useForm } from 'react-hook-form';
import DateSelector from '../DateSelector';

const AddActivityForm = () => {
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


    return (
        <form>
        {/* Title, Subject, Description, Duration, Submission Date, Upload Photo */}
            <Box w={1/2} px={20}>
                <FormControl>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input 
                        type="text" 
                        id="title"
                        name="title" 
                        placeholder="What's the name of the activity you completed?" 
                    />

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

                <p>How long did it take to complete this activity?</p>
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
                <Flex align="flex-end" justify="space-between">
                    <DateSelector w="70%"/>
                    <Button type="submit" w="30%" ml="80px">Submit</Button>
                </Flex>

            </Box>
        </form>
    )
}

export default AddActivityForm;