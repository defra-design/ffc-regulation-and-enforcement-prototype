const express = require('express')
const router = express.Router()

const serviceName = 'Apply for a large countryside productivity grant for water'

// console.log( 'This is the _routes file' );
// console.log( serviceName );

// Add your routes here - above the module.exports line

//*****************************************************
// TASK LIST PAGE START //
router.get('*XXX/task-list', function (req, res) {

  console.log( 'This is the task list' );

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''

    //part0101status = req.session.data['part0101status']
    part0101status = 'Completed'
    part0101statusClass = ''

    part0102status = 'In progress'
    part0102statusClass = 'govuk-tag--blue'

    part0201status = 'Not started'
    part0201statusClass = 'govuk-tag--grey'

    part0202status = 'Cannot start yet'
    part0202statusClass = 'govuk-tag--grey'


  res.render( './' + req.originalUrl, {
    serviceName: serviceName,
    part0101status: part0101status,
    part0101statusClass: part0101statusClass,
    part0102status: part0102status,
    part0102statusClass: part0102statusClass,
    part0201status: part0201status,
    part0201statusClass: part0201statusClass,
    part0202status: part0202status,
    part0202statusClass: part0202statusClass
  })
})

// TASK LIST PAGE END //


router.get('*/farming-type', function (req, res) {

  // test to check this section isn't completed...

if ( req.session.data['project_eligibility_status'] != 'Completed' ){

  req.session.data['project_eligibility_status'] = 'In progress'
  req.session.data['project_eligibility_status_class'] = 'govuk-tag--blue'

}

res.render( './' + req.originalUrl )

});


router.get('*/check-answers-project-eligibility', function (req, res) {

req.session.data['completed_sections'] = '1'

req.session.data['project_eligibility_status'] = 'Completed'
req.session.data['project_eligibility_status_class'] = ''

if ( req.session.data['theme_eligibility_status'] != 'Completed' ){
  req.session.data['theme_eligibility_status'] = 'Not started'
}

res.render( './' + req.originalUrl )

});


router.get('*/project-items', function (req, res) {

if ( req.session.data['theme_eligibility_status'] != 'Completed' ){

req.session.data['theme_eligibility_status'] = 'In progress'
req.session.data['theme_eligibility_status_class'] = 'govuk-tag--blue'

}

res.render( './' + req.originalUrl )

});


router.get('*/check-answers-theme-eligibility', function (req, res) {

req.session.data['completed_sections'] = '2'

req.session.data['theme_eligibility_status'] = 'Completed'
req.session.data['theme_eligibility_status_class'] = ''

if ( req.session.data['contact_details_status'] != 'Completed' ){
  req.session.data['contact_details_status'] = 'Not started'
}

res.render( './' + req.originalUrl )

});


router.get('*/business', function (req, res) {


  if ( req.session.data['contact_details_status'] != 'Completed' ){

req.session.data['contact_details_status'] = 'In progress'
req.session.data['contact_details_status_class'] = 'govuk-tag--blue'

}

res.render( './' + req.originalUrl )

});


router.get('*/check-answers-contact-details', function (req, res) {

req.session.data['completed_sections'] = '3'

req.session.data['contact_details_status'] = 'Completed'
req.session.data['contact_details_status_class'] = ''

if ( req.session.data['project_benefits_status'] != 'Completed' ){
  req.session.data['project_benefits_status'] = 'Not started'
}

var backUrl

if (req.session.data['applying'] == 'own') {
  backUrl = 'your-details' }
else {
  backUrl = 'applicant-details'
  }

  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  })

});

router.get('*/irrigation', function (req, res) {

  if ( req.session.data['project_benefits_status'] != 'Completed' ){

  req.session.data['project-benefits-status'] = 'In progress'
  req.session.data['project-benefits-status-class'] = 'govuk-tag--blue'

}

res.render( './' + req.originalUrl )

});


router.get('*/check-answers-project-benefits', function (req, res) {

req.session.data['completed_sections'] = '4'

req.session.data['project_benefits_status'] = 'Completed'
req.session.data['project_benefits_status_class'] = ''

res.render( './' + req.originalUrl )

});



// Question routing

router.get('*/farming-type-answer', function (req, res) {

  var farmingType = req.session.data['farming-type']

  if (farmingType == "none"){res.redirect('../views/farming-type-fail')}
  else {res.redirect('../views/legal-status')}
});

router.post('*/legal-status-answer', function (req, res) {

  var legalStatus = req.session.data['legal-status']

  if (legalStatus == "none"){res.redirect('../views/legal-status-fail')}
  else {res.redirect('../views/country')}
});

