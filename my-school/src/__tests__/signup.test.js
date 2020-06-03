import React from 'react';
import { render, fireEvent, act} from '../test-utils/test-utils';
import Signup from '../Components/EnterUser/Signup';


describe('signup component', () => {

    it('renders right label and input change for family', async () => {
       const { getByTestId } = render(<Signup/>);
       const family = getByTestId('family');
       await act(async ()=>{
        fireEvent.change(family, {target: {name: 'family' , value: 'collins'}});
       })
        expect(family.value).toEqual('collins');
    })

    it('renders right label and input change for email', async () => {
        const { getByTestId } = render(<Signup/>);
        const email = getByTestId('email');
        await act(async ()=>{
            fireEvent.change(email, {target: {name: 'email' , value: 'email@email.com'}});
        })
         expect(email.value).toEqual('email@email.com');
     })

    it('renders right label and input change for password', async() => {
        const { getByTestId } = render(<Signup/>);
        const password = getByTestId('password');
        await act(async ()=>{
            fireEvent.change(password, {target: {name: 'password' , value: 'password'}});
        })
         expect(password.value).toEqual('password');
     })

    it('renders right label and input change for password_conformation', async () => {
        const { getByTestId } = render(<Signup/>);
        const password = getByTestId('password2');
        await act(async ()=>{
            fireEvent.change(password, {target: {name: 'password_confirm' , value: 'password'}});
        })
         expect(password.value).toEqual('password');
     })

    it('renders the state input', () => {
        const { getByTestId } = render(<Signup/>);
        const stateInput = getByTestId('state');
        expect(stateInput.value).toEqual('maryland');
     })

    it('checking to make sure the value of checkbox changes on click', async () => {
        const changed = jest.fn(e => e.preventDefault());
        const { getByTestId } = render(<Signup/>);
        const checkbox = getByTestId('checked');
        checkbox.addEventListener('click', changed)
        await act(async ()=>{
            fireEvent.click(checkbox);
        })
         expect(changed).toHaveBeenCalled()
     })
     
    it('renders submit button and runs upon clicking', async () => {
        const onSubmit = jest.fn(e => e.preventDefault())
        const { getByTestId } = render(<Signup/>);
        //verifing the button it displayed
        const submitButton = getByTestId('submit');;
        expect(submitButton).toBeTruthy();
        //mocking a submit using the signup button
        const family = getByTestId('family')
        const email = getByTestId('email');
        const password = getByTestId('password');
        const password2 =getByTestId('password2')
        const submit = getByTestId('form-submit');
        fireEvent.change(family, {target: {name: 'family' , value:'collins'}});
        fireEvent.change(email, {target: {name: 'email' , value: 'email@email.com'}});
        fireEvent.change(password, {target: {name: 'password' , value:'password'}});
        fireEvent.change(password2, {target: {name: 'password_confirm' , value: 'password'}});
        submit.addEventListener('submit', onSubmit)
        await act( async ()=>{
        fireEvent.submit(submit)
        })
        expect(onSubmit).toHaveBeenCalled();
     })

})