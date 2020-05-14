import React from 'react';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Select,
    Textarea,
    Button,
  } from "@chakra-ui/core";

const AddActivityForm = () => {
    return (
        <form>
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

            

        </form>
    )
}

export default AddActivityForm;