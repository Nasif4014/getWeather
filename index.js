var express = require('express');
var app=express();
var request=require('request');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use('/',express.static('public'));
app.use('/public',express.static('public'))
app.use('/getWet',(req,res)=>{
    console.log(req.body);
    var city=req.body.city;
    var query='?';
    if(city){query+= 'q='+city + '&units=imperial'+'&'+'appid=3285f1b74e5c981d00a6c936c402f615'} ;
    var url='https://api.openweathermap.org/data/2.5/weather'+query;
  
    request(url,(err,response,body)=>{

        var weat = JSON.parse(body);
        console.log(weat);
        var city=weat.name;
        var n=((weat.main.temp)-32)*(5/9);
        var temp= Math.ceil(n);
        var pressure=weat.main.pressure;
        var humidity=weat.main.humidity;
        var description = weat.weather[0].description;
        var wind=weat.wind.speed;
        res.render('index',{temp:temp,pressure:pressure,city:city,des:description,humidity:humidity,wind:wind})
    })

})
const port = process.env.PORT || 3000 ;

app.listen(port,()=>{
    console.log('listening good on port 3000,copy')
})