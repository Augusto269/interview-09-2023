const parseURL = (urlFormat, url) => {
  const urlPattern = /^(https?:\/\/)?((\w+)\.)?(\w+)\.(\w+)(\/.*)?$/;
  const match = url.match(urlPattern);

  if (!match) {
    throw new TypeError('The value must be a string');
  }
  const [, protocol, , subdomain, domain, tld, urlInstance] = match;
  const formatParts = urlFormat.split('/').slice(1);
  const instanceParts = urlInstance.split('?')[0].split('/').slice(1);
  const queryString = urlInstance.split('?')[1];
  // used slice to clean de arrays and remove the first element of the array
  const result = {};

  for (let i = 0; i < formatParts.length; i++) {
    const formatPart = formatParts[i];
    const instancePart = instanceParts[i];

    if (formatPart.startsWith(':')) {
      const key = formatPart.slice(1);
      result[key] = isNaN(instancePart) ? instancePart : parseInt(instancePart, 10);
    }
  }

  if (queryString) {
    const queryParams = queryString.split('&');
    queryParams.forEach((param) => {
      const [key, value] = param.split('=');
      result[key] = isNaN(value) ? value : parseInt(value, 10);
    });
  }

  return result;
};

module.exports = { parseURL };
