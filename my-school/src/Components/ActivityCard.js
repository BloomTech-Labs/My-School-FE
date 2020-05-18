import React from 'react';
import { 
    Button,
    useDisclosure,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    SlideIn,
    Tag
} from '@chakra-ui/core';
import axios from 'axios';

export default function ActivityCard(props)  {


    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const toast = useToast();

    function editEntry(){
    axios.put(this) //how do i do this again???????????????????????
    }

    function deleteEntry(){
        axios.delete(this);
    };

    return (
       <div className='activity-card'>
           {/* SUBJECT ICON OR OTHER GRAPHIC? IMAGES FROM DATABASE? */}
            <p>Title: {props.entry.title}</p>
            <p>Date: {props.entry.submission_date}</p>
            <Tag variantColor="red" rounded="full">{props.entry.subject}</Tag>
            
            <Button   
                _hover={{ bg: "white", 
                    color: " teal" }}
                _focus={{ boxShadow: "outline" }}
                lefticon="edit" 
                variant="solid" 
                variantColor="teal" 
                ref={btnRef} 
                onClick={onOpen}
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
                    <ModalHeader>{props.entry.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {props.entry}
                    </ModalBody>
                    <ModalFooter>
                        <Button  
                            variant="solid" 
                            variantColor="teal" 
                            _hover={{ bg: "white", 
                                color: " teal" }}
                            _focus={{ boxShadow: "outline" }}
                            onClick={editEntry}
                            >Save</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
                )}
            </SlideIn>


                <Button  
                    _hover={{ bg: "white", 
                        color: " teal" }}
                    _focus={{ boxShadow: "outline" }}
                    lefticon="delete" 
                    variant="solid" 
                    variantColor="teal" 
                    onClick={() => {
                        deleteEntry();
                        toast({
                        position: "top",
                        title: "Entry Deleted.",
                        description: "That entry is donesies.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        })
                    }}
                >Delete</Button>
        </div>
    )
  }
