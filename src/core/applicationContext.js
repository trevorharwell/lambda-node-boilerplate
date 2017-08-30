import { supply } from 'di/effects';
import createGithubGateway from 'gateway/createGithubGateway';

export function* initialize() {
  yield supply('githubGateway', createGithubGateway);
}
