import { 
    SET_ERROR,
    SET_USER,
    FETCH_USER,
    DELETE_USER
} from '../Redux/actions/actions-users';
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
    type: SET_USER,
    payload: {
        data: [
            { id: 1, name: 'dylan'}
        ]
    }
}
const expectedFetchingSuccess = { type: FETCH_USER }
const error = {
    err: [
        { message: 'there was a bad axios call'}
    ]
}
const expectedError = {
    type: SET_ERROR,
    payload: {
        err: [
            { message: 'there was a bad axios call'}
        ]
    }
}
const expectDelete = { type: DELETE_USER }


describe('Testing getAllActivitiesForUser', () => {

    beforeEach(() => {
        store.clearActions();
    });

    it('testing the users fetching and success action creators', () => {
        store.dispatch({ type: FETCH_USER })
        mock.onGet('/testingActionsSuccess').reply(200, user )
        store.dispatch({ type: SET_USER, payload: user })
        const actions  = store.getActions();
        expect(actions[0]).toEqual(expectedFetchingSuccess);
        expect(actions[1]).toEqual(expectedUser);
    });

    it('should return error for bad get request', ()=>{
        store.dispatch({ type: FETCH_USER })
        mock.onGet('/testingActionFailure').reply(404, user)
        store.dispatch({ type: SET_ERROR, payload: error })
        const actions  = store.getActions();
        expect(actions[0]).toEqual(expectedFetchingSuccess);
        expect(actions[1]).toEqual(expectedError);
    })

    it('action for posting user should return', ()=>{
        store.dispatch({ type: DELETE_USER })
        store.dispatch({ type: FETCH_USER })
        mock.onGet('/testingActionFailure').reply(404, user)
        store.dispatch({ type: SET_USER, payload: user })
        const actions  = store.getActions();
        expect(actions[0]).toEqual(expectDelete);
        expect(actions[1]).toEqual(expectedFetchingSuccess);
        expect(actions[2]).toEqual(expectedUser);
    })
})

