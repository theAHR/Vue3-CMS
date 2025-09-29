import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reportService } from '@/services/api'

export const useReportStore = defineStore('report', () => {
  const loading = ref(false)
  const reportData = ref(null)
  const lastUpdated = ref(null)

  async function fetchContentReport() {
    loading.value = true
    try {
      const response = await reportService.getContentReport()
      if (response.data.success) {
        reportData.value = response.data.object
        lastUpdated.value = new Date(response.data.operationDate)
      }
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  function getContentDistribution() {
    if (!reportData.value) return null
    
    return {
      faqs: reportData.value.totalFaqs,
      magazines: reportData.value.totalMagazinesType1 + reportData.value.totalMagazinesType2 + 
                reportData.value.totalMagazinesType3 + reportData.value.totalMagazinesType4,
      guides: reportData.value.totalGuides,
      multimedia: reportData.value.totalMultiMedia,
      jobs: reportData.value.totalJobs
    }
  }

  function getRequestStats() {
    if (!reportData.value) return null
    
    return {
      contactRequests: {
        checked: reportData.value.totalContactRequestChecked,
        unchecked: reportData.value.totalContactRequestUnChecked,
        total: reportData.value.totalContactRequestChecked + reportData.value.totalContactRequestUnChecked
      },
      jobRequests: {
        unchecked: reportData.value.totalJobRequestUnChecked
      },
      reviews: {
        checked: reportData.value.totalCheckedReview,
        unchecked: reportData.value.totalReviewsUnChecked,
        total: reportData.value.totalCheckedReview + reportData.value.totalReviewsUnChecked
      }
    }
  }

  function getMagazineBreakdown() {
    if (!reportData.value) return null
    
    return {
      type1: reportData.value.totalMagazinesType1,
      type2: reportData.value.totalMagazinesType2,
      type3: reportData.value.totalMagazinesType3,
      type4: reportData.value.totalMagazinesType4
    }
  }

  return {
    loading,
    reportData,
    lastUpdated,
    fetchContentReport,
    getContentDistribution,
    getRequestStats,
    getMagazineBreakdown
  }
})
