import React from 'react'
import {ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button} from '@chakra-ui/core'
import Form from './Form'

const Modal = ({onSubmit, styles, handleSubmit, subjects, defaultHour, defaultMin, setImage, activity, formState}) => {

    
    return(
        <ModalContent pb={6} {...styles}>
        <ModalHeader>Edit Activity</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form activity={activity} handleSubmit={handleSubmit} onSubmit={onSubmit} subjects={subjects} defaultHour={defaultHour} defaultMin={defaultMin} setImage={setImage} />
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            isLoading={formState.isSubmitting}
            variantColor="green"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    )
}

export default Modal