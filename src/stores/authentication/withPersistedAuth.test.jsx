import testSnapshots from 'ultis/test';
import withPersistedAuth from './withPersistedAuth';
import App from '../../App';

describe('withPersistedAuth', () => {
  const wrapper = withPersistedAuth(App);
  testSnapshots(wrapper, [
    {
      description: 'render snapshot',
      props: {}
    }
  ]);
});