router.post('*/country-answer', function (req, res) {

  var country = req.session.data['country']

  if (country == "england"){res.redirect('../views/tenancy')}
  else {res.redirect('../views/country-fail')}
});

router.post('*/tenancy-answer', function (req, res) {

  var tenant = req.session.data['tenancy']

  if (tenant == "no"){res.redirect('../views/project-cost')}
  else {res.redirect('../views/tenancy-length')}
});

router.post('*/tenancy-length-answer', function (req, res) {

  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength == "no"){res.redirect('../views/tenancy-length-condition')}
  else {res.redirect('../views/project-cost')}
});

router.post('*/project-cost-answer', function (req, res) {

  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500 ){res.redirect('../views/project-cost-fail')}
  else {res.redirect('../views/remaining-costs')}

})

router.post('*/remaining-costs-answer', function (req, res) {

  var remainingCosts = req.session.data['remaining-costs']
  var publicMoney = req.session.data['public-money']

  if (remainingCosts == "no" ){res.redirect('../views/remaining-costs-fail')}
  if (publicMoney == "yes" ){res.redirect('../views/remaining-costs-fail')}
  else {res.redirect('../views/project-start')}

})

router.post('*/project-start-answer', function (req, res) {

  var projectStart = req.session.data['project-start']

  if (projectStart == "yes"){res.redirect('../views/project-start-fail')}
  else {res.redirect('../views/check-answers-project-eligibility')}
});

router.post('*/planning-required-answer', function (req, res) {

  var planningRequired = req.session.data['planning-required']

  if (planningRequired == "yes"){res.redirect('../views/planning-permission')}
  else {res.redirect('../views/abstraction-required')}
});

router.post('*/planning-permission-answer', function (req, res) {

  var planningPermission = req.session.data['planning-permission']

  if (planningPermission == "yes"){res.redirect('../views/abstraction-required')}
  else {res.redirect('../views/planning-progress')}
});

router.post('*/planning-progress-answer', function (req, res) {

  var planningProgress = req.session.data['planning-progress']

  if (planningProgress == "yes"){res.redirect('../views/abstraction-required')}
  else {res.redirect('../views/planning-permission-fail')}
});

router.post('*/abstraction-required-answer', function (req, res) {

  var abstractionRequired = req.session.data['abstraction-required']

  if (abstractionRequired == "yes"){res.redirect('../views/abstraction-licence')}
  else {res.redirect('../views/check-answers-theme-eligibility')}
});

router.post('*/abstraction-licence-answer', function (req, res) {

  var abstractionLicence = req.session.data['abstraction-licence']

  if (abstractionLicence == "yes"){res.redirect('../views/abstraction-variation')}
  else {res.redirect('../views/abstraction-licence-fail')}
});

router.post('*/abstraction-variation-answer', function (req, res) {

  var abstractionVariation = req.session.data['abstraction-variation']

  if (abstractionVariation == "yes"){res.redirect('../views/abstraction-variation-condition')}
  else {res.redirect('../views/check-answers-theme-eligibility')}
});

router.post('*/business-answer', function (req, res) {

  var businessAnswer = req.session.data['new-business']

  if (businessAnswer == "no"){res.redirect('../views/new-business-condition')}
  else {res.redirect('../views/applying')}
});

router.post('*/applying-answer', function (req, res) {

  var applyingAnswer = req.session.data['applying']

  if (applyingAnswer == "other"){res.redirect('../views/preferred-contact')}
  else {res.redirect('../views/your-details')}
});

router.get('*/your-details', function (req, res) {

  var backUrl

  if (req.session.data['applying'] == 'own') {
    backUrl = 'applying' }
  else {
    backUrl = 'preferred-contact'
    }

  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  })

})

router.post('*/your-details-answer', function (req, res) {

  var applyingAnswer = req.session.data['applying']

  if (applyingAnswer == "other"){res.redirect('../views/applicant-details')}
  else {res.redirect('../views/check-answers-contact-details')}
});

router.post('*/preferred-contact-answer', function (req, res) {

  var preferredContact = req.session.data['preferred-contact']

  if (preferredContact == "just the applicant"){res.redirect('../views/applicant-details')}
  else {res.redirect('../views/your-details')}
});


router.get('*/applicant-details', function (req, res) {

  var backUrl

  if (req.session.data['preferred-contact'] == 'just the applicant') {
    backUrl = 'preferred-contact' }
  else {
    backUrl = 'your-details'
    }

  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  })

})

router.post('*/irrigation-answer', function (req, res) {

  var irrigationAnswer = req.session.data['irrigation']

  if (irrigationAnswer == "improve"){res.redirect('../views/current-irrigation')}
  else {res.redirect('../views/new-irrigation')}
});

module.exports = router
