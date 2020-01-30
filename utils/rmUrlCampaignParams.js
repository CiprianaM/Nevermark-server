const rmUrlCampaignParams = (url)=>{
  const arr = url.toLowerCase().split('?');
  if (arr.length === 1) return arr[0];
  const nudeUrl = arr[0];
  let qstr = arr.length === 2 ? arr[1] : arr.slice(1).join('?');

  qstr = qstr.split('&')
    .filter(el => !el.startsWith('utm_') && !el.startsWith('fbclid'))
    .join('&');
  if (qstr.endsWith('&')) {
    qstr = qstr.slice(0,-1);
  }
  if (qstr.startsWith('&')) {
    qstr = qstr.slice(1);
  }

  return qstr.length ? `${nudeUrl}?${qstr}` : nudeUrl;
};

module.exports = rmUrlCampaignParams;