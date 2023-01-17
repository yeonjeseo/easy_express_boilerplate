const decodeBase64Image = (dataString) => {
  let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }
  response.type = matches[1];
  response.data = Buffer(matches[2], 'base64');
  return response;
};

module.exports = decodeBase64Image;
