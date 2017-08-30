import createHttpErrorResponse from '../createHttpErrorResponse';

describe('createHttpErrorResponse', () => {
  it('returns correct format', () => {
    const error = new Error('test message');
    expect(createHttpErrorResponse(error)).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
