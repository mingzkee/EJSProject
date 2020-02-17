//jshint <esversion:6>

/*All about this project
Purpose: To create a website using Express and EJS templates 

- App.js is the central where you ahve all the post,get request 
- Footer and headers are dynamic using the "includes" function provided by ejs. 
    - In ejs, they are always put in the /partials/ folder 
- parameters are passed in to the rendered page so that dynamic sites can be created
e.g. line 33, 43 etc.
- localhost:2500/compose is where the user will add new post using the 'posts' template 
-  
*/

const express = require("express");
const bodyParser = require("body-parser");
let ejs = require("ejs");
const _ = require('lodash');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has"
const aboutContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
const contactContent = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."

//Global Variables
const globalPost = []
const content = [homeStartingContent,aboutContent,contactContent];
let ogTopic=""

app.get('/',function(req,res){

    res.render('home',{content:content, posts:globalPost
    });
   

})

app.get('/about',function(req,res){
    res.render("about",{aboutContent:aboutContent})
})
app.get('/contact',function(req,res){
    res.render('contact',{contactContent:contactContent});
})

app.get('/compose',function(req,res){
    res.render('compose');
})

app.get('/posts/:topic',function(req,res){

    ogTopic= req.params.topic
    const topicTitle = _.lowerCase(ogTopic);
   
    console.log("name of the topic = "+ topicTitle)
    globalPost.forEach(function(post){
        if(_.lowerCase(post.title) == topicTitle){
            console.log("Match Found");
            res.render('post',{title:post.title, content:post.content});
        }
    })
   

})


//Post methods
app.post('/compose',function(req,res){
    let postTitle = req.body.postTitle;
    let postBody  = req.body.postBody;
   
    const post = {
        title: postTitle,
        content: postBody
    } 
    globalPost.push(post);
    
    res.redirect('/')

   
})

app.listen(2500,function(){
    console.log("Server started on port 2500");
})