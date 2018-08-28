"use strict";
exports.__esModule = true;
var fs = require('fs');
var electron_1 = require("electron");
var bizz = electron_1.app.getPath('userData');
exports.bla = {};
function SaveFile(Content) {
    var json = JSON.stringify(Content);
    fs.writeFile(bizz + '/myjsonfile.json', json, 'utf8', function (success) {
        console.log(success);
    }, function (error) {
        console.log(error);
    });
}
exports.SaveFile = SaveFile;
function GetFile() {
    fs.readFile(bizz + '/myjsonfile.json', 'utf8', function readFileCallback(err, data) {
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
