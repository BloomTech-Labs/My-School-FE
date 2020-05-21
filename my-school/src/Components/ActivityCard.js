import React, { useState, useEffect } from 'react';
import moment from 'moment';
// components
import DeleteEntryButton from './DeleteEntryButton';
import EditActivityModal from './EditActivityModal';
// styling
import { Tag } from '@chakra-ui/core';
import '../App.css';

function ActivityCard(props)  {
    const [hour, setHour] = useState();
    const [min, setMin] = useState();

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

    return (
        <div className='activity-card'>
            <p>{props.activity.name}</p>
            <p>{hour}hrs {min}m</p>
            <Tag variantColor="red" rounded="full">{props.activity.subject}</Tag>
            <p>{moment(props.activity.completion_date).format('ll').toUpperCase()}</p>
            <EditActivityModal 
                activity={props.activity}
                defaultHour={hour}
                defaultMin={min}
            />
            <DeleteEntryButton user={props.user} activity={props.activity}/>                                       
        </div>
    )
}

export default ActivityCard;