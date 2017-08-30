import createHttpResponse from '../createHttpResponse';

describe('createHttpResponse', () => {
  it('returns correct format', () => {
    const body = { test: true };
    expect(createHttpResponse(body, 201)).toEqual({
      statusCode: 201,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
