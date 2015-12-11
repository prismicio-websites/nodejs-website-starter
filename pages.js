var prismic = require('express-prismic').Prismic;

exports.page = function(req, res) {
  var uid = req.params['uid']

  var p = prismic.withContext(req, res);
  p.getByUID('page', uid, function(err, page) {
    if(err) {
      res.status(500)
        .send("Error 500: " + err.message);
    }
    else if(!page) {
      res.status(404)
        .send('Not found');
    }
    else if (page.uid == uid) {
      res.render('page', {
        page: page
      })
    } else res.redirect(("/" + page.uid))
  });
};