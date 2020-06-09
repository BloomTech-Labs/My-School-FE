import { usersReducer } from '../Redux/Reducers/reducers-users';
import * as types from '../Redux/actions/actions-users';
import { mockData }from '../mockData-reducer';
import expect from 'expect';


describe('users reducer', () => {

    it('should return the initial state', ()=>{
        expect(usersReducer(undefined, {})).toEqual({
            users: [],
            user: {},
            family: [],
            familyName:'',
            isLoading: false,
            err: ''
        })
    });

    it('handles FETCHING_USERS', () => {
        const start = { type: types.FETCHING_USERS };
        expect(usersReducer(undefined, start)).toEqual({
            users: [],
            user: {},
            family: [],
            familyName:'',
            isLoading: true,
            err: ''
             })
    });

    it('handles USERS_SUCCESS', () => {
        const success = { type: types.USERS_SUCCESS, payload: mockData}
        expect(usersReducer({}, success)).toEqual({
            users: [
                {
                "age": 25,
                "name": "dylan"
                }, 
                {
                "age": 25,
                "name": "sara"
                }, 
                {
                "age": 10, 
                "name": "elysia"
                }], 
            err: '',
            isLoading: false
        })
    });

    it('handles USERS_FAILURE', ()=> {
        const failed = { type: types.USERS_FAILURE ,payload: 'there was an error tring to get users' }
        expect(usersReducer({}, failed)).toEqual({
             err: "there was an error tring to get users",
             isLoading: false,
        })
    });

    it('handle deleting user', ()=>{
        expect(usersReducer({}, { type: types.DELETING_USER })).toEqual({
            isLoading: true,
        })
    });

    it('handle adding user', ()=>{
        expect(usersReducer({}, { type: types.ADDING_USERS })).toEqual({
            isLoading: true,
        })
    });
      
  });