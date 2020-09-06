let WebTorrent = require('webtorrent-hybrid/index');

const getTorrent = (client, magnet) => {
  return new Promise((resolve, reject) => {
    client.on('error', function (err) {
      reject('Error occured at torrent client');
    });
    client.add(
      magnet,
      { announce: ['wss://tracker.openwebtorrent.com'] },
      (torrent) => {
        torrent.deselect(0, torrent.pieces.length - 1, false); //deselect all files to download
        console.log('executed');
        resolve(torrent);
      }
    );
  });
};

const destroyPro = (client) => {
  return new Promise((resolve, reject) => {
    client.destroy((err) => {
      console.log('distroyed');
      resolve('it is resolved');
    });
  });
};

exports.torrentStarter = async (req, res, next) => {
  if (typeof client !== 'undefined') {
    console.log('destroying torrent');
    await destroyPro(client);
  }
  global.client = new WebTorrent();
  console.log('get torrent function executing');
  let torrent = await getTorrent(client, req.body.magnet);
  torrent.on('error', (err) => {
    console.log('hum torrent wala error hu' + err);
  });
  global.torrentFiles = [];
  torrent.files.forEach((e) => {
    if (e.name.endsWith('.mp4') || e.name.endsWith('.mkv')) {
      torrentFiles.push(e);
    }
  });
  res.locals.torrentFiles = torrentFiles;
  next();
};
exports.postHandler = (req, res) => {
  res.status(200).render('showFile', {
    magnet: req.body.magnet,
    files: res.locals.torrentFiles,
  });
};
