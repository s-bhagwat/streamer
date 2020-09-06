const fs = require('fs');
exports.getHandler = (req, res) => {
  res.status(200).render('stream', {
    id: res.locals.id,
    fileName: torrentFiles[res.locals.id].name,
  });
};

exports.stream = (req, res) => {
  let range = req.headers.range;

  console.log('hum range hu browser wala ' + range);

  if (!range) {
    // 416 Wrong range
    return res.sendStatus(416);
  }
  let file = torrentFiles[res.locals.id];
  file.select();
  console.log('file ka naam ' + file.name);
  let positions = range.replace(/bytes=/, '').split('-');

  let start = parseInt(positions[0], 10);

  let file_size = file.length;

  let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;

  let chunksize = end - start + 1;

  let head = {
    'Content-Range': 'bytes ' + start + '-' + end + '/' + file_size,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(206, head);

  let stream_position = {
    start: start,
    end: end,
  };

  const stream = file.createReadStream(stream_position);

  stream.pipe(res);
  // const stream = file.createReadStream();
  // const destination = fs.createWriteStream(file.name);
  // stream.pipe(destination);
  console.log('see file');
  stream.on('error', function (err) {
    return res.end(err);
  });
};
