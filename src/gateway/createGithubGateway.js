import request from 'request-promise';

const createGithubGateway = () => {
  const URL_ROOT = 'https://api.github.com';

  return {
    async getRepositoryPage() {
      return request({
        method: 'GET',
        baseUrl: URL_ROOT,
        url: '/repositories',
        json: true,
        headers: {
          'User-Agent': 'Node-Lambda-App',
        },
      });
    },
  };
};

export default createGithubGateway;
