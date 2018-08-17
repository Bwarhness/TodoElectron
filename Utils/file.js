"use strict";
exports.__esModule = true;
var fs = require('fs');
exports.bla = {};
function SaveFile(Content) {
    var json = JSON.stringify(Content);
    fs.writeFile('myjsonfile.json', json, 'utf8', function (success) {
        console.log(success);
    }, function (error) {
        console.log(error);
    });
}
exports.SaveFile = SaveFile;
function GetFile() {
    fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
            this.bla = {};
            return exports.bla;
        }
        else {
            exports.bla = JSON.parse(data);
            return exports.bla;
        }
    });
}
exports.GetFile = GetFile;
