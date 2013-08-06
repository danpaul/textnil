var modelsDir = __dirname + '/models';

config = {}

config.dbURI = 'mongodb://localhost:27017/textnil';
config.test = 'test';

config.models = {};
config.models.author = modelsDir +  '/author';
config.models.post = modelsDir +  '/post';
config.models.postNode = modelsDir +  '/post_node';
config.models.story = modelsDir +  '/story';

config.concurrencyLimit = 10;

module.exports = config;