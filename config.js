config = {}

config.modelsDirectory = __dirname + '/models';
config.model = {};
config.model.author = config.modelsDirectory + '/author';
config.model.post = config.modelsDirectory + '/post';

config.dbURI = 'mongodb://localhost:27017/textnil';

config.postModelName = 'post';
config.authorSchemaName = 'author';

//config.neoURI = 'http://localhost:7474';

//config.neoURI = 'http://localhost:7474/db/data/cypher';

//config.neoURI = 'http://localhost:7474/db/data/';

module.exports = config;