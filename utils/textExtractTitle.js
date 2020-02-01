//function to display relevant text in the returned results. Takes 4 params:
// str: the content of the page
// keywordsStr: the input in the search field
// maxlen: maximum number of character that will be displayed. Defaults to 100 if not specified
// tag: used to format the searched text in the title and text. Will be most likely "strong"

const textExtract = (str,keywordsStr,maxlen = 100,tag) =>{
  if (!str) return '';
  if (!keywordsStr || !keywordsStr.length)
    return str;
  let strLow = str.toLowerCase();
  let keywordsStrTolow = keywordsStr.toLowerCase();
  let start = strLow.indexOf(keywordsStrTolow);
  let end = keywordsStr.length;
  if (start > -1) {
      return `${str.substring(0,start)}<${tag}>${str.substr(start,end)}</${tag}>${str.substring(start + maxlen - start, end)}`;
  }
   else {
      return str;
};
}

module.exports = textExtract;