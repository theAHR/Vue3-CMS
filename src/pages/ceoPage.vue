<template>
  <div class="ceo-page">
    <div class="container">
      <div class="content">
        <div class="ceo-content">
          <div class="ceo-image-section">
            <img src="@/assets/img/Ceo-image.jpeg" alt="مهـدی تکبیـری - مدیرعامل" class="ceo-image" />
          </div>

          <div class="ceo-text-section">
            <div class="ceo-header">
              <div class="ceo-thumbnail">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>

              <h2 class="ceo-title">سخن مدیرعامل:</h2>
            </div>

            <p class="ceo-text">
              شرکت اعتماد پردازش سداد با پشتوانه و حمایت بزرگترین بانک کشور، بانک ملی ایران، و از مجموعه هلدینگ داده ورزی سداد ایجاد و موفق به اخذ مجوز
              معتمد مالیاتی گردید.
            </p>

            <p class="ceo-text">
              ما در شرکت اعتماد پردازش سداد به ارائه راهکارهای نوآورانه در حوزه صورت‌حساب‌های الکترونیکی متعهد هستیم. هدف ما ارائه خدمات در جهت تسهیل و
              تسریع امور مشتریان و مودیان محترم و تمرکز بر افزایش بهره‌وری کسب‌وکارها، با استفاده از فناوری پیشرفته و تخصص و هوش مصنوعی می‌باشد.
            </p>

            <p class="ceo-text">
              ما در مسیر ایجاد تحولی مثبت در سیستم‌های مالی و صورت‌حساب‌های الکترونیکی گام برمی‌داریم. ارزش‌های کلیدی و اصولی شرکت عبارتند از: نوآوری،
              صداقت و مشتری ‌مداری؛ که همه ارکان شرکت خود را نسبت به اجرای آنها مسئول می‌دانند.
            </p>

            <p class="ceo-text">
              برای درک نیازهای مشتریان و مودیان عزیز، خدمات خود را به گونه‌ای طراحی کرده‌ایم که بهترین تجربه ممکن را برای شما فراهم نمائیم و امیدواریم در
              حوزه ارائه خدمات به مودیان، گسترش فرهنگ مالیاتی، ایجاد نظام یکپارچه و شفاف سازی سهم قابل توجهی اخذ نمائیم .
            </p>

            <p class="ceo-text">این شرکت از شما مشتریان و مودیان محترم دعوت به همکاری می نماید و همواره مفتخر به همراهی شما می باشیم.</p>

            <div class="ceo-signature">
              <h6 class="ceo-name">مهـدی تکبیـری</h6>
              <p class="ceo-position">مدیـرعـامل</p>
            </div>
          </div>
        </div>

        <div class="contact-grid">
          <div v-for="(item, itemIndex) in items" :key="itemIndex" class="contact-item">
            <div class="contact-card">
              <div class="contact-header">
                <div class="contact-icon">
                  <img v-if="item.icon === 'call'" src="@/assets/img/call.svg" alt="Phone icon" />
                  <img v-else-if="item.icon === 'sms-edit'" src="@/assets/img/email.svg" alt="Email icon" />
                </div>
                
                <h3 class="contact-title">{{ item.title }}</h3>
              </div>
              
              <div class="contact-content">
                <p class="contact-description">{{ item.description }}</p>
                <div class="contact-value">{{ item.value }}</div>
                <a :href="item.link" class="contact-link" :title="item.linkTitle">
                  <span class="contact-link-text">{{ item.linkTitle }}</span>
                  <svg class="contact-link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    icon: 'call',
    title: 'تماس تلفنی',
    description: 'ارتباط مستقیم با دفتر مدیرعامل',
    value: '88707938–021',
    link: 'tel:02188707938',
    linkTitle: 'تماس',
    wide: false
  },
  {
    icon: 'sms-edit',
    title: 'ارسال پیام',
    description: 'دریافت پیام‌های مکتوب شما از طریق ایمیل',
    value: 'ceo@sadadtsp.ir',
    link: 'mailto:ceo@sadadtsp.ir',
    linkTitle: 'ارسال ایمیل',
    wide: false
  }
])
</script>

<style scoped>
@font-face {
  font-family: 'YekanBold';
  src: url('@/assets/fonts/woff/IRANYekanX-Bold.woff') format('woff');
  font-style: normal;
}

@font-face {
  font-family: 'YekanRegular';
  src: url('@/assets/fonts/woff/IRANYekanX-Regular.woff') format('woff');
  font-style: normal;
}

.ceo-page {
  padding: 40px 0;
  background-color: #ffffff;
  margin-bottom: 60px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.content {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.ceo-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  margin-bottom: 60px;
  align-items: center;
}

.ceo-text-section {
  flex: 1;
}

.ceo-image-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.ceo-image {
  width: 100%;
  max-width: 280px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  object-fit: cover;
}

.ceo-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.ceo-thumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-left: 20px;
  border-radius: 50%;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  color: #666;
  flex-shrink: 0;
}

.ceo-title {
  font-family: 'YekanBold';
  font-size: 1.2rem;
  font-weight: 900;
  color: #333333;
  margin: 0;
  line-height: 1.4;
}

.ceo-text {
  font-family: 'YekanRegular';
  font-size: 1rem;
  color: #404856;
  line-height: 1.8;
  margin: 0 0 20px 0;
  text-align: justify;
}

.ceo-signature {
  text-align: center;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #e0e0e0;
}

.ceo-name {
  font-family: 'YekanBold';
  font-size: 1.2rem;
  font-weight: 700;
  color: #333333;
  margin: 0 0 10px 0;
}

.ceo-position {
  font-family: 'YekanRegular';
  font-size: 1rem;
  font-weight: 600;
  color: #666666;
  margin: 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.contact-card {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 30px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.contact-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.contact-icon img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.contact-title {
  font-family: 'YekanBold';
  font-size: 1.1rem;
  font-weight: 700;
  color: #333333;
  margin: 0;
  line-height: 1.3;
}

.contact-description {
  font-family: 'YekanRegular';
  font-size: 1 rem;
  color: #575757;
  margin: 0 0 15px 0;
  line-height: 1.6;
}

.contact-value {
  font-family: 'YekanRegular';
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 15px 0;
}

.contact-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  color: #438d54 ;
  text-decoration: none;
  font-family: 'YekanMedium';
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 5px 0;
  width: 100%;
}

.contact-link:hover {
  color: #438d54;
  text-decoration: none;
  transform: translateX(-3px);
}

.contact-link-text {
  color: inherit;
}

.contact-link-arrow {
  color: inherit;
  transition: transform 0.3s ease;
}

.contact-link:hover .contact-link-arrow {
  transform: translateX(-3px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .ceo-page {
    padding: 20px 0;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .content {
    padding: 24px;
    border-radius: 12px;
  }
  
  .ceo-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .ceo-image-section {
    order: -1;
  }
  
  .ceo-image {
    max-width: 250px;
  }
  
  .ceo-thumbnail {
    width: 50px;
    height: 50px;
    margin-left: 10px;
  }
  
  .ceo-thumbnail svg {
    width: 28px;
    height: 28px;
  }
  
  .ceo-title {
    font-size: 1.25rem;
  }
  
  .ceo-text {
    font-size: 0.95rem;
    line-height: 1.7;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .contact-card {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .content {
    padding: 20px;
    border-radius: 8px;
  }
  
  .ceo-title {
    font-size: 1.1rem;
  }
  
  .ceo-text {
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .ceo-name {
    font-size: 1.1rem;
  }
  
  .contact-card {
    padding: 16px;
  }
}
</style>