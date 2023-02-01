
// const ignoreFavicon = (req, res, next) => {
//   if (req.originalUrl && req.originalUrl.split('/').pop().includes('favicon')) {
//     res.status(204).end()
//   }
//   next();
// }

// module.exports = ignoreFavicon

try{
  // serve favicon
  const favicon = require('serve-favicon')
  const path = require('path')
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
}

catch(err){
  console.log(err)
}
