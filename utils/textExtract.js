const textExtract = (str,keywordsStr,maxlen = 100,tag) =>{
  if (!str) return '';

  if (!str) return '';
  if (!keywordsStr || !keywordsStr.length) {
    return str.substr(Math.floor(str.length / 2),maxlen);
  }
  let strLow = str.toLowerCase();
  let keywordsStrTolow = keywordsStr.toLowerCase();
  let start = strLow.indexOf(keywordsStrTolow);
  let end = keywordsStr.length;
  if (start > -1) return `${str.substring(start - 10,start)}<${tag}>${str.substr(start,end)}</${tag}>${str.substring(end,start + maxlen - start)}`;
  return str.substr(Math.floor(str.length / 2),maxlen);
};

module.exports = textExtract;