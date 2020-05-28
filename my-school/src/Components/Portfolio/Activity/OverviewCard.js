import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Text, Button, Image }from "@chakra-ui/core";
import PlaceholderImg from '../../../assets/placeholder_img.png';
import moment from 'moment'

const OverviewCard = props => {

    const { id } = useParams();
    const [ hours ,setHours ] = useState();
    const [ mins, setMins ] = useState();

    useEffect(() =>{
        setHours(Math.floor(props.activity.duration / 60))
        setMins(props.activity.duration % 60)
    }, [ hours, mins, props.activity.duration ])

    const handlePrevious = index => {
        props.puller(index)
    }
    
    const handleNext = index => {
        props.pusher(index)
    }

    return (
        <>
        {props.activity.id === Number(id) && (
        <>
            <Flex flexWrap='wrap' justifyContent='space-around'  h='70vh' p='1rem'>
                <Flex flexDirection='column' w='20vw' textAlign='left' alignItems='flex-end' p='3rem'>
                    <Flex flexDirection='column' lineHeight='2.5rem'>
                        <Image w='300px' h='200px' src={props.activity.photo} borderRadius='2rem' fallbackSrc={PlaceholderImg}/>
                        <Text paddingTop='1rem' >Subject: {props.activity.subject}</Text>
                        <Text>Duration: {hours}hr {mins}m</Text>
                        <Text>Created: {moment(props.activity.created_at).format('ll').toUpperCase()}</Text>
                        <Text>Submitted: {moment(props.activity.completion_date).format('ll').toUpperCase()}</Text>
                    </Flex>
                </Flex>
                <Flex flexDirection='column' w='65vw' p='4rem' paddingTop='5.5rem' lineHeight='2rem'>
                    <h2 style={{ fontWeight:'bold'}}>{props.activity.name}</h2>
                    <Text paddingTop='1rem'>Description:</Text>
                    <Text paddingTop='.5rem'>{props.activity.description}</Text>
                </Flex>
            </Flex>
            <Flex w='100%' justifyContent='center' alignItems='baseline' flexWrap='wrap' p='1rem'>
                <Button backgroundColor={'#329795'} color='white' onClick={()=> handlePrevious(props.index)}>{`\u25C0`}</Button>
                <Text paddingLeft='.5rem' paddingRight='.5rem'>{props.index + 1} of {props.arrLength}</Text>
                <Button  backgroundColor={'#329795'} color='white' onClick={() => handleNext(props.index)}>{`\u25B6`}</Button> 
            </Flex>
        </>
        )}
        </>
    )
}
export default OverviewCard;