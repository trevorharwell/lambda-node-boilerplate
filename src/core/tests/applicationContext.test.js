import { supply } from 'di/effects';
import createGithubGateway from 'gateway/createGithubGateway';
import { initialize } from '../applicationContext';

describe('applicationContext', () => {
  describe('initialize', () => {
    it('runs without error', () => {
      const saga = initialize();

      expect(saga.next().value).toEqual(supply('githubGateway', createGithubGateway));
    });
  });
});
