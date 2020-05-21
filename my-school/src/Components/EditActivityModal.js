import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { editActivity, editActivityWithoutPhoto } from '../actions/actions-portfolio.js';
import {
    Button,
    Input,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    SlideIn,
    FormControl,
    FormLabel,
    Select,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
    Flex,
    Image,
    Text
} from '@chakra-ui/core';
import { useForm, FormContext } from 'react-hook-form';
import PlaceholderImg from '../Assets/placeholder_img.png';
import DateSelector from './DateSelector';

const EditActivityModal = (props) => {
    // console.log("These are the edit activity modal's props:", props)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const methods = useForm();
    const { handleSubmit, errors, register, formState } = methods;

    // Subject value options
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

    // Date values to pass to DateSelector to autopopulate w/activity's submission date
    const defaultMonth = moment(props.activity.completion_date).month() + 1;
    const defaultDate = moment(props.activity.completion_date).date();
    const defaultYear = moment(props.activity.completion_date).year();

    // Submit handler
    function onSubmit(data) {
        console.log("Hello!!! This button works", data)
        const duration = Number(data.hours) * 60 + Number(data.minutes) || null; 

        const updatedActivity = {
            name: data.name,
            description: data.description,
            subject_id: parseInt(data.subject),
            duration: duration,
            // completion_date: "2020-04-30"
        };
        console.log(updatedActivity)
        props.editActivityWithoutPhoto(props.activity.id, updatedActivity, 3);
        onClose();
    }

    return (
        <>
        <Button
            _hover={{
                bg: "white",
                color: " teal"
            }}
            _focus={{ boxShadow: "outline" }}
            lefticon="edit"
            variant="solid"
            variantColor="teal"
            ref={btnRef}
            onClick={onOpen} //may need to handle filling in form values here (see handleDuration in ActivityCard)
        >
            Edit
        </Button>

        <SlideIn in={isOpen}>
            {styles => (
                <Modal
                    closeOnOverlayClick={false}
                    onClose={onClose}
                    finalFocusRef={btnRef}
                    isOpen={true}
                    scrollBehavior="inside"
                    size="xl"
                >
                    <ModalOverlay opacity={styles.opacity} />
                    <ModalContent pb={5} {...styles} >
                        <ModalHeader>Edit Activity</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* START MODAL BODY */}
                            {/* START FORM */}
                            <FormContext {...methods}>
                                <form onSubmit={handleSubmit(onSubmit)}> 
                                    {/* ACTIVITY NAME */}
                                    <FormControl>
                                        <FormLabel htmlFor="name">Title<span style={{color: "#e53e3e", margin: "4px"}}>*</span></FormLabel>
                                        <Input 
                                            type="text"
                                            id="name"
                                            name="name"
                                            ref={register} //VALIDATE TITLE
                                            defaultValue={props.activity.name}
                                        />
                                        {/* ADD ERROR MESSAGE BASED ON NAME VALIDATION */}
                                    </FormControl>

                                    {/* ACTIVITY SUBJECT */}
                                    <FormControl>
                                        <FormLabel htmlFor="subject">Subject</FormLabel>
                                        <Select
                                            id="subject"
                                            name="subject"
                                            ref={register}
                                            defaultValue={props.activity.subject_id}
                                        >
                                            {subjects.map(s => {
                                                return (
                                                    <option value={s.id} key={s.id}>{s.name}</option>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>

                                    {/* ACTIVITY DESCRIPTION */}
                                    <FormControl>
                                        <FormLabel htmlFor="description">Description</FormLabel>
                                        <Textarea 
                                            id="description"
                                            name="description"
                                            ref={register}
                                            defaultValue={props.activity.description}
                                        />
                                    </FormControl>

                                    {/* DURATION: HOURS & MINUTES */}
                                    <Text fontWeight="500">Duration</Text>
                                    <Box>
                                        <Flex>
                                            {/* HOURS */}
                                            <FormControl>
                                                <FormLabel htmlFor="hours">Hours</FormLabel>
                                                <NumberInput defaultValue={props.defaultHour} w="120px" mr="32px">
                                                    <NumberInputField 
                                                        id="hours"
                                                        name="hours"
                                                        ref={register}
                                                    />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </FormControl>

                                            {/* MINUTES */}
                                            <FormControl>
                                                <FormLabel htmlFor="minutes">Minutes</FormLabel>
                                                <NumberInput defaultValue={props.defaultMin} max={59} w="120px">
                                                    <NumberInputField 
                                                        id="minutes"
                                                        name="minutes"
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

                                    {/* DATE COMPLETED --> DateSelector component here */}
                                    <DateSelector 
                                        defaultMonth={defaultMonth}
                                        defaultDate={defaultDate}
                                        defaultYear={defaultYear}
                                    />

                                    {/* IMAGE UPLOAD */}
                                    <Text fontWeight="500">Image</Text>

                                    {/* IMAGE PREVIEW */}
                                    <Image src={props.activity.photo} alt={props.activity.name} fallbackSrc={PlaceholderImg} maxHeight="250px" mx="auto" />


                                </form>
                            </FormContext>
                            {/* END FORM */}

                            {/* END MODAL BODY */}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                // isLoading={formState.isSubmitting}
                            >
                                Save
                            </Button>
                        </ModalFooter>
                    </ModalContent>

                </Modal>
            )}
        </SlideIn>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.portfolioReducer.isLoading,
        error: state.portfolioReducer.error,
    };
};

export default connect(mapStateToProps, { editActivity, editActivityWithoutPhoto })(EditActivityModal);