// this controller is for getting information of a specific torrent and
// then send back that informaiton to the client
const cheerio = require('cheerio');
const request = require('request-promise');

const getTorrent = async (torrentUrl) => {
  try {
    htmlResult = await request.get(torrentUrl);

    const $ = cheerio.load(htmlResult);

    const torrentDetails = [];
    const details = [];
    const magnet = $(
      'body > main > div > div > div > div > div > ul > li:nth-child(1) > a'
    ).attr('href');
    const description = $('.tab-content>#description').html();
    $(
      'body > main > div > div > div > div > div > ul:nth-child(2).list>li'
    ).each(function () {
      let left = $(this).find('strong').text();
      let right = $(this).find('span').text();
      details.push({ left, right });
    });
    $(
      'body > main > div > div > div > div > div > ul:nth-child(3).list>li'
    ).each(function () {
      let left = $(this).find('strong').text();
      let right = $(this).find('span').text();
      details.push({ left, right });
    });

    torrentDetails.push({
      magnet,
      description,
      details,
    });

    return torrentDetails;
  } catch (err) {
    console.log(err);
  }
};

exports.getTorrentDetails = async (req, res, next) => {
  // console.log(
  //   'quasimodo wala variable:   ' + req.session.searchResults[0].torrentUrl
  // );
  // console.log('req.params.num ' + req.params.num);
  console.log(req.session.searchResults[req.params.num].torrentUrl);
  const torrentUrl = req.session.searchResults[req.params.num].torrentUrl;
  const torrentDetails = await getTorrent(torrentUrl);
  req.body.torrentDetails = torrentDetails;
  next();
};

exports.getHandler = (req, res) => {
  res.status(200).render('showDetails', {
    torrentDetails: req.body.torrentDetails[0],
  });
};
