import { usersReducer } from '../redux/reducers/users-reducer';
import * as types from '../redux/actions/user-actions';
import { mockData }from './mockData-reducer';
import expect from 'expect';


describe('users reducer', () => {

    it('should return the initial state', ()=>{
        expect(usersReducer(undefined, {})).toEqual({
            user: {},
            family: [],
            familyName: '',
            isLoading: false,
            error: ''
        })
    });

    it('handles FETCHING_USERS', () => {
        const start = { type: types.FETCHING_USERS };
        expect(usersReducer(undefined, start)).toEqual({
            user: {},
            family: [],
            familyName: '',
            isLoading: false,
            error: ''
             })
    });

    it('handles USERS_SUCCESS', () => {
        const success = { type: types.SET_FAMILY, payload: mockData}
        expect(usersReducer({}, success)).toEqual({
            family: [
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
            error: '',
            isLoading: false,
            familyName: 'a name'
        })
    });

    it('handles SET_ERROR', ()=> {
        const failed = { type: types.SET_ERROR ,payload: 'there was an error tring to get users' }
        expect(usersReducer({}, failed)).toEqual({
             error: "there was an error tring to get users",
             isLoading: false,
        })
    });

    it('handle deleting user', ()=>{
        expect(usersReducer({}, { type: types.DELETE_USER })).toEqual({
            isLoading: true,
        })
    });

    it('handle adding user', ()=>{
        expect(usersReducer({}, { type: types.SET_REGISTRATION })).toEqual({})
    });
      
  });