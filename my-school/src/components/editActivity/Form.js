import React from 'react'
import {FormContext, useForm} from 'react-hook-form'

import Name from './Name'
import Subject from './Subject'
import Description from './Description'
import Duration from './Duration'
import DateCompleted from './DateCompleted'
import ImageUpload from './ImageUpload'

const Form = ({ activity, handleSubmit, onSubmit, subjects, defaultHour, defaultMin, setImage}) => {
    const methods = useForm()
    const {errors, register} = methods

    return(
        <FormContext {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Name errors={errors} register={register} activity={activity}/>
        <Subject subjects={subjects} activity={activity} register={register} />
        <Description register={register} activity={activity} />
        <Duration defaultHour={defaultHour} register={register} defaultMin={defaultMin} />
        <DateCompleted activty={activity} />
        <ImageUpload activity={activity} setImage={setImage} />
      </form>
      </FormContext>
    )
}

export default Form