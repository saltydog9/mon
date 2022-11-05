const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

store=[];
posts=[];
a=0;
// ---------------------------------------------------
mongoose.connect("mongodb://0.0.0.0:27017/mon1");
const testSchema = ({
    question: String,
    answer: String
})
const Test = mongoose.model("Test",testSchema);
// ----------------data-------------------------------
const test1 = new Test({
    question:"what is the speed of sound",
    answer: "761"
})
const test2 = new Test({
    question: "How many pounds are in a ton",
    answer: "2000 pounds"
})
const test3 = new Test({
    question: "How many grams are in a pounds",
    answer: "256 grams"
})
const arry = [test1,test2,test3]
// ------------insert---------------------------------

 
// ---------------------------------------------------
app.get("/",function(req,res){
    Test.find({},function(err,stuff){
        if(stuff.length === 0){
            Test.insertMany(arry,function(err){
                if(err){
                    console.log(err);
                }
                else {
                    console.log("items inserted");
                    res.redirect("/")
                }
            })
            
        }
        else {
            if(a%2==0){
            rand = Math.floor(Math.random() * stuff.length);
            x = stuff[rand]
            res.render("home",{
                things: x.question,
                things1: ""
            });
        }
            else {
                res.render("home",{
                    things: "",
                    things1: x.answer
                })
            }
            a++;
        }
         

    })

})
// ---------------------------------------------------------
app.get("/compose",function(req,res){
    a=0;
    res.render("compose");
})
// -----------display------------------------------
app.get("/display",function(req,res){
    a=0;
    Test.find({},function(err,stuff){
        if(err){
            console.log(err)
        }
        else {
            res.render("display",{
                things: stuff
            });

        }

    })
});
//-------------------------------------------------
app.post("/compose",function(req,res){
    post = {
        question: req.body.testQuestion,
        answer: req.body.testAnswer
    }
    const test = new Test({
        question: req.body.testQuestion,
        answer: req.body.testAnswer
    })
    test.save();
    posts.push(post);
    console.log(posts);
    res.redirect("display");
})
app.post("/delete",function(req,res){
    const checkedBox = req.body.checkbox;
        Test.findByIdAndRemove(checkedBox,function(err){
            if(err){
                console.log(err);
            }
            else {
                console.log("items deleted")
            }
        })
    console.log(checkedBox);
    res.redirect("display");
})

// -----------------listen----------------------------
app.listen(3000,function(){
    console.log("server is running mon7");
})