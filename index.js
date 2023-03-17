import got from 'got';
import cheerio from 'cheerio';

const formatKeyName = (name) => {
  return name
    .toLowerCase()
    .replace(/\s/g, '_')
    .replace(/-/g, '_')
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o');
};

const fejk = async () => {
  const request = await got('https://fejk.se/');
  const $ = await cheerio.load(request.body);

  function mapData() {
    const [key, value] = $(this).children().text().split(':');

    return {
      [formatKeyName(key)]: value,
    };
  }

  const data = $('.table-center tr')
    .map(mapData)
    .get()
    .reduce((result, current) => {
      return Object.assign(result, current);
    }, {});

  return {
    data,
  };
};

export default fejk;
