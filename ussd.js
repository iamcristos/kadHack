const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose= require('mongoose');
const port = process.env.PORT || 3030
//model schema
responseSchema= mongoose.Schema({
    comment : {
        type:String
    }
});
userResponse= mongoose.model("userResponse",responseSchema)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('This is a USSD for hack kaduna by team Code fire')
})
app.post('*', (req, res) => {
    let {sessionId, feedback, comment, text} = req.body
    if (text == '') {
      // This is the first request. Note how we start the response with CON
      let response = `CON welcome kindly select your prefered option
      1. health project
      2. About kaduna health sector`
      res.send(response);
      
    } else if (text == '1') {
      // Business logic for first level response
      let response = `CON Choose your prefered local government
      1. Jada
      2. Atiba`
      res.send(response);
      
    } else if (text == '2') {
      // Business logic for first level response
      let response = `END kaduna state government is aimed at improving the health facilities of all kaduna resident`
      res.send(response);
      
    } else if (text == '1*1') {
      // Business logic for first level response
      let response = `CON here are the current projects in Jada local government
      1. new maleria drugs
      2. polio immunization `
 // This is a terminal request. Note how we start the response with END
  res.send(response)
} else if (text == '1*2') {
 // This is a second level response where the user selected 1 in the first instance
 let response = `CON here are the current projects in Atiba
      1. free HIV drugs and seminar
      2. immunization against yellow fever`
 // This is a terminal request. Note how we start the response with END
 res.send(response)
}else if(text == '1*1*1'){
  let response = `CON the kaduna state ministry have announced the distribution of free malaria drugs in Jada all resisdence are advised to visit the hospital
    1. Comment
    2. Back`
  res.send(response)
}else if(text == '1*1*1*1'){
  let response = `END your response ${comment}`
  userResponse.save(comment)
} else if (text == '1*1*1*2') {
  text == ''
}
else if(text == '1*1*2'){
  let response = `CON the kaduna government have now embarked on a project to fulfill it promises against making kaduna a polio free town
  1. Comment
  2. Back`
res.send(response)
}else if(text == '1*1*2*1'){
let response = `END your response ${comment}`
userResponse.save(comment)
res.send(response)
}  else if (text == '1*1*1*2') {
  text == ''
}else if(text == '1*2*1'){
  let response = `CON kaduna state government now is now giving free seminar plus drugs for HIV
  1. Comment
  2. Back`
res.send(response)
}else if(text == '1*2*1*1'){
let response = `END your response ${comment}`
userResponse.save(comment)
res.send(response)
}  else if (text == '1*2*1*1') {
  text == ''
}
  
else if (text == '1*2*2') {
  let response = `CON kaduna state government
  1. Comment
  2. Back`
res.send(response)
}else if(text == '1*2*2*1'){
let response = `END your response ${comment}`
userResponse.save(comment)
res.send(response)
}  else if (text == '1*2*2*2') {
  text == ''
}
else {
 res.status(400).send('Bad request!')
}
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
  })    