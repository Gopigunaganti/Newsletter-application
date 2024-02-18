const express =require("express")
const bodyparser=require("body-parser")
const request=require("request")
const app=express()
const https=require("https")
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html")
});
app.post("/",function(req,res){
  const firstName=req.body.Fname
  const lastName=req.body.Lname
  const emailid=req.body.email
  var data={
    members:[
      {email_address: emailid,
        status:"Subscribed!",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  }
  const jsonData=JSON.stringify(data)
  const url="https://us12.api.mailchimp.com/3.0/lists/4846cd723b"
  const options={
    method:"POST",
    auth:"gopi7:c8b96fef7f5b04ef3b546029d042c8b9-us12"
  }
  const request =https.request(url,options,function(response){
    if (response.statusCode===2000){
      res.sendFile(__dirname+"/success.html")
    }
    else{
        res.sendFile(__dirname+"/failure.html")

    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });

  })
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/")

})


app.listen(3000,function(req,res){
  console.log("port 3000 succesfully connected to the servers")
});


//UNIQUE ID 4846cd723b
// API KEY c8b96fef7f5b04ef3b546029d042c8b9-us12
