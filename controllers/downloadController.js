const fs = require('fs');

const isDownloadStarted = (file) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => reject('file is not downloaded because of timeout (5 sec) !'),
      300000
    );
    if (file.progress && file.downloaded > 0) {
      resolve('file downloading is started');
    }
  });
};

exports.download = async (req, res) => {
  console.log(res.locals.id);
  let file = torrentFiles[res.locals.id];
  file.select();
  console.log('file ka naam ' + file.name);

  // res.set('content-disposition', `attachment; filename="${req.body.file}"`);
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.set((filename = file.name));

  res.attachment(file.name);
  await isDownloadStarted(file);

  const stream = file.createReadStream();
  // stream.pipe(res);
  console.log('see file');
  stream
    .on('error', function (err) {
      return res.end(err);
    })
    .pipe(res);
};
