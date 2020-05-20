import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { editActivity, editActivityWithoutPhoto } from '../actions/actions-portfolio.js';
import DeleteEntryButton from './DeleteEntryButton';
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
    Tag,
    FormControl,
    FormLabel,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
    Flex
} from '@chakra-ui/core';
import '../App.css';
import DateSelector from './DateSelector.js'

function ActivityCard(props)  {
    const [input, setInput]= useState({});
    const [hour, setHour] = useState();
    const [min, setMin] = useState();
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [selectedFile, setSelectedFile] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();


    useEffect(() => {
        if (props.activity.duration !== null) {
            const hours = Math.floor(props.activity.duration / 60);
            const minutes = props.activity.duration % 60;
            setHour(hours)
            setMin(minutes)
        } else {
            setHour(0)
            setMin(0)
        }
    }, [props.activity.duration])

    useEffect(() => {
        const dateVar = props.activity.created_at;
        const str = dateVar.toString();
        const stringDate = str.split('');
        const newArr = [stringDate[5], stringDate[6], stringDate[8], stringDate[9], stringDate[0], stringDate[1], stringDate[2], stringDate[3]]
        const monthArr = [newArr[0], newArr[1]]
        const month = monthArr.join('');
        getMonth(month);
        const yearArr = [newArr[4], newArr[5], newArr[6], newArr[7]];
        const yearDisplayed = yearArr.join('');
        setYear(yearDisplayed)
        const dateArr = [newArr[2], newArr[3]]
        const dayDisplayed = dateArr.join('')
        setDay(dayDisplayed)
    }, [props.activity.created_at])

    function getMonth(month) {
        if (month === '1') {
            return setMonth("JANUARY")
        }
        if (month === '02') {
            return setMonth("FEBURARY")
        }
        if (month === '03') {
            return setMonth("MARCH")
        }
        if (month === '04') {
            return setMonth("APRIL")
        }
        if (month === `05`) {
            return setMonth("MAY")
        }
        if (month === '06') {
            return setMonth("JUNE")
        }
        if (month === '07') {
            return setMonth("JULY")
        }
        if (month === '08') {
            return setMonth("AUGUST")
        }
        if (month === '09') {
            return setMonth("SEPTEMBER")
        }
        if (month === '10') {
            return setMonth("OCTOBER")
        }
        if (month === '11') {
            return setMonth("NOVEMBER")
        }
        else {
            return setMonth("DECEMBER")
        }
    }

    function editEntry(id) {
        const durationInMinutes = input.hours * 60 + input.minutes
        if (selectedFile !== null) {
            const formData = new FormData();
            formData.append('photo', selectedFile, selectedFile.name);
            formData.set('name', input.name);
            formData.set('description', input.description);
            formData.set('duration', durationInMinutes);
            props.editActivity(id, formData, 3);
        } else {
            const changes = {
                name: input.name,
                description: input.description,
                duration: durationInMinutes
            }
            props.editActivityWithoutPhoto(id, changes, 3)
        }
    }

    const handleInput = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handlePhoto = e => {
        setSelectedFile(e.target.files[0])
    }

    const handleDuration = () => {
        if (props.activity.duration !== null) {
            setInput({
                ...props.activity,
                description: props.activity.description === null ? '' : props.activity.description,
                hours: hour,
                minutes: min
            })
            onOpen()
        } else {
            setInput({
                ...props.activity,
                description: props.activity.description === null ? '' : props.activity.description,
                duration: [0, 0]
            })
            onOpen()
        }
    }

    const handleHours = value => {
        setInput({
            ...input,
            hours: value
        })
    }

    const handleMins = value => {
        setInput({
            ...input,
            minutes: value
        })
    }

    return (
        <div className='activity-card'>
            <p>{props.activity.name}</p>
            <p>{hour}hrs {min}m</p>
            <Tag variantColor="red" rounded="full">{props.activity.subject}</Tag>
            <p>{month} {day}, {year}</p>
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
                onClick={handleDuration}
            >Edit</Button>

            <SlideIn in={isOpen}>
                {styles => (
                    <Modal
                        onClose={onClose}
                        finalFocusRef={btnRef}
                        isOpen={true}
                        scrollBehavior="inside"
                    >
                        <ModalOverlay opacity={styles.opacity} />
                        <ModalContent pb={5} {...styles}>
                            <ModalHeader>{props.activity.name}</ModalHeader>
                            <div className='containerForPhoto'>
                                <img className='image' src={props.activity.photo} alt={`activity with the name of ${props.activity.name}`} />
                                <FormControl ml='-1rem'>
                                    <FormLabel htmlFor={`photo${props.activity.id}`} />
                                    <Input id={`photo${props.activity.id}`} name="photo" type='file' onChange={handlePhoto} w='400px' />
                                </FormControl>
                            </div>
                            <FormControl className='container'>
                                <FormLabel htmlFor='name' >
                                    <p style={{ fontWeight: "bold", width: '100%', paddingTop: '.5rem' }}>Name:</p>
                                    <Input id="name" name="name" type='text' value={input.name} onChange={handleInput} w='400px' />
                                </FormLabel>
                                <FormLabel htmlFor='description'>
                                    <p style={{ fontWeight: "bold", width: '100%', paddingTop: '1rem' }}>Description:</p>
                                    <Textarea id="description" name="description" type='text' value={input.description} onChange={handleInput} w='400px' h='150px' />
                                </FormLabel>
                            </FormControl>
                            <Box p='1rem' w='400px'>
                                <p style={{ fontWeight: "bold", marginTop: '-1.7rem' }}>Duration:</p>
                                <Flex borderWidth="1px" rounded="lg" w='300px' padding='1rem 11rem' w='400px' justifyContent='center' >
                                    <FormControl handeChange={handleInput} >
                                        <FormLabel htmlFor="hours">Hours</FormLabel>
                                        <NumberInput id="hours" defaultValue={input.hours} w="120px" mr="32px" onChange={handleHours}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="minutes">Minutes</FormLabel>
                                        <NumberInput id="minutes" defaultValue={input.minutes} max={59} w="120px" onChange={handleMins}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                </Flex>
                                <h3 style={{ fontWeight: "bold", width: '100%', paddingTop: '1rem', paddingBottom: '.5rem' }}>Date Completed:</h3>
                                <Flex flexWrap='wrap' borderWidth="1px" rounded="lg" w='300px' padding='1rem' w='400px' justifyContent='center' >
                                    <div><DateSelector w="100%" /></div>
                                </Flex>
                            </Box>
                            <ModalCloseButton />
                            <ModalBody>
                                {props.entry}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    marginTop='-.8rem'
                                    variant="solid"
                                    variantColor="teal"
                                    _hover={{
                                        bg: "white",
                                        color: " teal"
                                    }}
                                    _focus={{ boxShadow: "outline" }}
                                    onClick={() => {
                                        editEntry(input.id);
                                        onClose()
                                    }}
                                >Save</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </SlideIn>
            <DeleteEntryButton user={props.user} activity={props.activity}/>                                       
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.portfolioReducer.isLoading,
        error: state.portfolioReducer.error,
    };
};

export default connect(mapStateToProps, { editActivity, editActivityWithoutPhoto })(ActivityCard);