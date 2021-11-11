import { actions, initState as initialState } from './authentication';

const setState = jest.fn();
const getState = () => ({ ...initialState });
const dispatch = jest.fn();

describe('actions', () => {
  test('login successful', async () => {
    const state = {
      id: 'id',
      fullname: 'fullname',
      token: 'token',
      role: 'ADMIN'
    };
    actions.login(state)({ setState, getState, dispatch });
    expect(setState).toHaveBeenCalledWith({
      user: state,
      loggedIn: true,
      initiated: false
    });
  });
  test('logout - re-initialize store', async () => {
    await actions.logout()({ setState, getState, dispatch });
    expect(setState).toHaveBeenCalledWith({
      ...initialState
    });
  });
  test('onLoad - set payload into store', () => {
    actions.onLoad(initialState)({ setState, getState, dispatch });
    expect(setState).toHaveBeenCalledWith({ ...initialState });
  });

  test('setUserProfile - set setUserProfile into store', () => {
    const userProfile = {
      id: 2,
      email: 'abc@email.com',
      firstName: 'First name',
      lastName: 'Lastname',
      roles: ['ADMIN'],
      accessToken: '',
      tokenType: ''
    };
    actions.setUserProfile(userProfile)({ setState, getState, dispatch });

    expect(setState).toHaveBeenCalledWith({ user: userProfile });
  });
});
