var modelsDir = __dirname + '/models';
var controllersDir = __dirname + '/controllers';

config = {}

config.dbURI = 'mongodb://localhost:27017/textnil';
config.test = 'test';

config.models = {};
config.models.author = modelsDir +  '/author';
config.models.post = modelsDir +  '/post';
config.models.postNode = modelsDir +  '/post_node';
config.models.story = modelsDir +  '/story';

config.controllers = {};
config.controllers.story = controllersDir + '/story';
config.controllers.post = controllersDir + '/post';
config.controllers.postNode = controllersDir + '/post_node';

config.concurrencyLimit = 10;
config.defaulSearchDepth = 3;

module.exports = config;