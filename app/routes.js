//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
  res.locals.currentURL = req.originalUrl; //current screen
  res.locals.prevURL = req.get('Referrer'); // previous screen
  req.folder = req.originalUrl.split('/')[1]; //folder, e.g. 'current'
  req.subfolder = req.originalUrl.split('/')[2]; //sub-folder e.g. 'service'
  res.locals.folder = req.folder; // what folder the url is
  res.locals.subfolder = req.subfolder; // what subfolder the URL is in
  console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
  next();
});



// Route index page
router.get('/', function (req, res) {
  res.render('./index')
});



// Set service name based on sub folders for different prototypes
router.get('/grants-prototype/views/water/*', function(req, res, next){
  res.locals['serviceName'] = 'Apply for a large grant for a water resource management project'
  next()
});

// Set service name based on sub folders for different prototypes
router.get('/grants-prototype/views/slurry/*', function(req, res, next){
  res.locals['serviceName'] = 'Apply for a large grant for slurry equipment'
  next()
});

router.get('/v2/*', function(req, res, next){
  res.locals['serviceName'] = 'Apply for a large countryside productivity grant for water'
  next()
});

router.get('/s1/*', function(req, res, next){
  res.locals['serviceName'] = 'Guidance on Salmonella rules'
  next()
});

// Start folder specific route
router.use('/grants-prototypet', require('./views/grants-prototype/routes/_routes-water'));
router.use('/grants-prototype', require('./views/grants-prototype/routes/_routes-slurry'));

router.use('/s1', require('./views/s1/routes/_routes'));


// Task list status settings



//*****************************************************
// TASK LIST PAGE START //


// TASK LIST PAGE END //


