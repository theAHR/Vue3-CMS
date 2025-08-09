<template>
  <div class="p-board">
    <div class="container">
      <section class="board-section">
        <div v-for="(group, groupIndex) in groupedItems" :key="groupIndex">
          <span v-if="groupIndex !== 0" class="p-board__item__line" :style="{ width: lineWidth(group) }" />

          <div class="p-board__row">
            <div 
              v-for="item in group" 
              :key="`${groupIndex}.${item.position}`" 
              :class="['p-board__item', `p-board__item--order-${item.orderMd || 'default'}`]"
            >
              <div class="member-card">
                <span v-if="groupIndex !== 0" class="p-board__item__rope p-board__item__rope--bottom" />

                <div class="p-board__item__thumbnail">
                  <img v-if="item.image" :src="`/src/assets/img/${item.image}`" :alt="item.fullName" />
                  <div v-else class="p-board__item__placeholder">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>

                <div class="p-board__item__content">
                  <h3 class="member-name">{{ item.fullName }}</h3>
                  <p class="member-position">{{ item.position }}</p>
                  
                  <div class="p-board__item__separator"></div>
                  
                  <div v-if="item.description" class="p-board__item__description">
                    <ul class="p-board__item__description-list">
                      <li 
                        v-for="(line, index) in getVisibleItems(item.description, isAllExpanded)" 
                        :key="index" 
                        class="description-item"
                      >
                        <span class="bullet-point">•</span>
                        <span class="description-text">{{ line }}</span>
                      </li>
                    </ul>
                    
                    <div v-if="item.description.length > 3" class="read-more-container">
                      <button 
                        @click="toggleExpanded()"
                        class="read-more-btn"
                      >
                        <span class="read-more-btn-text">{{ isAllExpanded ? 'نمایش کمتر' : 'نمایش بیشتر' }}</span>
                        <svg class="read-more-btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <span v-if="groupIndex !== groupedItems.length - 1" class="p-board__item__rope" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const title = 'اعضای هیئت مدیره'

const items = [
  {
    fullName: 'سید سعید رضا پور',
    position: 'رئیس هیئت مدیره',
    level: 2,
    orderMd: 1,
    image: 'rezapour.png',
    description: [
      'عضو هیأت مدیره شرکت فناوریهای اطلاعاتی و مالی توزیع شده',
      'عضو هیأت مدیره شرکت پرداخت الکترونیک سداد',
      'عضو هیأت مدیره شرکت اعتماد پردازش سداد',
      'عضو هیأت مدیره شرکت فرابوم کسب و کار نوآوری باز',
      'معاونت اقتصادی و سرمایه انسانی شرکت داده ورزی سداد (IT بانک ملی ایران)',
      'آغاز همکاری از دی ۱۳۹۸ تاکنون'
    ]
  },
  {
    fullName: 'مهدی تکبیری',
    position: 'مدیرعامل و نایب رئیس هیئت مدیره',
    level: 2,
    orderMd: null,
    image: 'takbiri.png',
    description: [
      'دکترای معماری سیستم‌های کامپیوتری از دانشگاه شهید بهشتی',
      'رئیس اداره کل خدمات نوین بانک ملی ایران',
      'رئیس اداره کل انفورماتیک و خدمات نوین بانک ملی ایران',
      'عضو کمیسیون انفورماتیک بانک های کشور',
      'عضو کار گروه‌های فناوری بانک مرکزی',
      'عضو کارگروه‌های فناوری اطلاعات در وزارت اقتصاد و دارائی',
      'رئیس اداره کل نظام‌های پرداخت بانک ملی ایران',
      'رئیس هیات مدیره توسعه پیشگامان پویا(کارت اعتباری)',
      'رئیس هیات مدیره هلدینگ داده‌ورزی سداد',
      'عضو هیات مدیره شرکت فناوری اطلاعات راهبر سداد (بله)',
      'مدیر‍‌عامل شرکت پارس تکنولوژی سداد',
      'رئیس هیات مدیره شرکت پرداخت الکترونیک سداد',
      'استاد دانشگاه شهید بهشتی و دانشگاه‌های آزاد',
    ]
  },
  {
    fullName: 'مسعود صادق پور',
    position: 'عضو هیئت مدیره موظف',
    level: 2,
    orderMd: 1,
    image: 'sadeghpour.png',
    description: [
      'عضوگروه تخصصی راه و بنادرو مسکن - نمایندگی ویژه جمهوری اسلامی ایران در امور راهبردی چین',
      'مسئول برقراری تفاهم نامه همکاری 5 ساله جمهوری خودمختار داغستان و شرکت پارس تکنولوژی سداد بانک ملی ایران',
      'عضو اتاق بازرگانی ایران و آفریقا',
      'نماینده اتاق ایران و آفریقا جهت شناسایی فرصت های سرمایه گذاری در کشور موریس (در معیت سفیر محترم جمهوری اسلامی ایران)',
      
    ]
  }
]

const isAllExpanded = ref(false)

const groupedItems = computed(() => {
  const groups = {}
  items.forEach(item => {
    if (!groups[item.level]) {
      groups[item.level] = []
    }
    groups[item.level].push(item)
  })
  return Object.values(groups)
})

