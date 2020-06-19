import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  useToast,
  Flex,
  Text,
  Divider,
  Input,
} from "@chakra-ui/core";
import { useParams, useHistory } from "react-router-dom";
import * as EmailValidator from "email-validator";
import {
  editProfileWithoutImage,
  deleteAccount,
  deleteEntireFamily,
  editProfileWithImage,
} from "../../redux/actions/user-actions";
import Name from "./Name";
import Password from "./Password";
import PasswordConfirm from "./PasswordConfirm";
import ValidationMessage from "./ValidationMessage";
import Username from './Username'
import ProfilePicture from './ProfilePicture'
import DeleteUser from "./DeleteUser";
import UpdateButton from "./UpdateButton";

const Settings = ({
  family,
  editProfileWithoutImage,
  deleteAccount,
  deleteEntireFamily,
  editProfileWithImage,
}) => {
  //need the user info to be either the admin(Addcount Settings) or the student (Manage)
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");
  const { id } = useParams();
  const toast = useToast();
  const [passwordField, setPasswordField] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [renderedUser, setRenderedUser] = useState({});
  const history = useHistory();
  const { handleSubmit } = useForm();

  const formFiller = () => {
    const selectedUser = family.filter((user) =>
      user.id === Number(id) ? user : null
    );
    const name = selectedUser[0] ? selectedUser[0].name  : '' ;
    setUser({
      ...selectedUser[0],
      password: "password",
      name: name,
    });
    setThumbnail("");
    setImage("");
    setRenderedUser({
      ...selectedUser[0],
      name: name,
    });
    setPasswordField(false);
  };

  const axiosHandler = (data, isDataForm) => {
    if (isDataForm === true) {
      editProfileWithImage(data, renderedUser.id)
        .then((res) => {
          toast({
            title: "Success!",
            description: `${
              user.user_type_id === 1 ? `Your` : `${user.name}'s`
            } profile was updated successfully`,
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "top-right",
          });
          setImage("");
        })
        .catch((err) => console.log(err));
    } else {
      editProfileWithoutImage(data, renderedUser.id)
        .then((res) => {
          toast({
            title: "Success!",
            description: `${
              user.user_type_id === 1 ? `Your` : `${user.name}'s`
            } profile was updated successfully`,
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "top-right",
          });
          history.push("/dashboard");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleImageGrabber = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setThumbnail(URL.createObjectURL(e.target.files[0]));
      setTimeout(() => {
        document.getElementById("submit").click();
      }, [1000]);
    }
  };

  const handleUpdate = (e) => {
    if (image) {
      const formData = new FormData();
      formData.append("photo", image, image.name);
      axiosHandler(formData, true);
    } else if (passwordField === false) {
      if (user.user_type_id === 1) {
        const name = user.name === "" ? null : user.name;
        const changes = {
          username: user.username,
          email: user.username,
          name: name,
        };
        axiosHandler(changes, false);
      } else {
        const changes = {
          username: user.username,
          name: user.name,
        };
        axiosHandler(changes, false);
      }
    } else {
      if (user.user_type_id === 1) {
        const name = user.name === "" ? null : user.name;
        const changes = {
          username: user.username,
          email: user.username,
          name: name,
          password: user.password,
        };
        axiosHandler(changes, false);
      } else {
        const changes = {
          username: user.username,
          name: user.name,
          password: user.password,
        };
        axiosHandler(changes, false);
      }
    }
  };

  const handleInputs = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(formFiller, [id]);

  return (
    <>
      <Text
        padding="2rem 0rem 2rem 10rem"
        fontSize="1.125rem"
        fontWeight="700"
        color="gray.800"
      >
        <span className="link">Dashboard</span> /{" "}
        {renderedUser.user_type_id === 1
          ? `My account Settings`
          : `${renderedUser.name}'s Account settings`}
      </Text>
      {Object.keys(user).length > 0 && (
        <Flex direction="column">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <ProfilePicture thumbnail={thumbnail} renderedUser={renderedUser}/>
            <Input
              hidden
              name="profilepic"
              id="profilepic"
              type="file"
              onChange={handleImageGrabber}
            />
            <Divider w="100vw" padding="1rem 0rem" />
            <Username handleInputs={handleInputs} user={user}/>
            {user.username === "" && <ValidationMessage color='red.500' icon='warning' message='Please provide a username' />}
            {user.user_type_id === 1 &&
            EmailValidator.validate(user.username) === false && <ValidationMessage color='red.500' icon='warning' message='Please provide a valid email.' />}
            <Password
              passwordField={passwordField}
              user={user}
              handleInputs={handleInputs}
              setPasswordField={setPasswordField}
              setUser={setUser}
            />
            {passwordField && (
              <PasswordConfirm handleInputs={handleInputs} user={user} />
            )}
            {user.password === user.passwordConfirm &&
            passwordField === true &&
            user.password !== "" ? (
            <ValidationMessage color='green.400' icon='check-circle' message='Passwords match.' />
            ) : null}
            {(passwordField === true &&
              user.password !== user.passwordConfirm) ||
            (passwordField === true && user.passord === "") ? (
            <ValidationMessage color='red.500' icon='warning' message='Passwords must match, and must be at least 8 characters' />
            ) : null}
            <Name handleInputs={handleInputs} user={user} />
            {user.name === "" && user.user_type_id === 2 ? (
            <ValidationMessage color='red.500' icon='warning' message='Must provide a name' />
            ) : null}
            <Flex
              paddingLeft="7rem"
              className="settings-box"
              justifyContent="space-around"
              w="30vw"
            >
              <UpdateButton
                user={user}
                passwordField={passwordField}
                renderedUser={renderedUser}
                image={image}
              />
              <DeleteUser
                id={id}
                user={user}
                deleteAccount={deleteAccount}
                deleteEntireFamily={deleteEntireFamily}
              />
            </Flex>
          </form>
        </Flex>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    family: state.usersReducer.family,
    admin: state.usersReducer.user,
  };
};

export default connect(mapStateToProps, {
  editProfileWithoutImage,
  deleteAccount,
  deleteEntireFamily,
  editProfileWithImage,
})(Settings);
