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
    Text,
    useToast,
    FormErrorMessage
} from '@chakra-ui/core';
import { useForm, FormContext } from 'react-hook-form';
import PlaceholderImg from '../assets/placeholder_img.png';
import DateSelector from './DateSelector';

const EditActivityModal = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const toast = useToast();

    const methods = useForm();
    const { handleSubmit, errors, register, formState } = methods;

    const [image, setImage] = useState('');

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

    // Photo upload change handler
    const handleImageUpload = e => {
        setImage(e.target.files[0]);
    }

    // Submit handler
    function onSubmit(data) {
        // converts user's duration input into minutes
        const duration = Number(data.hours) * 60 + Number(data.minutes) || null; 
        // adds leading zero to day & month values to ensure completion_date is correct format
        const monthLeadingZero = data.month < 10 ? "0" + String(data.month) : String(data.month);
        const dayLeadingZero = data.day < 10 ? "0" + String(data.day) : String(data.day);
        // formats completion Date in YYYY-MM-DD format
        const completionDate = `${data.year}-${monthLeadingZero}-${dayLeadingZero}`;

        if (image) {
            // Updates activity without a new photo
            const formData = new FormData();
            formData.append('photo', image, image.name);
            formData.set('name', data.name);
            formData.set('description', data.description);
            formData.set('duration', duration);
            formData.set('subject_id', parseInt(data.subject));
            formData.set('completion_date', completionDate);

            props.editActivity(props.activity.id, formData, 3);
        } else {
            //Updates activity with a new photo
            const updatedActivity = {
                name: data.name,
                description: data.description,
                subject_id: parseInt(data.subject),
                duration: duration,
                completion_date: completionDate
            };

            props.editActivityWithoutPhoto(props.activity.id, updatedActivity, 3);
        }

        onClose();
        toast({
            title: "Success!",
            description: `${data.name} was updated successfully`,
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "top-right"
        })
    }

    // Form validation for title input
    function validateTitle(value) {
        let error;
        if (value.length === 0) {
            error = "A title is required";
        } else if (value.length < 3) {
            error = "Title must be at least 3 characters long";
        }
        return error || true;
    }

    return (
        <>
        <Button
            _hover={{
                bg: "white",
                color: "#FFBB00"
            }}
            _focus={{ boxShadow: "outline" }}
            lefticon="edit"
            variant="solid"
            bg="#FFBB00"
            color="white"
            ref={btnRef}
            onClick={onOpen}
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
                                            ref={register({ validate: validateTitle })} 
                                            defaultValue={props.activity.name}
                                        />
                                        <FormErrorMessage> 
                                            {errors.name && errors.name.message}
                                        </FormErrorMessage>
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

                                    {/* DATE COMPLETED / DateSelector */}
                                    <DateSelector 
                                        defaultMonth={defaultMonth}
                                        defaultDate={defaultDate}
                                        defaultYear={defaultYear}
                                    />

                                    {/* IMAGE UPLOAD */}
                                    <Text fontWeight="500">Image</Text>
                                    <Input 
                                        type="file"
                                        name="image"
                                        id="image"
                                        placeholder="Upload an image"
                                        onChange={handleImageUpload}
                                    />

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
                                isLoading={formState.isSubmitting}
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