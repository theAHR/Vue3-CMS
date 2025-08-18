export { createRestApi, createRestService } from './rest'

export { default as accountService } from './account'
export { default as attachmentService } from './attachment'
export { default as contactRequestService } from './contactRequest'
export { default as faqService } from './faq'
export { default as faqCategoryService } from './faqCategory'
export { default as guideService } from './guide'
export { default as jobService } from './job'
export { default as jobRequestService } from './jobRequest'
export { default as jobSectionService } from './jobSection'
export { default as magazineService } from './magazine'
export { default as magazineCategoryService } from './magazineCategory'
export { default as multimediaService } from './multimedia'
export { default as rateAndReviewService } from './rateAndReview'
export { default as roleService } from './role'
export { default as socialNetworkService } from './socialNetwork'
export { default as userService } from './user'

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
  role: roleService,
  socialNetwork: socialNetworkService,
  user: userService
}
