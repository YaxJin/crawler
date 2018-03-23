var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/',function(req,res,next){
    superagent.get('https://github.com/expressjs/express')
        .end(function(err,sres){
            if(err){
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.social-count.js-social-count').each(function(idx,element){
                var $element = $(element);
                items.push({
                    star: $element.text().trim()
                });
            });
            $('.num.text-emphasized').each(function(idx,element){
                var $element = $(element);
                items.push({
                    number:  $element.text().trim()
                });
            });
            res.send(items);
        });
});
app.listen(3000,function(req,res){
    console.log('app is running at port 3000');
});