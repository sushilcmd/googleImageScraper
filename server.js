var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var fs = require('fs');
var download = require('image-downloader');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = mongodb://<sushilsingh8853>:<sushilsingh8853>@ds019936.mlab.com:19936/scapimages;
var Scraper = require('images-scraper');
var google = new Scraper.Google();
var collection = 'images';
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
var port = process.env.PORT || 4500;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.post('/downloadImage', function(req, res) {
    google.list({
            keyword: req.body.keyword,
            num: 15,
            detail: true,
            nightmare: {
                show: false
            }
        })
        .then(function(images) {
            var async = require('async');
            var request = require('request');
            async.forEachSeries(images, function(image, cb) {
                var ext = image.url.split('.')[image.url.split('.').length - 1]
                if (ext.includes('?')) {
                    ext = ext.split('?')[0];
                }
                if (ext.includes('&')) {
                    ext = ext.split('&')[0];
                }
                ext = 'jpg';
                var fileName = new Date().getTime() + '.' + ext;
                options = {
                    url: image.url,
                    dest: __dirname + '/' + fileName
                }
                download.image(options)
                    .then(({
                        filename,
                        image
                    }) => {
                        console.log('File saved to', filename);
                        var Jimp = require("jimp");
                        var path = __dirname + '/' + fileName;
                        Jimp.read(path, function(err, lenna) {
                            if (err) {
                                console.log('err in converting file');
                                fs.unlink(__dirname + '/' + fileName);
                                cb();
                            } else {
                                lenna.resize(256, 256)
                                    .quality(60)
                                    .greyscale()
                                    .write(__dirname + '/public/images/' + fileName);
                                saveFile(req.body.keyword, path, __dirname + '/public/images/' + fileName, fileName);
                                cb();
                            }
                        });
                    }).catch((err) => {
                        console.log(err);
                    })
            }, function() {
                console.log('***** All Files Saved');
                res.json({
                    status: true
                });
            })
        }).catch(function(err) {
            console.log('err', err);
            res.json({
                status: false
            });
        });
});

function saveFile(keyword, path, newPath, fileName) {
    MongoClient.connect(url, function(err, db) {
        var data = {
            keywordId: keyword.split(' ').join(''),
            keyword: keyword,
            filePath: newPath,
            sortPath: '../images/' + fileName,
            fileName: fileName,
            insertedAt: new Date().getTime(),
        };
        db.collection(collection).insertOne(data, function(err, res) {
            console.log("file inserted to db " + fileName);
            deleteLocalFile(path);
        });
    })
}

function deleteLocalFile(file) {
    setTimeout(function() {
        fs.unlink(file, function() {
            console.log('deleted **** ' + file);
        });
    }, 5000);
}

app.post('/getKeywordImage', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        db.collection(collection).find({ 'keywordId': req.body.id }).sort({
            'insertedAt': -1,
        }).limit(15).toArray(function(err, item) {
            res.json(item);
        })
    })
})

app.post('/getAllData', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        db.collection(collection).find({}).toArray(function(err, item) {
            res.json(item);
        })
    })
})

http.listen(port, function() {
    console.log("listening on " + port);
});
