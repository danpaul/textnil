config = {}

config.modelsDirectory = __dirname + '/models';

config.dbURI = 'mongodb://localhost:27017/textnil';

config.postModelName = 'post';
config.authorSchemaName = 'author';

//config.neoURI = 'http://localhost:7474';

//config.neoURI = 'http://localhost:7474/db/data/cypher';

//config.neoURI = 'http://localhost:7474/db/data/';

module.exports = config;