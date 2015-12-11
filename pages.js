var prismic = require('express-prismic').Prismic;


function toCamelcase(name) {
  return name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase()})
};


function buildMixinName(sliceType, sliceLabel) {
  var fs = require('fs');
      path = require('path'),
      labeledFileExists = fs.existsSync(path.resolve('views/slices/' + sliceType + '-' + sliceLabel + '.jade')),
      mixinWithLabel = toCamelcase(sliceType + '-' + sliceLabel),
      mixinName = (labeledFileExists ? mixinWithLabel : toCamelcase(sliceType));
  return mixinName;

}

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
        page: page,
        helpers: {
          buildMixinName:buildMixinName
        }
      })
    } else res.redirect(("/" + page.uid))
  });
};