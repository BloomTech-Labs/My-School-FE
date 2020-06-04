import { 
    FETCHING_USERS,
    DELETING_USER,
    USERS_SUCCESS,
    USERS_FAILURE, 
} from '../actions/actions-users';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mockStore = configureStore([thunk]);
const mock = new MockAdapter(axios);
const store = mockStore({
    users: [],
    user: {},
    family: [],
    familyName:'',
    isLoading: false,
    err: ''
});
const user = {
    data: [
        { id: 1, name: 'dylan'}
    ]
}
const expectedUser = {
    type: USERS_SUCCESS,
    payload: {
        data: [
            { id: 1, name: 'dylan'}
        ]
    }
}
const expectedFetchingSuccess = { type: FETCHING_USERS }
const error = {
    err: [
        { message: 'there was a bad axios call'}
    ]
}
const expectedError = {
    type: USERS_FAILURE,
    payload: {
        err: [
            { message: 'there was a bad axios call'}
        ]
    }
}
const expectDelete = { type: DELETING_USER }


describe('Testing getAllActivitiesForUser', () => {

    beforeEach(() => {
        store.clearActions();
    });

    it('testing the users fetching and success action creators', () => {
        store.dispatch({ type: FETCHING_USERS })
        mock.onGet('/testingActionsSuccess').reply(200, user )
        store.dispatch({ type: USERS_SUCCESS, payload: user })
        const actions  = store.getActions();
        expect(actions[0]).toEqual(expectedFetchingSuccess);
        expect(actions[1]).toEqual(expectedUser);
    });

    it('should return error for bad get request', ()=>{
        store.dispatch({ type: FETCHING_USERS })
        mock.onGet('/testingActionFailure').reply(404, user)
        store.dispatch({ type: USERS_FAILURE, payload: error })
        const actions  = store.getActions();
        expect(actions[0]).toEqual(expectedFetchingSuccess);
        expect(actions[1]).toEqual(expectedError);
    })

    it('action for posting user should return', ()=>{
        store.dispatch({ type: DELETING_USER })
        store.dispatch({ type: FETCHING_USERS })
        mock.onGet('/testingActionFailure').reply(404, user)
        store.dispatch({ type: USERS_SUCCESS, payload: user })
        const actions  = store.getActions();
        expect(actions[0]).toEqual(expectDelete);
        expect(actions[1]).toEqual(expectedFetchingSuccess);
        expect(actions[2]).toEqual(expectedUser);
    })
})

