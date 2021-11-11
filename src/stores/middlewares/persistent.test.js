import { persistent } from './persistent';
import databases from '../../cache';

describe('persistent', () => {
  const storeState = {
    key: ['AuthenticationStore'],
    getState: () => ({ loggedIn: true }),
    setState: jest.fn(),
    resetState: jest.fn(),
    notify: jest.fn(),
    subscribe: jest.fn(),
    mutator: jest.fn()
  };
  test('simulate persistent success', () => {
    const setItem = jest.fn().mockImplementation(() => new Promise((resolve) => {
      resolve(true);
    }));
    jest.spyOn(databases, 'setItem').mockImplementation(setItem);
    const payload = {
      loggedIn: false
    };
    const next = jest.fn().mockReturnValue(payload);
    expect(persistent(storeState)(next)(payload)).toEqual(payload);
    expect(next).toBeCalledWith(payload);
    expect(setItem).toBeCalledWith(['AuthenticationStore'], { loggedIn: true });
  });
  test('simulate persistent failed', () => {
    const setItem = jest.fn().mockImplementation(() => new Promise((resolve, rejects) => {
      rejects(new Error('Simulated error'));
    }));
    jest.spyOn(databases, 'setItem').mockImplementation(setItem);
    const payload = {
      loggedIn: false
    };
    const next = jest.fn().mockReturnValue(payload);
    expect(persistent(storeState)(next)(payload)).toEqual(payload);
    expect(next).toBeCalledWith(payload);
    expect(setItem).toBeCalledWith(['AuthenticationStore'], { loggedIn: true });
  });
});
