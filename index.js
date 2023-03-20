import fetch from 'isomorphic-unfetch';
import * as cheerio from 'cheerio';

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
  const request = await fetch('https://fejk.se/');
  const fejkData = await request.text();
  const $ = cheerio.load(fejkData);

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
