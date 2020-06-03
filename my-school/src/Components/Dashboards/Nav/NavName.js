import React from "react";
import { Heading } from "@chakra-ui/core";

const NavName = ({ user }) => {
  return (
    <Heading as="h3" size="md" alt="user name" color="white">
      {`${user.name} ${user.familyName}`}
      {/* <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.7305 10C12.969 10 10.7305 7.76142 10.7305 5C10.7305 2.23858 12.969 0 15.7305 0C18.4919 0 20.7305 2.23858 20.7305 5C20.7305 7.76142 18.4919 10 15.7305 10ZM16.7305 11H18.7305V18C18.7305 19.1046 17.835 20 16.7305 20H2.73047C1.6259 20 0.730469 19.1046 0.730469 18V4C0.730469 2.89543 1.6259 2 2.73047 2H9.73047V4H2.73047V18H16.7305V11ZM18.7305 5C18.7305 6.65685 17.3873 8 15.7305 8C14.0736 8 12.7305 6.65685 12.7305 5C12.7305 3.34315 14.0736 2 15.7305 2C17.3873 2 18.7305 3.34315 18.7305 5Z"
          fill="#DBE8FB"
        />
      </svg> */}
    </Heading>
    
  );
};

export default NavName;
