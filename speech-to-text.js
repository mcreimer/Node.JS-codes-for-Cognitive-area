'use strict';

const SpeechToTextV1 = require('/watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');

const speech_to_text = new SpeechToTextV1({
  username: '713d8c37-a14f-4a58-b124-cc934db24ae3',
  password: 'pomOFnK6UrfH'
});

const params = {
  content_type: 'audio/mp3',
  model: 'pt-BR_NarrowbandModel'
};

// create the stream
const recognizeStream = speech_to_text.createRecognizeStream(params);

// pipe in some audio
//fs.createReadStream(__dirname + 'cod86930.MP3').pipe(recognizeStream);
fs.createReadStream('cod86930.MP3').pipe(recognizeStream);

// and pipe out the transcription
recognizeStream.pipe(fs.createWriteStream('transcricao.txt'));

// listen for 'data' events for just the final text
// listen for 'results' events to get the raw JSON with interim results, timings, etc.

recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events

['data'].forEach(function(eventName) {
  recognizeStream.on(eventName, console.log.bind(console));
});

