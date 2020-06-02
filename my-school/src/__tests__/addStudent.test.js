import React from 'react';
import { render, fireEvent, act} from '../test-utils/test-utils';
import AddStudent from '../Components/studentRegister'


describe('Add student component', () => {

    it('mySchool title renders', () => {
        const { getByText } = render(<AddStudent/>);
        const title = getByText(/new account setup/i)
        expect(title).toBeTruthy();
    })

    it('renders right label and input change for username', async () => {
       const { getByTestId } = render(<AddStudent/>);
       const username = getByTestId('username');
        await act(async() => {
            fireEvent.change(username, {target: {name: 'username' , value: 'dcoll'}});
        })
        expect(username.value).toEqual('dcoll');
    })

    it('renders right label and input change for portfolio name', async () => {
        const { getByTestId } = render(<AddStudent/>);
        const portName = getByTestId('portName');
        await act(async () =>{
            fireEvent.change(portName, {target: {name: "porfolioname" , value: 'dyl portfolio' }});
        })
         expect(portName.value).toEqual('dyl portfolio');
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

     it('renders right label and input change for last name', async() => {
        const { getByTestId } = render(<AddStudent/>);
        const lName = getByTestId('lName');
        await act(async () => {
            fireEvent.change(lName, {target: {name: 'lastname' , value: 'collins'}});
        });
         expect(lName.value).toEqual('collins');
     })

    it('renders submit button and runs upon clicking', async () => {
        const onSubmit = jest.fn(e => e.preventDefault())
        const { getByTestId } = render(<AddStudent/>);
        //verifing the button it displayed
        const submitButton = getByTestId('submit');;
        expect(submitButton).toBeTruthy();
        //mocking the submit button
        const username = getByTestId('username');
        const portName = getByTestId('portName');
        const password = getByTestId('password');
        const fName =getByTestId('fName');
        const password2 =getByTestId('password2');
        const lName =getByTestId('lName')
        const submit = getByTestId('form-submit');
        await act(async ()=>{
            fireEvent.change(username, {target: {name: 'username' , value:'dylan '}});
            fireEvent.change(portName, {target: {name: 'portfolioname' , value: 'dcoll port'}});
            fireEvent.change(password, {target: {name: 'password' , value:'password'}});
            fireEvent.change(fName, {target: {name: 'firstname' , value:'dylan'}});
            fireEvent.change(password2, {target: {name: 'passwordconfirmation' , value: 'password'}});
            fireEvent.change(lName, {target: {name: 'lastname' , value:'collins'}});
        })
        submit.addEventListener('submit', onSubmit)
        await act( async ()=>{
        fireEvent.submit(submit)
        })
        expect(onSubmit).toHaveBeenCalled();
     })

})