const scrapeIt = require("scrape-it");
var jsonfile = require("jsonfile");

var num = 0;
var page_number = 0;
var x = { bajin: [] };
var url;
var file = 'data.json';

var types = ['instrumental', 'jazz', 'pop-rock','folk','amanor','spiritual']


//var num = types.length-2;

function sc(page_number, num) {
    url = 'http://myhit.am/' + types[num] + '?limit=10&start=' + page_number;
    scrapeIt(url, {

        //.news_item_c  h2 > a

        bajin: {
            listItem: ".news_item_c"
            , data: {

                // ##midblock > div > div.yjsg-newsitems > div > div.teaserarticles.multicolumns > div:nth-child(1) > div > div.newsitem_text > p > a > img
                song: {
                    selector: "h2 > a",
                    convert: function (x) {

                        var song = x.split(" - ")[1];
                        return song;
                    }

                },
                songer: {
                    selector: "h2 > a",
                    convert: function (x) {

                        var songer = x.split(" - ")[0];
                        return songer;
                    }

                },
                caytegory: {
                    selector: "span.newsitem_category > a"
                },
                time: {
                    selector: "span.createdate > time",
                    convert: function (x) {
                        var y = x.split(" ")[3]
                        var z = x.split(" ")[4];
                        var k = x.split(" ")[2];



                        var arr = [];
                        arr.push(z, k, y);
                        console.log(arr);
                        return arr;
                    }
                },
                image: {
                    selector: 'p > a > img',
                    attr: "src"
                },

            }
        }


    }, (err, page) => {
        console.log(err);
        x.bajin.push(...page.bajin);
        console.log('x: ' + x.bajin.length);
        console.log('url: ' + url);
        console.log('types ' + types.length);
        console.log('bajin ' + page.bajin.length);
        console.log("num_1 = " + num);

        if (num == types.length) { // page.bajin.length == 0

            jsonfile.writeFile(file, x, { spaces: 2 }, function (err) {
                console.error(err);
            });
        }
        if (page.bajin.length == 0) {

            num += 1;
            console.log("num = " + num);
            page_number = -10;
        }

        if (num <= types.length) {
            setTimeout(
                () => {

                    page_number += 10;
                    //console.log(page_number);
                    sc(page_number, num);
                }, 3000);
        }
    });
}

sc(page_number, num);