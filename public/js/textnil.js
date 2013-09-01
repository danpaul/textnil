(function(){

/*

  Todo:
    add list of posts
    add form
    add abillity to add to posts
    add abillity to link to posts

*/

//------------------------------------------------------------------------------
// debugging  

  var storyId = '520fcf87eea1c9380d000003';
  var rootPost = '520fcf87eea1c9380d000004';
  var p = console.log;

//------------------------------------------------------------------------------
// variables

  var textNil = {};
  textNil.posts = {};

//------------------------------------------------------------------------------
// Helpers

/*
  This function is shared with the server side (in story model file).
  It performs a depth first traversal of the tree and applies the callback
    to each node. It applies the callback to nodes in this order: self, child
    silbling.
*/
textNil.traverseTree = function(tree, callback){
  if(tree.self != undefined){
    callback(tree.self);
    if(tree.children.length != 0){
      _.each(tree.children, function(child){
        textNil.traverseTree(child, callback);
      });
    }
  }
}

textNil.updatePostDictionary = function(postArray){
  _.each(postArray, function(post){
    if(!textNil.posts.hasOwnProperty(post._id)){
      textNil.posts[post._id] = {content: post.content, author: post.author};
    }
  });
}


textNil.buildStoryList = function(treeNode, elementRoot){
  $(elementRoot).append('<li>' + textNil.posts[treeNode.self.post].content + '</li>');
  if(treeNode.children.length != 0){
    var childList = $('<ul>').appendTo(elementRoot);
    _.each(treeNode.children, function(child){
      textNil.buildStoryList(child, childList);
    });
  }
}

//------------------------------------------------------------------------------
// Ajax

  textNil.getNode = function(nodeId, callback){
    $.ajax({
      type: "GET",  
      url: "/api/node/" + nodeId,
      success: callback
    });
  }

  textNil.getStoryRoot = function(storyId, callback){
    $.ajax({
      type: "GET",  
      url: "/api/story/" + storyId,
      success: callback
    });
  }

//------------------------------------------------------------------------------
// data handling

textNil.getPostTreeData = function(tree)
{
  var postsToQuery = [];
  //iterate tree
  //check if postsIds are stored
  textNil.traverseTree(tree, function(treeNode)
  {
//console.log(foo);
    if(!_.has(textNil.posts, treeNode.post))
    {
      postsToQuery.push(treeNode.post)
    }
  });

  postsToQuery = _.uniq(postsToQuery);
  console.log(postsToQuery);
  //if not, request them
  //update dictionary
}

//------------------------------------------------------------------------------
// routing

  textNil.router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'story/:id': 'story',
      'node/:id': 'node'
    },

    index: function(){
      $(document.body).append('<p>hello</p>');
    },
    node: function(nodeId)
    {
      textNil.getNode(nodeId, function(results)
      {
        textNil.getPostTreeData(results);
        //$(document.body).append(JSON.stringify(results));
      });
    },
    story: function(storyId)
    {
      textNil.getStoryRoot(storyId, function(results){
        textNil.updatePostDictionary(results.data);
        var rootList = $('<ul>').appendTo('#story_root');
        textNil.buildStoryList(results.tree, rootList);
      });
    }
  });

  new textNil.router;
  Backbone.history.start({pushState: true});

})();

