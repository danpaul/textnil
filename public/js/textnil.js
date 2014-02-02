(function(){

/*

  Todo:
    add list of posts
    add form
    add abillity to add to posts
    add abillity to link to posts

*/



//------------------------------------------------------------------------------
// variables

  var textNil = {};
  textNil.posts = {};
  textNil.currentStory = '';
  textNil.author = '';

//------------------------------------------------------------------------------
// debugging  

  var storyId = '520fcf87eea1c9380d000003';
  var rootPost = '520fcf87eea1c9380d000004';
  textNil.author = '520fcf87eea1c9380d000001';
  var p = console.log;

//------------------------------------------------------------------------------
// templates


// textNil.postNodeTemplate = _.template(
//     '<li>'+
//       '<%= content %><br />'+
//       '<i class="foundicon-plus"></i>' +
//         '<div contenteditable="true" class="editable newPostInput hiddenInput"></div>' +
//       '<a class="tiny button secondary newPostSubmit">submit</a>' +
//     '</li>'
//   );

textNil.postNodeTemplate = _.template(
    '<li>'+
      '<%= content %><br />'+
      '<i class="foundicon-plus"></i>' +
        '<div class="editable newPostInput hiddenInput">' +
          '<div class="input_div" contenteditable="true" ></div>' +
          '<a class="small button secondary newPostSubmit">submit</a>' +
        '</div>' +
      // '</div>' +
      // '<a class="tiny button secondary newPostSubmit">submit</a>' +
    '</li>'
  );

//------------------------------------------------------------------------------
// helpers

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
  var post = textNil.posts[treeNode.self.post];
  var postObject = {postNodeId: treeNode.self._id,
                       content: post.content,
                        author: post.author};

  if(treeNode.children.length != 0){
    var childList = $('<ul>').appendTo(
                    $(textNil.postNodeTemplate(postObject))
                    .appendTo(elementRoot));

    _.each(treeNode.children, function(child){
      textNil.buildStoryList(child, childList);
    });
  }else{
    $(elementRoot).append(textNil.postNodeTemplate(postObject));
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

textNil.addNode = function(newNodeObject, callback){
p(newNodeObject);
  $.ajax({
    type: "POST",  
    url: "/api/node",
    data: newNodeObject,
    success: callback
  });
}

//------------------------------------------------------------------------------
// data handling


//IS THIS BEING USED???
textNil.getPostTreeData = function(tree)
{
  var postsToQuery = [];
  textNil.traverseTree(tree, function(treeNode)
  {
    if(!_.has(textNil.posts, treeNode.post))
    {
      postsToQuery.push(treeNode.post)
    }
  });

  postsToQuery = _.uniq(postsToQuery);

}

//------------------------------------------------------------------------------
// event handling

$(document).on('click', '.foundicon-plus', function(){
  var inputDiv = $(this).siblings('.newPostInput');
  if(inputDiv.is(':visible')){
    inputDiv.hide();
  }else{
    inputDiv.show();
  }
});

$(document).on('click', '.newPostSubmit', function(){
  textNil.addNode({
    storyId: textNil.currentStory,
    author: textNil.author,
    postNodeId: $(this).siblings('[name="postNodeId"]').attr('value'),
    content: $(this).siblings('textarea').val()
  },function(err, record){
    console.log('success');
  });

});
 
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
        var rootList = $('<ul class="disc">').appendTo('#story_root');
        textNil.buildStoryList(results.tree, rootList);
      });
      textNil.currentStory = storyId;
    }
  });

  new textNil.router;
  Backbone.history.start({pushState: true});

})();

