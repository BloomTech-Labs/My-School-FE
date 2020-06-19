import React from 'react'
import {FormControl, FormLabel, Select} from '@chakra-ui/core'

const Subject = ({subjects, activity, register}) => {

    return(
        <FormControl>
        <FormLabel
          htmlFor="subject"
          style={{ fontWeight: "700" }}
        >
          Subject
        </FormLabel>
        <Select
          id="subject"
          name="subject"
          ref={register}
          defaultValue={activity.subject_id}
          marginBottom="10px"
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