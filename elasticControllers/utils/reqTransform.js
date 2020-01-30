'use strict';
const transform = (req) => {
  return  {
    pageTitle: req.body.pageTitle,
    pageText: req.body.pageText,
    userId: req.body.userId,
    url: req.body.fullUrl.split('://')[1],
    log: [{
      visitStartTime: req.body.visitStartTime,
      visitTimeSpent: req.body.visitTimeSpent
    }],
    visitTimeSpent: req.body.visitTimeSpent,
    protocol: req.body.fullUrl.split('://')[0]
  }
}

module.exports = transform;