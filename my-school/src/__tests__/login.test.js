import React from 'react';
import { render, fireEvent, act} from './testUtils';
import Login from '../components/loginAndRegister/login';

describe('Login component', () => {

    it('should have username title', () => {
        const { getByText } = render(<Login/>)
        const username = getByText(/username/i);
        expect(username).toBeTruthy();
    });

    it('should have password label', () => {
        const { getByText } = render(<Login/>)
        const password = getByText(/password/i);
        expect(password).toBeTruthy();
    });
    it('should have remember me title', () => {
        const { getByText } = render(<Login/>)
        const remember = getByText(/remember me/i);
        expect(remember).toBeTruthy();
    })
    it('should have New to MySchool?' , () => {
        const { getByText } = render(<Login/>)
        const extra = getByText(`New to MySchool?`);
        expect(extra).toBeTruthy();
    })

    it('should have  Create an account.' , () => {
        const { getByText } = render(<Login/>)
        const CAA = getByText(`Create an account.`);
        expect(CAA).toBeTruthy();
    })

    it('renders right label and input change for username', async () => {
       const { getByTestId } = render(<Login/>);
       const username = getByTestId('username');
       await act(async ()=>{
        fireEvent.change(username, {target: {name: 'username' , value: 'dylan'}});
       })
        expect(username.value).toEqual('dylan');
    })

    it('renders right label and input change for password', async() => {
        const { getByTestId } = render(<Login/>);
        const password = getByTestId('password');
        await act(async ()=>{
            fireEvent.change(password, {target: {name: 'password' , value: 'password2'}});
        })
         expect(password.value).toEqual('password2');
     })
     
    it('checking to make sure the value of checkbox changes on click', async () => {
        const changed = jest.fn(e => e.preventDefault());
        const { getByTestId } = render(<Login/>);
        const checkbox = getByTestId('checked');
        checkbox.addEventListener('click', changed)
        await act(async ()=>{
            fireEvent.click(checkbox);
        })
         expect(changed).toHaveBeenCalled()
     })

    it('renders submit button and runs upon clicking', async () => {
         const onSubmit = jest.fn(e => e.preventDefault())
        const { getByTestId } = render(<Login/>);
        //verifing the button it displayed
        const submitButton = getByTestId('submit');;
        expect(submitButton).toBeTruthy();
        //mocking a submit using the login button
        const username = getByTestId('username');
        const password = getByTestId('password');
        const submit = getByTestId('form-submit');
        fireEvent.change(username, {target: {name: 'username' , value:'dylan'}});
        fireEvent.change(password, {target: {name: 'password' , value: 'password2'}});
        submit.addEventListener('submit', onSubmit)
        await act( async ()=>{
        fireEvent.submit(submit)
        })
        expect(onSubmit).toHaveBeenCalled();
     })
     
})
