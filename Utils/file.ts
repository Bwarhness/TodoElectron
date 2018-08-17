const fs = require('fs');
export let bla = {};
export function SaveFile(Content: any) {
    const json = JSON.stringify(Content);
    fs.writeFile('myjsonfile.json', json, 'utf8', (success) => {
        console.log(success);
    },
    (error) => {
        console.log(error);
    }
);
}
export function GetFile() {
    fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
            this.bla = {};
            return bla;
        } else {
        bla = JSON.parse(data);
        return bla;
    }});
}
