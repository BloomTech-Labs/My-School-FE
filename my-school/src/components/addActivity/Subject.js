import React, {useEffect, useState} from 'react'
import {FormControl, FormLabel, Select} from '@chakra-ui/core'
import axios from 'axios'

const Subject = ({register}) => {
    const [subjects, setSubjects] = useState([]);
    useEffect(() => {
      let isMounted = true;
      axios
        .get("https://my-school-v1.herokuapp.com/api/subjects")
        .then((res) => {
          if (isMounted) setSubjects(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return () => {
        isMounted = false;
      };
    }, []);

    return (
        <FormControl my="20px" fontFamily="'Nunito'">
        <FormLabel
          htmlFor="subject"
          fontWeight="bold"
          data-testid="subjects-label"
        >
          Subject
        </FormLabel>
        <Select
          id="subject"
          name="subject"
          placeholder="Select..."
          ref={register}
          borderColor="gray.400"
          focusBorderColor="myschoolblue"
          data-testid="subjects"
        >
          {subjects.map((s) => {
            return (
              <option value={s.id} key={s.id}>
                {s.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
    )
}

export default Subject