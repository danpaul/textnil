(function(){


  window.textNil = {
    models: {},
    collectoins: {},
    views: {},
    router: {},
    posts: {}
  };

  textNil.router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'show/:id': 'show'
    },

    index: function(){
      $('#form').append('index route has been called');
    },

    show: function(id){
      $(document.body).append('show route has been called with id: ' + id);
    }

  });

  textNil.models.post = Backbone.Model.extend({

    defaults: {
      title: 'Dan post',
      text: 'foo'
    },

    url: 'api/post',

    working: function(){
      return this.get('title') + ' is working';
    },

    validate: function(attributes){
      if(attributes.text == ''){
        return 'Text can not be blank.';
      }
    }

  });

  textNil.views.post = Backbone.View.extend(
  {
    el: $('#form'),

    initialize: function()
    {
      this.render();
    },

    render: function()
    {
      var variables = {postText: "some post text"};
      var template = _.template( $("#form_template").html(), variables );
      this.$el.html(template);
      //this.$el.html(this.model.get('title') + ' ' + this.model.get('text'));
    },

    events:
    {
      //'submit input[type=submit]': 'add'
      'click #submitButton': 'add'
    },

    add: function()
    {
      var setResults = this.model.set('text', $('#text').val());
      //var text = $('#text').val();
      if(this.model.isValid())
      {
        this.model.save();
        console.log("valid!");
      }else{
        console.log("not valid!");
      }
      console.log(this.model.isValid());
    }


  });

  textNil.postModel = new textNil.models.post;
  textNil.postView = new textNil.views.post({model: textNil.postModel});

  //$(document.body).html(textNil.postView.el);
  // console.log(postView.el);


  new textNil.router;
  Backbone.history.start({pushState: true});

})();
  // var Post = Backbone.Model.extend({
  //   defaults: {
  //     title: 'Dan post',
  //     text: 'foo'
  //   },
  //   working: function(){
  //     return this.get('title') + ' is working';
  //   },
  //   validates: function(attributes){
  //     if(attibutres.text = ''){
  //       return 'Text can not be blank.';
  //     }
  //   }

  // });

  // var PostView = Backbone.View.extend({

  //   initialize: function(){
  //     this.render();
  //   },
  //   render: function(){
  //     this.$el.html(this.model.get('title') + ' ' + this.model.get('text'));
  //   }

  // });

  // var post = new Post;
  // var postView = new PostView({model: post});

  // $(document.body).html(postView.el); 

  // console.log(postView.el);

