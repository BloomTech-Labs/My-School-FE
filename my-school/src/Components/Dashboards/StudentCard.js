import React, { useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent} from '../../actions/actions-users';
import { getAllActivitiesForUser } from '../../actions/actions-portfolio';
import fontN from "../../assets/Nunito_Sans/Nunito Sans Regular.ttf";
import {  Avatar,
          Box,
          Text,
          Button, 
          IconButton,
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
    localStorage.setItem('student_id', id);
    history.push(`/portfolio/${id}`);
  };
 
  function handleDelete(student_id){
    deleteStudent(student_id);
  };


  return (
    <Box>
        <Box width="100%" fontSize='1.2rem' fontWeight='500' className='card'>
            <Avatar size='xl' src={student.profile_picture} />
        <Text fontSize='2xl'>{student.name}'s Portfolio </Text>
        <Text fontSize='lg'>{student.username}</Text>
        </Box>
        <Box textAlign="left">
           <Text>LAST ACTIVITY: submitted_title</Text>
           
            <Text>SUBMITTED:  Submitted_date </Text>
        </Box>
        <Button onClick={() => pushToPortfolio(student.id)}>View Portfolio</Button>
        <IconButton
          _hover={{
              bg: "white",
              color: "#FB6542"
          }}
          _focus={{ boxShadow: "outline" }}
          icon="delete"
          aria-label="Delete Portfolio"
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
      </IconButton>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities
  }
}

export default connect(mapStateToProps, {getAllActivitiesForUser})(StudentCard)

