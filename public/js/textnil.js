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
textNil.traverseTree = function(tree, callback)
{
  if(tree.self != undefined)
  {
    callback(tree.self);
    if(tree.children.length != 0)
    {
      _.each(tree.children, function(child)
      {
        textNil.traverseTree(child, callback);
      });
    }
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
      ///
    },
    node: function(nodeId)
    {
      textNil.getNode(nodeId, function(results)
      {
textNil.getPostTreeData(results);

$(document.body).append(JSON.stringify(results));
      });
    },
    story: function(storyId)
    {
      textNil.getStoryRoot(storyId, function(results)
      {
$(document.body).append(JSON.stringify(results));
      })
    }
  });

  new textNil.router;
  Backbone.history.start({pushState: true});

})();

// $(document).ready(function(){
//   getStory(storyId, function(){console.log("success")});  
//   $("#add_node_button").click(function(){
//     $.ajax({
//         type: "POST",  
//         url: "/addnode",  
//         data: {text: $('#new_node_text').val()},
//         success: function(){
//         }
//     });
//   });
// });


// window.textNil = {
//    models: {},
//    collectoins: {},
//    views: {},
//    router: {},
//    posts: {}
//  };


//   textNil.models.post = Backbone.Model.extend({

//     defaults: {
//       title: 'Dan post',
//       text: 'foo'
//     },

//     url: 'api/post',

//     working: function(){
//       return this.get('title') + ' is working';
//     },

//     validate: function(attributes){
//       if(attributes.text == ''){
//         return 'Text can not be blank.';
//       }
//     }

//   });

//   textNil.views.post = Backbone.View.extend(
//   {
//     el: $('#form'),

//     initialize: function()
//     {
//       this.render();
//     },

//     render: function()
//     {
//       var variables = {postText: "some post text"};
//       var template = _.template( $("#form_template").html(), variables );
//       this.$el.html(template);
//       //this.$el.html(this.model.get('title') + ' ' + this.model.get('text'));
//     },

//     events:
//     {
//       //'submit input[type=submit]': 'add'
//       'click #submitButton': 'add'
//     },

//     add: function()
//     {
//       var setResults = this.model.set('text', $('#text').val());
//       //var text = $('#text').val();
//       if(this.model.isValid())
//       {
//         this.model.save();
//         console.log("valid!");
//       }else{
//         console.log("not valid!");
//       }
//       console.log(this.model.isValid());
//     }


//   });

//   textNil.postModel = new textNil.models.post;
//   textNil.postView = new textNil.views.post({model: textNil.postModel});

//   new textNil.router;
//   Backbone.history.start({pushState: true});

// })();