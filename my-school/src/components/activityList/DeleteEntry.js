import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { deleteActivity} from '../../redux/actions/portfolio-actions';
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

const DeleteEntry= ({ activity, deleteActivity, studentId }) => {
    const toast = useToast();
    const [isOpenDialogue, setIsOpenDialogue] = useState();
    const onCloseDialogue = () => setIsOpenDialogue(false);
    const cancelRef = useRef();

    return (
        <Button
            onClick={() => {
                setIsOpenDialogue(true)}}
                textTransform="uppercase"
                letterSpacing="1.2px"
                size="xs"
                mx="4px"
                variant="outline"
                variantColor="red"
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
                            description: "That entry has been deleted.",
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

export default connect(mapStateToProps, { deleteActivity })(DeleteEntry);
