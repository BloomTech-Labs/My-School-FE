import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  editActivity,
  editActivityWithoutPhoto,
} from "../../redux/actions/portfolio-actions";
import {
  Button,
  useDisclosure,
  Modal as CHModal,
  ModalOverlay,
  SlideIn,
  useToast,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";

import Modal from "./Modal";

const EditActivityModal = ({
  activity,
  defaultHour,
  defaultMin,
  editActivity,
  studentId,
  editActivityWithoutPhoto,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const toast = useToast();

  const methods = useForm();
  const { handleSubmit, formState } = methods;

  const [image, setImage] = useState("");

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted)
      axios
        .get("https://my-school-v1.herokuapp.com/api/subjects")
        .then((res) => {
          setSubjects(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    return () => {
      isMounted = false;
    };
  }, []);

  // Submit handler
  function onSubmit(data) {
    // converts user's duration input into minutes
    const duration = Number(data.hours) * 60 + Number(data.minutes) || null;
    // adds leading zero to day & month values to ensure completion_date is correct format
    const monthLeadingZero =
      data.month < 10 ? "0" + String(data.month) : String(data.month);
    const dayLeadingZero =
      data.day < 10 ? "0" + String(data.day) : String(data.day);
    // formats completion Date in YYYY-MM-DD format
    const completionDate = `${data.year}-${monthLeadingZero}-${dayLeadingZero}`;

    if (image) {
      // Updates activity without a new photo
      const formData = new FormData();
      formData.append("photo", image, image.name);
      formData.set("name", data.name);
      formData.set("description", data.description);
      formData.set("duration", duration);
      formData.set("subject_id", parseInt(data.subject));
      formData.set("completion_date", completionDate);

      editActivity(activity.id, formData, studentId);
    } else {
      //Updates activity with a new photo
      const updatedActivity = {
        name: data.name,
        description: data.description,
        subject_id: parseInt(data.subject),
        duration: duration,
        completion_date: completionDate,
      };

      editActivityWithoutPhoto(activity.id, updatedActivity, studentId);
    }

    onClose();
    toast({
      title: "Success!",
      description: `${data.name} was updated successfully`,
      status: "success",
      duration: 6000,
      isClosable: true,
      position: "top-right",
    });
  }

  return (
    <>
      <Button
        textTransform="uppercase"
        letterSpacing="1.2px"
        size="xs"
        mx="4px"
        variant="outline"
        variantColor="green"
        ref={btnRef}
        onClick={onOpen}
      >
        Edit
      </Button>
      <SlideIn in={isOpen}>
        {(styles) => (
          <CHModal
            closeOnOverlayClick={false}
            onClose={onClose}
            finalFocusRef={btnRef}
            isOpen={true}
            scrollBehavior="inside"
            size="xl"
          >
            <ModalOverlay opacity={styles.opacity} />
            <Modal
              onSubmit={onSubmit}
              styles={styles}
              subjects={subjects}
              defaultHour={defaultHour}
              defaultMin={defaultMin}
              setImage={setImage}
              activity={activity}
              formState={formState}
              handleSubmit={handleSubmit}
            />
          </CHModal>
        )}
      </SlideIn>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.portfolioReducer.isLoading,
    error: state.portfolioReducer.error,
  };
};

export default connect(mapStateToProps, {
  editActivity,
  editActivityWithoutPhoto,
})(EditActivityModal);
