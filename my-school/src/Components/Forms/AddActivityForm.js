import React from 'react';
import {
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
import DateSelector from '../DateSelector';

const AddActivityForm = () => {


    return (
        <form w={1/2}>
            {/* Title, Subject, Description, Duration, Submission Date, Upload Photo */}

            <FormControl>
                <FormLabel htmlFor="name">Title</FormLabel>
                <Input 
                    type="text" 
                    id="name" 
                    placeholder="What's the name of the activity you completed?" 
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <Select id="subject" placeholder="Select...">
                    <option value="math">Math</option>
                    <option value="art">Art</option>
                    <option value="language-arts">Language Arts</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea placeholder="Tell us all about what you did in this activity!" />
            </FormControl>

            <p>How long did it take to complete this activity?</p>
            <p>Duration</p>
            <FormControl>
                <FormLabel htmlFor="hours">Hours</FormLabel>
                <NumberInput id="hours" defaultValue={0}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="minutes">Minutes</FormLabel>
                <NumberInput id="minutes" defaultValue={0} max={59}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>

            <p>Confirm Submission Date</p>
            <DateSelector />

            <Button type="submit">Submit</Button>
        </form>
    )
}

export default AddActivityForm;