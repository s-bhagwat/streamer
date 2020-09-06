//this controller is for getting list of search result and then send it to client
// in the form of html

const cheerio = require('cheerio');
const request = require('request-promise');

const getList = async (url) => {
  try {
    htmlResult = await request.get(url);

    const $ = cheerio.load(htmlResult);

    const searchResults = [];

    $('tbody tr').each(function (index) {
      const title = $(this).find('td.name>a:nth-child(2)').text();
      const torrentUrl =
        'https://1337x.to' +
        $(this).find('td.name>a:nth-child(2)').attr('href');
      const seeds = $(this).find('td.seeds').text();
      const leeches = $(this).find('td.leeches').text();
      const comment = $(this).find('td.name>span').text();
      const size = $(this).find('td.size').text().split('B')[0] + 'B';

      searchResults.push({ title, torrentUrl, seeds, leeches, comment, size });
    });

    return searchResults;
  } catch (err) {
    console.log(err);
  }
};

exports.getTorrentList = async (req, res, next) => {
  const searchText = req.body.search;
  const url = 'https://1337x.to/search/' + searchText.replace(' ', '+') + '/1/';
  const searchResults = await getList(url);
  req.body.searchResults = searchResults;
  req.session.searchResults = searchResults;
  next();
};
exports.postHandler = (req, res) => {
  res.status(200).render('showFile', {
    search: req.body.search,
    searchResults: req.body.searchResults,
  });
};
