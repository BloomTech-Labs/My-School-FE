import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Flex, Text, Button, Image }from "@chakra-ui/core";

const OverviewCard = props => {

    const history = useHistory();
    const { id } = useParams();

    const handlePortfolioReturn = ()=>{
        history.push('/portfolio')
    }

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
            <Flex justifyContent='space-around' alignItems='center' w='60%' h='100%' m='10rem'>
                <Button backgroundColor={'#329795'} color='white' onClick={()=> handlePrevious(props.index)}>{`\u25C0`}</Button>
                <Flex justifyContent='center' flexDirection='column' borderWidth='1px' p='1rem' w='70%' textAlign='center' maxWidth='100%'>
                    <Text>{props.index + 1} of {props.arrLength}</Text>
                    <Text>{props.activity.name}{props.index}</Text>
                    <Flex justifyContent='space-evenly' p='.5rem' alignItems='center'>
                        {props.activity.photo === null ? null : <Image w='40' h='20%'src={props.activity.photo} p='.6rem' borderRadius='1rem'/> }
                        <Flex flexDirection='column' textAlign='left'>
                            <Text fontSize='1rem' fontWeight='bold'>Description:</Text>
                            <Text fontSize='.7rem' >{props.activity.description}</Text>
                        </Flex>
                    </Flex>
                    <Flex>
                        <Text>Needs to be syled better and we need to include subject, duration, creationdate and completion date</Text>
                    </Flex>
                    <Button backgroundColor={'#329795'} color='white' onClick={handlePortfolioReturn}>Back To Portfolio</Button>
                </Flex>
                <Button  backgroundColor={'#329795'} color='white' onClick={() => handleNext(props.index)}>{`\u25B6`}</Button> 
            </Flex>
        </>
        )}
        </>
    )
}
export default OverviewCard;