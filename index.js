var cheerio = require('cheerio')
var axios = require('axios')
var express = require('express')
var path = require('path')
var ejs = require('ejs')
var app = express()

var array = [];

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


function getResult(title, url) {
    axios.get(url)
        .then(function(response) {
            var data = response.data;
            // console.log(data);
            const fruits = [];
            var str = '';
            const $ = cheerio.load(data);
            $('.ColumnPostList li .PostListItem-info a').each(function(i, elem) {
                var txt = $(this).find('span').text();
                if (txt != '') {
                    // console.log($(this).attr('href'))
                    var href = $(this).attr('href');
                    str += '<li><a target="_blank" href="https://zhuanlan.zhihu.com' + href + '">' + $(this).find('span').text() + '</a></li>'
                }
            });
            array.push({
                title: title,
                html: str
            })

        })
        .catch(function(error) {
            console.log(error);
        });
}
app.get('/', function(req, res) {
    var url = "https://zhuanlan.zhihu.com/qianduanzhidian";
    var url2 = "https://zhuanlan.zhihu.com/bdwmfe";
    var url3 = "https://zhuanlan.zhihu.com/talkingdata-fsd";
    var url4 = "https://zhuanlan.zhihu.com/shimo";
    // var str = getResult(url);
    getResult("前端之巅", url);
    getResult("百度外卖", url2);
    getResult("大前端周刊", url3);
    getResult("石墨文档", url4);

    if (array.length > 0) {
        res.render('index', {
            array: array
        })
    }
})
app.listen(3000)