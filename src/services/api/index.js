export { createRestApi, createRestService } from './rest'

import accountService from './account'
import attachmentService from './attachment'
import contactRequestService from './contactRequest'
import faqService from './faq'
import faqCategoryService from './faqCategory'
import guideService from './guide'
import jobService from './job'
import jobRequestService from './jobRequest'
import jobSectionService from './jobSection'
import magazineService from './magazine'
import magazineCategoryService from './magazineCategory'
import multimediaService from './multimedia'
import rateAndReviewService from './rateAndReview'
import reportService from './report'
import roleService from './role'
import socialNetworkService from './socialNetwork'
import userService from './user'

export {
  accountService,
  attachmentService,
  contactRequestService,
  faqService,
  faqCategoryService,
  guideService,
  jobService,
  jobRequestService,
  jobSectionService,
  magazineService,
  magazineCategoryService,
  multimediaService,
  rateAndReviewService,
  reportService,
  roleService,
  socialNetworkService,
  userService
}

export default {
  account: accountService,
  attachment: attachmentService,
  contactRequest: contactRequestService,
  faq: faqService,
  faqCategory: faqCategoryService,
  guide: guideService,
  job: jobService,
  jobRequest: jobRequestService,
  jobSection: jobSectionService,
  magazine: magazineService,
  magazineCategory: magazineCategoryService,
  multimedia: multimediaService,
  rateAndReview: rateAndReviewService,
  report: reportService,
  role: roleService,
  socialNetwork: socialNetworkService,
  user: userService
}
