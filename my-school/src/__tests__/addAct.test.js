import React from 'react';
import { render, fireEvent, act} from '../test-utils/test-utils';
import AddActivityForm from '../Components/Portfolio/Activity/AddActivity/AddActivityForm';
import ReactGA from 'react-ga';

describe('Add Activity component', () => {

    beforeAll(()=>{
        ReactGA.initialize('foo', { testMode: true });
    })

    it('Upload An Activity photo title renders', () => {
        const { getByText } = render(<AddActivityForm />);
        const title = getByText(/upload activity photo/i)
        expect(title).toBeTruthy();
    })

    it('renders right label and input change for for thw activity name', async() => {
       const { getByTestId } = render(<AddActivityForm/>);
       const name = getByTestId('name');
       await act(async () => {
        fireEvent.change(name, {target: {name: 'name' , value: 'This is the title'}});
       })
        expect(name.value).toEqual('This is the title');
    })

    it('selects changes input when changed', async () => {
        const change = jest.fn(e => e.preventDefault())
        const { getByTestId } = render(<AddActivityForm/>);
        const subjects = getByTestId('subjects');
        subjects.addEventListener('change', change )
        await act( async()=> {
            fireEvent.change(subjects, {target: {value: '1'}})
        })
        expect(change).toHaveBeenCalled()
     })
     
     it('renders right label and input change for description', async () => {
        const { getByTestId } = render(<AddActivityForm/>);
        const description = getByTestId('description');
        await act(async ()=>{
            fireEvent.change(description, {target: {name: 'descrption' , value: 'this is a description'}});
        })
        expect(description.value).toEqual('this is a description');
    })
    
    it('renders right label and input change for hours', async () => {
        const { getByTestId } = render(<AddActivityForm/>);
        const hours = getByTestId('hours');
        const hourInput = hours.children[0]
        await act( async ()=>{
            fireEvent.change(hourInput ,{target: { value: `1`}});
        })
         expect(hourInput).toHaveValue(`1`)
     })

     it('renders right label and input change for minutes', async () => {
        const { getByTestId } = render(<AddActivityForm/>);
        const minutes = getByTestId('minutes');
        const minutesInput = minutes.children[0]
        await act( async ()=>{
            fireEvent.change(minutesInput ,{target: { value: `1`}});
        })
         expect(minutesInput).toHaveValue(`1`)
     })

     it('renders right label and input change for image', async () => {
        const change = jest.fn(e => {})
        const { getByTestId } = render(<AddActivityForm/>);
        const image = getByTestId('image');
        image.addEventListener('change' , change)
        await act(async ()=>{
            fireEvent.change(image);
        })
         expect(change).toHaveBeenCalled()
     })

    it('renders submit button and runs upon clicking', async () => {
        const onSubmit = jest.fn()
        const { getByTestId } = render(<AddActivityForm/>);
        //verifing the button it displayed
        const submitButton = getByTestId('submit');;
        expect(submitButton).toBeTruthy();
        //mocking the submit button without image upload
        const name = getByTestId('name');
        const description =getByTestId('description');
        const submit = getByTestId('form-submit');
        await act(async ()=>{
            fireEvent.change(name, {target: {name: 'name' , value:'dylan'}});
            fireEvent.change(description, {target: {name: 'description' , value: 'this is a description'}});
        })
        submit.addEventListener('submit', onSubmit)
        await act( async ()=>{
        fireEvent.submit(submit)
        })
        expect(onSubmit).toHaveBeenCalled();
     })
     
     it('renders submit button and runs upon clicking', async () => {
        const onSubmit = jest.fn()
        const { getByTestId } = render(<AddActivityForm/>);
        //verifing the button it displayed
        const submitButton = getByTestId('submit');;
        expect(submitButton).toBeTruthy();
        //mocking the submit button with image upload
        const name = getByTestId('name');
        const description =getByTestId('description');
        const image = getByTestId('image')
        const submit = getByTestId('form-submit');
        await act(async ()=>{
            fireEvent.change(name, {target: {name: 'name' , value:'dylan'}});
            fireEvent.change(description, {target: {name: 'description' , value: 'this is a description'}});
            fireEvent.change(image, {target: {name: 'image' , value: ''}});
        })
        submit.addEventListener('submit', onSubmit)
        await act( async ()=>{
        fireEvent.submit(submit)
        })
        expect(onSubmit).toHaveBeenCalled();
     })
})