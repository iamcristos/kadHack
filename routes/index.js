const express= require('express');
const router= express.Router();
// this is the home route
router.get('/', (req,res,next)=>{
    res.send('the landing page')
});


module.exports= router 