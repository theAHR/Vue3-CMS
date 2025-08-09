<template>
  <div class="about-page">
    <div class="container">
      <div class="content">
        <h3 class="section-title">درباره شرکت</h3>

        <p class="section-text">
          «شرکت اعتماد پردازش سداد» با هدف اصلی نقش آفرینی در زیست بوم و زنجیره نظام یکپارچه و فراگیر پایانه‌های فروشگاهی و سامانه مؤدیان، با مشارکت
          کنسرسیومی بین شرکت‌های هلدینگ داده ورزی سداد، پارس تکنولوژی سداد و پرداخت الکترونیک سداد در سال 1401 تأسیس گردیده است. این شرکت‌ معتمد با
          هدف ارائه مجموعه خدمات مالیاتی در حوزه‌هایی چون نصب، راه‌اندازی، پیکربندی، ارائه پشتیبانی و تأمین تجهیزات موردنیاز، صدور صورتحساب الکترونیکی
          و همچنین صدور، نگهداری، جمع‌آوری و ارسال اطلاعات این صورتحساب‌ها به سامانه مودیان، موفق به کسب مجوز معتمد مالیاتی نوع اول از سازمان امور
          مالیاتی کشور گردیده است.
        </p>


        <div class="license-section">
          <h3 class="section-title">مجوز معتمد مالیاتی</h3>
          <div class="license-image-container">
            <img 
              src="@/assets/img/tsp-license.jpg" 
              alt="مجوز معتمد مالیاتی شرکت اعتماد پردازش سداد"
              class="license-image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'YekanBold';
  src: url('@/assets/fonts/woff/IRANYekanX-Bold.woff') format('woff');
  font-style: normal;
}

@font-face {
  font-family: 'YekanMedium';
  src: url('@/assets/fonts/woff/IRANYekanX-Medium.woff') format('woff');
  font-style: normal;
}

@font-face {
  font-family: 'YekanRegular';
  src: url('@/assets/fonts/woff/IRANYekanX-Regular.woff') format('woff');
  font-style: normal;
}

.about-page {
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

.section-title {
  font-family: 'YekanBold';
  font-size: 1.2rem;
  color: #333333;
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.section-title:not(:first-child) {
  margin-top: 40px;
}

.section-text {
  font-family: 'YekanRegular';
  font-size: 1rem;
  color: #404856;
  line-height: 1.8;
  margin: 0 0 20px 0;
  text-align: justify;
}

.license-section {
  margin-top: 60px;
}

.license-image-container {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.license-image {
  margin-top: 20px;
  max-width: 80%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.license-image:hover {
  transform: scale(1.02);
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-page {
    padding: 20px 0;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .content {
    padding: 24px;
    border-radius: 12px;
  }
  
  .section-title {
    font-size: 1.25rem;
    margin-bottom: 16px;
  }
  
  .section-title:not(:first-child) {
    margin-top: 32px;
  }
  
  .section-text {
    font-size: 0.95rem;
    line-height: 1.7;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .stat-item {
    padding: 20px;
  }
  
  .stat-number {
    font-size: 1.3rem;
  }
  
  .license-image {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .content {
    padding: 20px;
    border-radius: 8px;
  }
  
  .section-title {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
  
  .section-title:not(:first-child) {
    margin-top: 24px;
  }
  
  .section-text {
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .stat-item {
    padding: 16px;
  }
  
  .stat-number {
    font-size: 1.2rem;
  }
  
  .stat-text {
    font-size: 0.85rem;
  }
}
</style>