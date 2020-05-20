import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { deleteActivity} from '../actions/actions-portfolio.js';
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
import '../App.css';

const DeleteEntryButton= (props) => {

    const toast = useToast();
    const [isOpenDialogue, setIsOpenDialogue] = useState();
    const onCloseDialogue = () => setIsOpenDialogue(false);
    const cancelRef = useRef();


    function deleteEntry(id, userId) {
        props.deleteActivity(id, userId)
    };

    return (
        <Button
            _hover={{
                bg: "white",
                color: " teal"
            }}
            _focus={{ boxShadow: "outline" }}
            lefticon="delete"
            variant="solid"
            variantColor="teal"
            onClick={() => {
                setIsOpenDialogue(true);
            }}
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
                    <Button variantColor="red" onClick={() => {
                        onCloseDialogue();
                        deleteEntry(props.activity.id, 3);
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
        isLoading: state.portfolioReducer.isLoading,
        error: state.portfolioReducer.error,
    };
};

export default connect(mapStateToProps, { deleteActivity })(DeleteEntryButton);