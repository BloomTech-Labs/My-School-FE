import { ACTIVITES_SUCCESS, FETCHING_ACTIVITES, ACTIVITES_FAILURE } from '../actions/actions-portfolio';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mockStore = configureStore([thunk]);
const mock = new MockAdapter(axios);
const store = mockStore({
    activities: [],
    isLoading: false,
    err: ''
});
const act = {
    data: [
        { id: 1, name: 'this is an activity'}
    ]
}
const expectedActions = {
    type: ACTIVITES_SUCCESS,
    payload: {
        data: [
            { id: 1, name: 'this is an activity'}
        ]
    }
}
const expectedFetchingSuccess = {
    type: FETCHING_ACTIVITES
}
const error = {
    err: [
        { message: 'there was a bad axios call'}
    ]
}
const expectedError = {
    type: ACTIVITES_FAILURE,
    payload: {
        err: [
            { message: 'there was a bad axios call'}
        ]
    }
}

describe('Testing getAllActivitiesForUser', () => {

    beforeEach(() => {
        store.clearActions();
    });

    it('should get all activities', () => {
        mock.onGet('/testingActionsSuccess').reply(200,act)
        store.dispatch({ type: FETCHING_ACTIVITES })
        store.dispatch({ type: ACTIVITES_SUCCESS, payload: act })
        const actions  = store.getActions();
        expect(actions[0]).toEqual(expectedFetchingSuccess);
        expect(actions[1]).toEqual(expectedActions);
    });

    it('should return error for bad get request', ()=>{
        mock.onGet('/testingActionFailure').reply(404, error)
        store.dispatch({ type: FETCHING_ACTIVITES })
        store.dispatch({ type: ACTIVITES_FAILURE, payload: error })
        const actions  = store.getActions();
        expect(actions[0]).toEqual(expectedFetchingSuccess);
        expect(actions[1]).toEqual(expectedError);
    })
})

