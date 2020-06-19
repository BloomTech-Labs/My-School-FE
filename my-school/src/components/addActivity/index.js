import React, { useState } from "react";
import axios from "axios";
import ReactGA from "react-ga";
import { SimpleGrid, Box, Flex, Text, Button, useToast } from "@chakra-ui/core";
import { useForm, FormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

import Name from "./Name";
import Subject from "./Subject";
import Description from "./Description";
import Duration from "./Duration";
import UploadPhoto from "./UploadPhoto";
import DateSelector from '../global/dateSelector'
import NewActivityPreview from "./NewActivityPreview";

const AddActivityForm = () => {
  const [preview, setPreview] = useState();
  const [image, setImage] = useState("");
  const methods = useForm();
  const toast = useToast();
  const studentId = useParams().id;
  const { handleSubmit, errors, register, formState } = methods;

  React.useEffect(() => {
    ReactGA.event({ category: "App", action: "Adding activity" });
  }, []);

  // Submit handler: 2 different endpoints based on whether or not user wants to include a photo
  function onSubmit(data) {
    // converts user's duration input into minutes
    const duration = Number(data.hours) * 60 + Number(data.minutes) || 0;
    // adds leading zero to day & month values to ensure completion_date is correct format
    const monthLeadingZero =
      data.month < 10 ? "0" + String(data.month) : String(data.month);
    const dayLeadingZero =
      data.day < 10 ? "0" + String(data.day) : String(data.day);
    // formats completion Date in YYYY-MM-DD format
    const completionDate = `${data.year}-${monthLeadingZero}-${dayLeadingZero}`;

    if (image) {
      const formData = new FormData();
      formData.append("photo", image, image.name);
      formData.set("student_id", studentId);
      formData.set("name", data.name);
      formData.set("description", data.description || null);
      formData.set("duration", duration);
      formData.set("subject_id", parseInt(data.subject) || 9);
      formData.set("completion_date", completionDate);

      axios
        .post(
          "https://my-school-v1.herokuapp.com/api/activities/attachimg",
          formData
        )
        .then((res) => {
          setPreview(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "An error occurred.",
            description: "Unable to log new activity.",
            status: "error",
            isClosable: true,
          });
        });
    } else {
      let activity = {
        student_id: studentId,
        name: data.name,
        description: data.description || null,
        duration: duration,
        subject_id: parseInt(data.subject) || 9,
        completion_date: completionDate,
        activity_type_id: 4,
      };
      axios
        .post("https://my-school-v1.herokuapp.com/api/activities", activity)
        .then((res) => {
          setPreview(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "An error occurred.",
            description: "Unable to log new activity.",
            status: "error",
            isClosable: true,
          });
        });
    }
  }

  return (
    <Box my="36px" mx={["8px", "20px", "40px", "40px"]}>
      {preview ? (
        <NewActivityPreview preview={preview} />
      ) : (
        <Flex flexDirection="column">
          <FormContext {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} data-testid="form-submit">
              {/* Title, Subject, Description, Duration, Submission Date, Upload Photo */}
              <SimpleGrid
                columns={[1, 1, 1, 2]}
                spacing={["20px", "20px", "20px", "128px"]}
              >
                <Box w={["100%, 100%, 100%, 50%"]}>
                  <Name errors={errors} register={register} />
                  <Subject register={register} />
                  <Description register={register} />
                  <Text fontWeight="bold">
                    How long did it take to complete this activity?
                  </Text>
                  <Box
                    borderWidth="1px"
                    borderColor="gray.400"
                    rounded="4px"
                    py="32px"
                    pl="32px"
                    m="8px 0 16px"
                  >
                    <Text fontWeight="bold">Duration</Text>
                    <Duration register={register} />
                  </Box>
                </Box>
                <Box w={["100%, 100%, 100%, 50%"]}>
                  <UploadPhoto setImage={setImage} image={image} />

                  <Text fontWeight="bold" mt="20px">
                    Confirm Submission Date
                  </Text>
                  <Flex
                    align="flex-end"
                    justify="space-between"
                    flexWrap="wrap"
                    my="8px"
                  >
                    <DateSelector onSubmit />
                    <Button
                      type="submit"
                      p="8px 16px"
                      mt="16px"
                      isLoading={formState.isSubmitting}
                      color="white"
                      bg="green.500"
                      _hover={{ bg: "green.600" }}
                      borderRadius="4px"
                      fontSize="1.125rem"
                      data-testid="submit"
                    >
                      Submit
                    </Button>
                  </Flex>
                </Box>
              </SimpleGrid>
            </form>
          </FormContext>
        </Flex>
      )}
    </Box>
  );
};

export default AddActivityForm;
