let watch = require('node-watch');

let queueToProcess = [];
let conversionStatus = 0;

const exec = require('child_process').exec;

function startConversion() {
    if(conversionStatus === 1 || queueToProcess.length === 0) return;
    conversionStatus = 1;
    let fileToConvert = queueToProcess[0];

    exec(`ffmpeg -i ${fileToConvert} -vf scale=640:360,setsar=1:1 ${fileToConvert.replace('notprocessed', 'processed')}_360.mp4 -hide_banner`, function(error, stdout, stderr){
        exec(`ffmpeg -i ${fileToConvert} -vf scale=1280:720,setsar=1:1 ${fileToConvert.replace('notprocessed', 'processed')}_720.mp4 -hide_banner`, function(error, stdout, stderr){
            exec(`ffmpeg -i ${fileToConvert} -vf scale=427:240,setsar=1:1 ${fileToConvert.replace('notprocessed', 'processed')}_240.mp4 -hide_banner`, function(error, stdout, stderr){
                console.log('terminou: ' + fileToConvert);
                queueToProcess.shift();
                conversionStatus = 0;
                startConversion();
            });
        });
    });
}

watch('./tmp/notprocessed/', { recursive: true }, function(evt, name) {
    queueToProcess.push(name);
    startConversion();
});