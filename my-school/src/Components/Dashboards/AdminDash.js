import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFamilyByID, deleteStudent, getFamilyName } from '../../actions/actions-users';
import StudentCard from './StudentCard';
import ReactGA from "react-ga";
import Loader from "react-spinners/ClimbingBoxLoader";
import { Box,
        Button, 
        AlertDialog,
        AlertDialogBody,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogContent,
        AlertDialogOverlay,
        useToast, } from '@chakra-ui/core';

const AdminDash = ({ user, isLoading, getFamilyByID, deleteStudent}) => {
     
      const toast = useToast();
      const [isOpenDialogue, setIsOpenDialogue] = useState();
      const onCloseDialogue = () => setIsOpenDialogue(false);
      const cancelRef = useRef();
      const history = useHistory();
    
      const [ family, setFamily ] = useState([]);

      useEffect( _ => {
        ReactGA.initialize("UA-156199574-5")
        ReactGA.pageview("/dashboard")
      },[])

      useEffect(() => {
        getFamilyByID(user.family_id);
        getFamilyName(user.family_id);
      }, [user]);


      const addStudent = () => {
        history.push('/addstudent')
      };

      function handleDelete(student_id){
        deleteStudent(student_id);
      };
      

      if(family.length > 0){
        return(
        <div className='student-list'> */}
          {isLoading === true ? <Loader color={'#329795'} /> : 
          (family.map(student =>{
          return(<StudentCard 
          key={student.id} 
          student={student} 
          family={family} 
          className='card' />)}))} 
        </div>
        );
      } else {
    return(
      <div>
        <Box as={Button} onClick={addStudent}> + Add new student</Box>
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
        </div>
    )}
};

const mapStateToProps = (state) => {
  return {
    family: state.usersReducer.family,
    isLoading: state.usersReducer.isLoading,
    error: state.usersReducer.error,
  };
};

export default connect(mapStateToProps , { getFamilyByID, deleteStudent })(AdminDash);
