import { getUserByID, getFamilyName, getFamilyByID, deleteStudent, deleteAccount } from '../Redux/actions/actions-users';
import { getAllActivitiesForUser, editActivityWithoutPhoto, editActivity, deleteActivity } from '../actions/actions-portfolio';
import { registerAssertions } from 'redux-actions-assertions/jest'
import thunk from 'redux-thunk';
import { registerMiddlewares } from 'redux-actions-assertions';

registerMiddlewares([ thunk ]);

describe('testing all actions to make sure they run when invoked and the first action creator gets dispatch before async operatiosn', () => {

    beforeEach(registerAssertions);
    
    it('testing the getUserByID', (done)=> {
        expect(getUserByID()).toDispatchActions([{ type: 'FETCHING_USERS' }], done);
    })
    it('testing the getFamilyName', (done)=> {
        expect(getFamilyName()).toDispatchActions([{ type: 'FETCHING_USERS' }], done);
    })
    it('testing the getFamilyNameByID', (done)=> {
        expect(getFamilyByID()).toDispatchActions([{ type: 'FETCHING_USERS' }], done);
    })
    it('testing the deleteStudent', (done)=> {
        expect(deleteStudent()).toDispatchActions([{ type: 'DELETING_USER' }], done);
    })
    it('testing the deleteAccount', (done)=> {
        expect(deleteAccount()).toDispatchActions([{ type: 'DELETING_USER' }], done);
    })
    it('testing the etAllActivitiesForUser', (done)=> {
        expect(getAllActivitiesForUser()).toDispatchActions([{ type: 'FETCHING_ACTIVITIES' }], done);
    })
    it('testing the editActivityWithoutPhoto', (done)=> {
        expect(editActivityWithoutPhoto()).toDispatchActions([{ type: 'ADDING_ACTIVITY' }], done);
    })
    it('testing the editActivity', (done)=> {
        expect(editActivity()).toDispatchActions([{ type: 'ADDING_ACTIVITY' }], done);
    })
    it('testing the deleteActivity', (done)=> {
        expect(deleteActivity()).toDispatchActions([{ type: 'DELETING_ACTIVITY' }], done);
    })
})