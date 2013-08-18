(function(){

  var textNil = {};

  var storyId = '520fcf87eea1c9380d000003';
  var data = {};

  postDictionary = {};
  postDictionary.posts = {};



  textNil.router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'story/:id': 'story',
      'show/:id': 'show'
    },

    index: function(){
console.log("index");
      //$('#form').append('index route has been called');
    },
    show: function(id){
      $(document.body).append('show route has been called with id: ' + id);
    },
    story: function(storyId)
    {
//$(document.body).append('story route has been called with id: ' + storyId);
      getStory(storyId, function(results)
      {
$(document.body).append(JSON.stringify(results));
//console.log(results);
      })

    }

  });

  new textNil.router;
  Backbone.history.start({pushState: true});



  function getStory(storyId, callback){
    $.ajax({
      type: "GET",  
      url: "/api/story/" + storyId,
      success: callback
    });   
  }

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


})();



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