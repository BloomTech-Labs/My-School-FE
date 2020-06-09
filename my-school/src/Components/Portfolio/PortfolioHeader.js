import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Heading, Flex, Text } from "@chakra-ui/core";
import axios from "axios";
import HeaderButton from "./HeaderButton";

const PortfolioHeader = (props) => {
  const [title, setTitle] = useState("");
  let { pathname } = useLocation();
  const [studentName, setStudentName] = useState('')
  const history = useHistory();
  const isButton = () => {
    return pathname === "/portfolio" ? false : true;
  };
  const id = Number(localStorage.getItem('student_id')) || Number(localStorage.getItem('userId'));

  useEffect(() => {
    axios
      .get(`https://my-school-v1.herokuapp.com/api/users/${Number(localStorage.getItem('userId'))}`)
      .then((response) => {
        if (response.user_type_id === 1) {
          console.log(response.data)
          setTitle([response.data.name] + "'s Portfolio");
        } else {
          setTitle("My Portfolio");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem('student_id'))
      axios
        .get(`https://my-school-v1.herokuapp.com/api/users/${Number(localStorage.getItem('student_id'))}`)
        .then(res => {
          const name = res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1)
          setStudentName(name)
        })
        .catch(err => {
          console.log(err)
        });
  }, [])

  const pushHistory = () => {
    history.push('/dashboard')
  }

  return (
    <Flex margin="2% 4%" justify="space-between">
      {/* TITLE  -- based on user type and name*/}
      {isButton() ? (
        localStorage.getItem('student_id') ? <Text fontSize="1.125rem" fontWeight="700" color="gray.800"><span className='link' onClick={pushHistory}>Dashboard </span>/ {studentName !== '' ? `${studentName}'s Portfolio` : ''}</Text>
          : <Text fontSize="1.125rem" fontWeight="700" color="gray.800">{title}</Text>
      ) : (
          <Heading as="h2">{title}</Heading>
        )}
      <Flex width="25%" justify="space-evenly">
        <HeaderButton text="Add Activity" icon="add" location={`/portfolio/${id}/add`} />
        {/*  EXPORT BUTTON -- PARENTS ONLY? */}
        {localStorage.getItem('student_id') ? <HeaderButton text="Convert to PDF" icon="download" location={`/portfolio/${id}/export`} /> : null}
      </Flex>
      {/*  Start with opening in another tab, then download. */}
      {/*SEARCH BOX AND SORT/FILTER FEATUREs WILL GO HERE*/}
      {/* future -- activity tracker? */}
    </Flex>
  );
};

export default PortfolioHeader;