const getVisibleItems = (description, isExpanded) => {
  if (isExpanded) {
    return description
  }
  return description.slice(0, 3)
}

const toggleExpanded = () => {
  isAllExpanded.value = !isAllExpanded.value
}

const lineWidth = (group) => {
  return `${100 - 100 / group.length}%`
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.p-board {
  padding: 60px 0;
  min-height: 100vh;
}

.p-board__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  margin: 0 auto;
  max-width: 1200px;
}

.p-board__item {
  flex: 1;
  min-width: 320px;
  max-width: 420px;
  margin-bottom: 50px;
  display: flex;
}

.member-card {
  background: white;
  border-radius: 16px;
  padding: 40px 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.member-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #cacaca;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.member-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.member-card:hover::before {
  transform: scaleX(1);
}

.p-board__item__thumbnail {
  width: 160px;
  height: 160px;
  margin: 0 auto 25px;
  border-radius: 50%;
  overflow: hidden;
  background: #f8f9fa;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.member-card:hover .p-board__item__thumbnail {
  transform: scale(1.05);
}

.p-board__item__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.member-card:hover .p-board__item__thumbnail img {
  transform: scale(1.02);
}

.p-board__item__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #9aa0a6;
}

.p-board__item__content {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.member-name {
  font-family: 'YekanBold';
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.member-position {
  font-family: 'YekanMedium';
  font-size: 1rem;
  color: #5f6368;
  padding: 8px 16px;
  background: #f8f9fa;
  border-radius: 20px;
  display: inline-block;
}

.p-board__item__separator {
  width: 50px;
  height: 3px;
  margin: 25px auto;
  background-color: #cacaca;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.member-card:hover .p-board__item__separator {
  width: 70px;
}

.p-board__item__description {
  text-align: right;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.p-board__item__description-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.description-item {
  font-family: 'YekanRegular';
  font-size: 0.95rem;
  line-height: 1.4;
  color: #5f6368;
  margin-bottom: 12px;
  padding: 8px 20px 8px 8px;
  position: relative;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.description-item:hover {
  background: rgba(66, 133, 244, 0.05);
}

.bullet-point {
  color: #a8a8a8;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
}

.description-text {
  flex: 1;
} 

.read-more-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 15px;
}

.read-more-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  color: #438d54;
  text-decoration: none;
  font-family: 'YekanMedium';
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 5px 0;
  background: none;
  border: none;
  cursor: pointer;
}

.read-more-btn:hover {
  color: #438d54;
  text-decoration: none;
  transform: translateX(-3px);
}

.read-more-btn-arrow {
  color: inherit;
  transition: transform 0.3s ease;
}

.read-more-btn:hover .read-more-btn-arrow {
  transform: translateX(-3px);
}

.read-more-btn-text {
  color: inherit;
}

.p-board__item__line {
  display: block;
  height: 1px;
  margin: 30px auto;
  background: #dadce0;
  width: 80%;
}

.p-board__item__rope {
  position: relative;
  display: block;
  margin: 20px auto 0;
  height: 30px;
  width: 1px;
  background: #dadce0;
}

.p-board__item__rope::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -3px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #dadce0;
}

.p-board__item__rope--bottom {
  margin-top: 0;
  margin-bottom: 20px;
}

.p-board__item__rope--bottom::before {
  top: auto;
  bottom: -4px;
}

@media (max-width: 1024px) {
  .p-board {
    padding: 50px 0;
  }
  
  .p-board__row {
    gap: 40px;
  }
  
  .p-board__item {
    min-width: 300px;
    max-width: 380px;
  }
  
  .p-board__item__thumbnail {
    width: 140px;
    height: 140px;
  }
  
  .member-name {
    font-size: 1.5rem;
  }
  
  .member-card {
    padding: 35px 25px;
  }
}

@media (max-width: 768px) {
  .p-board {
    padding: 40px 0;
  }
  
  .p-board__row {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  
  .p-board__item {
    min-width: 280px;
    max-width: 100%;
    margin-bottom: 40px;
  }
  
  .member-card {
    padding: 30px 25px;
  }
  
  .p-board__item__thumbnail {
    width: 130px;
    height: 130px;
  }
  
  .member-name {
    font-size: 1.4rem;
  }
  
  .member-position {
    font-size: 1rem;
  }
  
  .description-item {
    font-size: 0.9rem;
  }
  
  .read-more-btn {
    padding: 8px 20px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .p-board {
    padding: 30px 0;
  }
  
  .p-board__item {
    min-width: 260px;
    margin-bottom: 30px;
  }
  
  .member-card {
    padding: 25px 20px;
  }
  
  .p-board__item__thumbnail {
    width: 110px;
    height: 110px;
  }
  
  .member-name {
    font-size: 1.3rem;
  }
  
  .member-position {
    font-size: 0.95rem;
    padding: 6px 12px;
  }
  
  .description-item {
    font-size: 0.85rem;
    padding: 6px 16px 6px 6px;
  }
  
  .read-more-btn {
    padding: 8px 18px;
    font-size: 0.8rem;
  }
  
  .p-board__item__rope {
    height: 30px;
  }
}
</style>