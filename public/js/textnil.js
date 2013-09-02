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
// templates

textNil.postNodeTemplate = _.template(
    // '<li><i class="foundicon-plus"></i></li>' +
    '<li>'+
      'content: <%= content %><br />'+
      'author:<%= author %><br />' +
      'id:<%= author %>' +
      '<i class="foundicon-plus"></i>' +
      '<form class="newPostForm">' +
        '<input type="hidden" name="parentId" value="<%= id %>">' +
        '<textarea name="newPost" rows="10"></textarea>' +
        '<a class="tiny button secondary newPostSubmit">submit</a>' +
      '</form>' +
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
  var postObject = {id: treeNode.self.post,
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
  $.ajax({
    type: "POST",  
    url: "bin/process.php",
    data: dataString,
    success: callback
  });
}

//------------------------------------------------------------------------------
// data handling


//IS THIS BEING USED???
textNil.getPostTreeData = function(tree)
{
  var postsToQuery = [];
  //iterate tree
  //check if postsIds are stored
  textNil.traverseTree(tree, function(treeNode)
  {
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
// event handling

$(document).on('click', '.foundicon-plus', function(){
  var form = $(this).siblings('.newPostForm');
  if(form.is(':visible')){
    form.hide();
  }else{
    form.show();
  }
});

$(document).on('click', '.newPostSubmit', function(){

  //var form = $(this).siblings();
p($(this).siblings('[name="parentId"]').attr('value'));
p($(this).siblings('textarea').val());

  // var form = $(this).siblings('.newPostForm');
  // if(form.is(':visible')){
  //   form.hide();
  // }else{
  //   form.show();
  // }
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
    }
  });

  new textNil.router;
  Backbone.history.start({pushState: true});

})();

