const { parseURL } = require('./index');
describe('Parse and hash url APP', () => {
  test("Must throw and error when the url it's not valid", () => {
    try {
      parseURL('test value', 'not working url path');
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
      expect(err).toHaveProperty('message', 'The value must be a string');
    }
  });
  test('Correct parsed the url whit format and instance', () => {
    const urlFormat = '/:version/api/:collection/:id';
    const urlInstance = 'www.mydomain.com/6/api/listings/3?sort=desc&limit=10';
    const urlParsedAndHashed = parseURL(urlFormat, urlInstance);
    expect(urlParsedAndHashed).toEqual({
      version: 6,
      collection: 'listings',
      id: 3,
      sort: 'desc',
      limit: 10,
    });
  });
  test('Correct google parsed the url whit format and instance', () => {
    const urlFormat = '/:image/:id/:width/:height';
    const urlInstance = 'www.google.com/dog/3/300/600?sort=desc&limit=10&imageSearch=dog';
    const urlParsedAndHashed = parseURL(urlFormat, urlInstance);
    console.log(urlParsedAndHashed);
    expect(urlParsedAndHashed).toEqual({
      image: 'dog',
      width: 300,
      height: 600,
      id: 3,
      sort: 'desc',
      limit: 10,
      imageSearch: 'dog',
    });
  });
});
