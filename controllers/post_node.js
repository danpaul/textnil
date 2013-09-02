var Post = require(config.models.post).model;
var PostNode = require(config.models.postNode).model;

/*
	Inserts new `postNode` into story and calls `callback` with two arguments
		(error, record).
	`nodeObject` should conaint the following properties:
		`post`: text of new post
		`postNodeID`: id of the parent `postNode`. The new post will be a child
			of the parent.
		`storyId`: id of the story the post belongs to.
*/

var insertNewPost = exports.insertNewPost = function(nodeObject, callback)
{
	//create a new post
//console.log(nodeObject);

	Post.create({content: nodeObject.content, author: nodeObject.author}, function(err, post){
		if(err){console.log(err)
		}else{
			//create new `postNode`
			PostNode.create(
			{
				post: post._id,
				parent: nodeObject.postNodeId,
				story: nodeObject.storyId
			},function(err, record)
			{
				if(err){console.log(err)
				}else{
console.log(record);
				}
			})
			//console.log(post);
		}
	});
}

/*
{ story: '520fcf87eea1c9380d000003',
  author: '520fcf87eea1c9380d000001',
  postNodeId: '520fcf87eea1c9380d000009',
  content: 'asdf' }
{ __v: 0,
  content: 'asdf',
  author: 520fcf87eea1c9380d000001,
  _id: 5225085b8e2366a23f000002 }
*/

/*
{ post: 520fcf87eea1c9380d000006,
  _id: 520fcf87eea1c9380d00000a,
  __v: 0,
  depth: 2,
  parent: 520fcf87eea1c9380d000009,
  story: 520fcf87eea1c9380d000003 }
  */