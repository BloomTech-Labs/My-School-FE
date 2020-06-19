import React from 'react';
import { render, fireEvent, act} from './testUtils';
import AddStudent from '../components/loginAndRegister/studentRegistration'


describe('Add student component', () => {

    // Will put this back in once I figure out what the copy is.
    // it('mySchool title renders', () => {
    //     const { getByText } = render(<AddStudent/>);
    //     const title = getByText(/new student account setup/i)
    //     expect(title).toBeTruthy();
    // })

    it('should have username title', () => {
        const { getByText } = render(<AddStudent/>)
        const username = getByText(/username/i);
        expect(username).toBeTruthy();
    });

    it('should have password title', () => {
        const { getByText } = render(<AddStudent/>)
        const password = getByText(`Password`);
        expect(password).toBeTruthy();
    });

    it('should have confirm password title', () => {
        const { getByText } = render(<AddStudent/>)
        const password2 = getByText(`Password (Confirmation)`);
        expect(password2).toBeTruthy();
    });

    it('should have first name title', () => {
        const { getByText } = render(<AddStudent/>)
        const fname = getByText(/first name/i);
        expect(fname).toBeTruthy();
    });

    it('renders right label and input change for username', async () => {
       const { getByTestId } = render(<AddStudent/>);
       const username = getByTestId('username');
        await act(async() => {
            fireEvent.change(username, {target: {name: 'username' , value: 'dcoll'}});
        })
        expect(username.value).toEqual('dcoll');
    })

    it('renders right label and input change for password', async () => {
        const { getByTestId } = render(<AddStudent/>);
        const password = getByTestId('password');
        await act( async () => {
            fireEvent.change(password, {target: {name: 'password' , value: 'password'}});
        })
         expect(password.value).toEqual('password');
     })

     it('renders right label and input change for first name', async () => {
        const { getByTestId } = render(<AddStudent/>);
        const fName = getByTestId('fName');
        await act( async ()=>{
            fireEvent.change(fName, {target: {name: 'firstname' , value: 'dylan'}});
        })
         expect(fName.value).toEqual('dylan');
     })

     it('renders right label and input change for password_conformation', async () => {
        const { getByTestId } = render(<AddStudent/>);
        const password = getByTestId('password2');
        await act(async () => {
            fireEvent.change(password, {target: {name: 'passwordconfirmation' , value: 'password'}});
        })
         expect(password.value).toEqual('password');
     })

    it('renders submit button and runs upon clicking', async () => {
        const onSubmit = jest.fn(e => e.preventDefault())
        const { getByTestId } = render(<AddStudent/>);
        //verifing the button it displayed
        const submitButton = getByTestId('submit');;
        expect(submitButton).toBeTruthy();
        //mocking the submit button
        const username = getByTestId('username');
        const password = getByTestId('password');
        const fName =getByTestId('fName');
        const password2 =getByTestId('password2');
        await act(async ()=>{
            fireEvent.change(username, {target: {name: 'username' , value:'dylan '}});
            fireEvent.change(password, {target: {name: 'password' , value:'password'}});
            fireEvent.change(fName, {target: {name: 'firstname' , value:'dylan'}});
            fireEvent.change(password2, {target: {name: 'passwordconfirmation' , value: 'password'}});
        })
        submitButton.addEventListener('submit', onSubmit)
        await act( async ()=>{
        fireEvent.submit(submitButton)
        })
        expect(onSubmit).toHaveBeenCalled();
     })

})