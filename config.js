config = {}

config.dbURI = 'mongodb://localhost:27017/textnil';

config.modelsDirectory = __dirname + '/models';
config.models = require(config.modelsDirectory);
//config.model = {};

module.exports = config;