import React, { useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { deleteStudent} from '../../actions/actions-users';
import fontN from "../../assets/Nunito_Sans/Nunito Sans Regular.ttf";
import {  Image,
          Grid,
          Box,
          Heading,
          Button, 
          AlertDialog,
          AlertDialogBody,
          AlertDialogFooter,
          AlertDialogHeader,
          AlertDialogContent,
          AlertDialogOverlay,
          useToast, } from '@chakra-ui/core';


function StudentCard({student, family}) {
  
  const toast = useToast();
  const [isOpenDialogue, setIsOpenDialogue] = useState();
  const onCloseDialogue = () => setIsOpenDialogue(false);
  const cancelRef = useRef();
  const history = useHistory();
 

  const pushToPortfolio = (id) => {
    history.push(`/portfolio/${id}`);
  };
 
  function handleDelete(student_id){
    deleteStudent(student_id);
  };


  return (
      <Box>
      <Heading>{student.familyName}</Heading>
    <Grid
      templateColumns=".75fr .25fr 1fr .5fr .25fr .25fr"
      alignItems='left'
      className="student-cards"
      fontFamily= {fontN}
    >
      <Box>
          <Box onClick={() => pushToPortfolio(student.id)} width="100%" fontSize='1.2rem' fontWeight='500' className='card'>
              <Image src='' />
          <Heading>{student.name}'s Portfolio </Heading>
          <p>{student.name}</p>
          </Box>

          <Box textAlign="left">
              LAST ACTIVITY:
              Submitted_date SUBMITTED submitted_title
          </Box>
          <Button
            _hover={{
                bg: "white",
                color: "#FB6542"
            }}
            _focus={{ boxShadow: "outline" }}
            iconLeft="delete"
            variant="solid"
            bg="#FB6542"
            color= "white"
            onClick={() => {
                setIsOpenDialogue(true);
            }}
        >
        <AlertDialog
            isOpen={isOpenDialogue}
            leastDestructiveRef={cancelRef}
            onClose={onCloseDialogue}
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Portfolio
                </AlertDialogHeader>

                <AlertDialogBody>
                    You're deleting an entire portfolio and student account -- permanently.
                    Are you quite certain?
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onCloseDialogue}>
                        Cancel
                    </Button>
                    <Button bg="#FF5656" color="white" onClick={() => {
                        onCloseDialogue();
                        handleDelete();
                        toast({
                            position: "top",
                            title: "Student Deleted.",
                            description: "That portfolio is donesies.",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                        });
                    }}
                    >
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </Button>
      </Box>)
    </Grid>
    </Box>
  );
}

export default StudentCard;
