import React, { useState, useRef } from "react";
import {
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

const DeleteUser = ({ id, user, deleteAccount, deleteEntireFamily }) => {
  const [hoverDelete, setHoverDelete] = useState(false);
  const [isOpenDialogue, setIsOpenDialogue] = useState();
  const cancelRef = useRef();
  const history = useHistory();
  const toast = useToast();
  const onCloseDialogue = () => setIsOpenDialogue(false);

  const handleDeleteAccount = () => {
    if (user.user_type_id === 2) {
      deleteAccount(id, user)
        .then((res) => {
          toast({
            position: "top",
            title: "User Deleted.",
            description: `${user.name}'s profile, has been deleted.`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          history.push("/dashboard");
        })
        .catch((err) => console.log("delete account", err));
    } else {
      deleteEntireFamily(user.family_id)
        .then((res) => {
          localStorage.clear();
          history.push("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Button
      m="1rem"
      variantColor="red"
      variant={hoverDelete ? "outline" : "solid"}
      onMouseEnter={() => setHoverDelete(true)}
      onMouseLeave={() => setHoverDelete(false)}
      _focus={{ boxShadow: "outline" }}
      onClick={() => {
        setIsOpenDialogue(true);
      }}
    >
      Delete Account
      <AlertDialog
        isOpen={isOpenDialogue}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDialogue}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete User
          </AlertDialogHeader>
          <AlertDialogBody>
            {user.user_type_id === 1
              ? `Are you Sure? If you delete your account, then your family will be removed from MySchool entirely`
              : `Are you sure? You can't undo the deletion of a user afterwards.`}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseDialogue}>
              Cancel
            </Button>
            <Button
              bg="#FF5656"
              color="white"
              onClick={() => {
                onCloseDialogue();
                handleDeleteAccount();
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

export default DeleteUser;
