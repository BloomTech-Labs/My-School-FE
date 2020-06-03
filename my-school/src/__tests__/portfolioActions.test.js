import { ACTIVITES_SUCCESS } from '../actions/actions-portfolio';
import { getAllActivitiesForUser } from '../actions/actions-portfolio';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const id = 3;
const mock = new MockAdapter(axios);
const store = mockStore({ 
    activities: [],
    isLoading: false,
    err: ''
});
const activityUrl = `https://my-school-v1.herokuapp.com/api/users/${id}/activities`;
const url = new RegExp(`${activityUrl}/*`);

describe('Testing getAllActivitiesForUser', () => {

    it.todo('this is a fake test')
    // beforeEach(() => {
    //     store.clearActions();
    // });

    // it('should get all activities', async () => {
    //     mock.onGet(url).reply(200, {
    //         data: [
    //             { id: 1, name: 'this is an activity' }
    //         ]
    //     });
    //      store.dispatch(getAllActivitiesForUser(id))
    //         const expectedActions = [{
    //             type: ACTIVITES_SUCCESS,
    //             payload: {
    //                 data: [
    //                     { id: 1, name: 'this is an activity'}
    //                 ]
    //             }
    //         }]
    //         const action = await store.getActions();
    //         expect(action).toEqual(expectedActions);
    // });
})

