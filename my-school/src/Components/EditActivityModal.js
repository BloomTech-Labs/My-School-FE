import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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

const EditActivityModal = () => {
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
                >
                    <ModalOverlay opacity={styles.opacity} />
                    <ModalContent pb={5} {...styles} >
                        <ModalHeader>**Activity Name**</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* START MODAL BODY */}
                            {/* IMAGE PREVIEW */}
                            <Image /> 

                            {/* START FORM */}
                            <FormContext {...methods}>
                                <form> {/* need onSubmit */}
                                    {/* IMAGE UPLOAD */}

                                    {/* ACTIVITY NAME */}
                                    <FormControl>
                                        <FormLabel htmlFor="name">Title<span style={{color: "#e53e3e", margin: "4px"}}>*</span></FormLabel>
                                        <Input 
                                            type="text"
                                            id="name"
                                            name="name"
                                            ref={register} //VALIDATE TITLE
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
                                        />
                                    </FormControl>

                                    {/* DURATION: HOURS & MINUTES */}
                                    <Text fontWeight="500">Duration</Text>
                                    <Box>
                                        <Flex>
                                            {/* HOURS */}
                                            <FormControl>
                                                <FormLabel htmlFor="hours">Hours</FormLabel>
                                                <NumberInput w="120px" mr="32px">
                                                    <NumberInputField 
                                                        id="hours"
                                                        name="hours"
                                                        ref="register"
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
                                                <NumberInput max={59} w="120px">
                                                    <NumberInputField 
                                                        id="minutes"
                                                        name="minutes"
                                                        ref="register"
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
                                </form>
                            </FormContext>
                            {/* END FORM */}

                            {/* END MODAL BODY */}
                        </ModalBody>
                        <ModalFooter>
                            <Button>Save</Button>
                        </ModalFooter>
                    </ModalContent>

                </Modal>
            )}
        </SlideIn>
        </>
    )
}

export default EditActivityModal;