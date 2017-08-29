import request from 'request-promise';
import createGithubGateway from '../createGithubGateway';

jest.mock('request-promise');

describe('createGithubGateway', () => {
  it('creates without error', () => {
    expect(createGithubGateway()).toBeDefined();
  });
  describe('getRepositoryPage', () => {
    let getRepositoryPage;
    beforeEach(() => {
      getRepositoryPage = createGithubGateway().getRepositoryPage;
    });
    it('calls request correctly', async () => {
      const mockResponse = [];
      request.mockReturnValueOnce(new Promise((resolve) => resolve(mockResponse)));
      const response = await getRepositoryPage();
      expect(response).toEqual(mockResponse);
      expect(request.mock.calls[0][0]).toEqual({
        method: 'GET',
        baseUrl: 'https://api.github.com',
        url: '/repositories',
        json: true,
        headers: {
          'User-Agent': 'Node-Lambda-App',
        },
      });
    });
  });
});
