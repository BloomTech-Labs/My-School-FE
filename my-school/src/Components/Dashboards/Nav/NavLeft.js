import React from 'react';
import {Flex, Image} from '@chakra-ui/core'
import {Link} from 'react-router-dom'

const NavLeft = () => {
    return (
        <Flex align="flex-start">
        {/* logo link to landing page? */}
        <Link to="/">
          <Image
            src="https://myschoolathome.io/static/media/logo100-100.ba4f14e7.svg"
            alt="MySchool logo"
            size="70%"
          />
        </Link>
      </Flex>
    )
}
export default NavLeft