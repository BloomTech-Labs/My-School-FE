import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { deleteActivity} from '../../../Redux/actions/actions-portfolio.js';
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useToast,
} from '@chakra-ui/core';

const DeleteEntryButton= ({ activity, deleteActivity, studentId }) => {
    const toast = useToast();
    const [isOpenDialogue, setIsOpenDialogue] = useState();
    const [hover, setHover] = useState(false)
    const onCloseDialogue = () => setIsOpenDialogue(false);
    const cancelRef = useRef();

    return (
        <Button
        _focus={{ boxShadow: "outline"}}
            onClick={() => {
                setIsOpenDialogue(true)}}

            variant={hover ? 'outline' : 'solid'}
            variantColor="red"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >

            Delete
        
        <AlertDialog
            isOpen={isOpenDialogue}
            leastDestructiveRef={cancelRef}
            onClose={onCloseDialogue}
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Entry
                </AlertDialogHeader>

                <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onCloseDialogue}>
                        Cancel
                    </Button>
                    <Button bg="#FF5656" color="white" onClick={() => {
                        onCloseDialogue();
                        deleteActivity(activity.id, studentId);
                        toast({
                            position: "top",
                            title: "Entry Deleted.",
                            description: "That entry is donesies.",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                        });
                    }}
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </Button>
    );
};
const mapStateToProps = (state) => {
    return {
        ...state
    };
};

export default connect(mapStateToProps, { deleteActivity })(DeleteEntryButton);