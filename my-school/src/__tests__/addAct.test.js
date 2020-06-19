import React from 'react';
import { render, fireEvent, act} from './testUtils';
import AddActivityForm from '../components/addActivity'
import ReactGA from 'react-ga';

describe('Add Activity component', () => {

    beforeAll(()=>{
        ReactGA.initialize('foo', { testMode: true });
    })

    it('should have title', () => {
        const { getByText } = render(<AddActivityForm />)
        const title = getByText(/title/i);
        expect(title).toBeTruthy();
    });

    it('should have subject title', () => {
        const { getByText } = render(<AddActivityForm />)
        const subject = getByText(/subject/i);
        expect(subject).toBeTruthy();
    });

    it('should have description title', () => {
        const { getByText } = render(<AddActivityForm />)
        const description = getByText(/description/i);
        expect(description).toBeTruthy();
    });
    it('should have How long did it take to complete this activity?', () => {
        const { getByText } = render(<AddActivityForm />)
        const howLong = getByText(/How long did it take to complete this activity?/i);
        expect(howLong).toBeTruthy();
    });
    it('should have duration title', () => {
        const { getByText } = render(<AddActivityForm />)
        const duration = getByText(/duration/i);
        expect(duration).toBeTruthy();
    });
    it('should have hours title', () => {
        const { getByText } = render(<AddActivityForm />)
        const hours = getByText(/hours/i);
        expect(hours).toBeTruthy();
    });
    it('should have minutes title', () => {
        const { getByText } = render(<AddActivityForm />)
        const minutes = getByText(/minutes/i);
        expect(minutes).toBeTruthy();
    });
    it('should have choose file', () => {
        const { getByText } = render(<AddActivityForm />)
        const choose = getByText(/choose file/i);
        expect(choose).toBeTruthy();
    });
    it('should have no file selected', () => {
        const { getByText } = render(<AddActivityForm />)
        const noFile = getByText(/no file selected/i);
        expect(noFile).toBeTruthy();
    });
    it('should have confirm submission date title', () => {
        const { getByText } = render(<AddActivityForm />)
        const submission = getByText(/Confirm Submission Date/i);
        expect(submission).toBeTruthy();
    });
    it('should have month title', () => {
        const { getByText } = render(<AddActivityForm />)
        const month = getByText(/month/i);
        expect(month).toBeTruthy();
    });
    it('should have day title', () => {
        const { getByText } = render(<AddActivityForm />)
        const day = getByText(/day/i);
        expect(day).toBeTruthy();
    });
    it('should have year title', () => {
        const { getByText } = render(<AddActivityForm />)
        const year = getByText(/year/i);
        expect(year).toBeTruthy();
    });

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