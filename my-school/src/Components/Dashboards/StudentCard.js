import React from "react";
import { Flex, Image, IconButton, Heading, Text } from "@chakra-ui/core";
import placeholder from "../../assets/placeholder_img.png";
import {connect} from 'react-redux';
import {getAllActivitiesForUser} from '../../Redux/actions/actions-portfolio'
import moment from 'moment';
import {useHistory} from 'react-router-dom'

const StudentCard = ({ student, familyName, activities }) => {
  const history = useHistory()
  // const toast = useToast();
  // const [isOpenDialogue, setIsOpenDialogue] = useState();
  // const onCloseDialogue = () => setIsOpenDialogue(false);
  // const cancelRef = useRef();

  const lastActivity = activities.sort((a, b) => b.created_at - a.created_at)

  const pushToPortfolio = (id) => {
    localStorage.setItem('student_id', id);
    history.push(`/portfolio/${id}`);
  };
 
  function handleDelete(student_id){
    deleteStudent(student_id);
  };


  return (
    // <Box className='card' border='solid 1px lightgray' borderRadius='16px' padding='5px'>
    //     <Box width="100%" fontSize='1.2rem' fontWeight='500' >
    //         <Avatar size='xl' src={student.profile_picture} />
    //     <Text fontSize='2xl'>{student.name}'s Portfolio </Text>
    //     <Text fontSize='lg'>{student.username}</Text>
    //     </Box>
    //     <Box textAlign="left">
    //        <Text>LAST ACTIVITY: submitted_title</Text>
           
    //         <Text>SUBMITTED:  Submitted_date </Text>
    //     </Box>

      //   <IconButton
      //     _hover={{
      //         bg: "white",
      //         color: "#FB6542"
      //     }}
      //     _focus={{ boxShadow: "outline" }}
      //     icon="delete"
      //     aria-label="Delete Portfolio"
      //     variant="solid"
      //     bg="#FB6542"
      //     color= "white"
      //     onClick={() => {
      //         setIsOpenDialogue(true);
      //     }}
      // >
      // <AlertDialog
      //     isOpen={isOpenDialogue}
      //     leastDestructiveRef={cancelRef}
      //     onClose={onCloseDialogue}
    //   >
    //       <AlertDialogOverlay />
    //       <AlertDialogContent>
    //           <AlertDialogHeader fontSize="lg" fontWeight="bold">
    //               Delete Portfolio
    //           </AlertDialogHeader>

    //           <AlertDialogBody>
    //               You're deleting an entire portfolio and student account -- permanently.
    //               Are you quite certain?
    //           </AlertDialogBody>

    //           <AlertDialogFooter>
    //               <Button ref={cancelRef} onClick={onCloseDialogue}>
    //                   Cancel
    //               </Button>
    //               <Button bg="#FF5656" color="white" onClick={() => {
    //                   onCloseDialogue();
    //                   handleDelete();
    //                   toast({
    //                       position: "top",
    //                       title: "Student Deleted.",
    //                       description: "That portfolio is donesies.",
    //                       status: "success",
    //                       duration: 5000,
    //                       isClosable: true,
    //                   });
    //               }}
    //               >
    //               </Button>
    //           </AlertDialogFooter>
    //       </AlertDialogContent>
    //   </AlertDialog>
    //   </IconButton>
    // </Box>

    <Flex width={['90vw', '90vw', '400px', '25vw']} direction="column" border="1px solid #ededed" borderRadius='15px' padding='1%' height={['30vh', '30vh', '30vh', '18vh']} justify='space-evenly'>
      <Flex justify='space-between'>
        <Image src={placeholder} size="45px" rounded="full" flexWrap="wrap" />
        <Flex direction="column" width="70%">
          <Heading as="h3" fontSize='1.2rem'>{student.name}'s Portfolio</Heading>
          <Text>{student.name} {familyName && familyName}</Text>
          </Flex>
          <IconButton icon="arrow-right" width='15%' variant='ghost' variantColor='blue' onClick={() => pushToPortfolio(student.id)}/>

      </Flex>
      <Flex direction='column'>
      <Text fontWeight='800' fontSize='.9rem'>LAST ACTIVITY</Text>
  {lastActivity[0] && <Text>{moment(lastActivity[0].created_at).format('ll').toUpperCase()} SUBMITTED {lastActivity[0].name}</Text>}
      </Flex>
    </Flex>
  );
};

//{moment(props.activity.completion_date).format("ll").toUpperCase()}

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities
  }
}

export default connect(mapStateToProps, {getAllActivitiesForUser})(StudentCard)
