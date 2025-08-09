<template>
  <div class="mission-vision-page">
    <div class="container">
      <div class="content">
        <h3 class="section-title">اهداف سازمانی</h3>

        <p class="section-text">
          شرکت اعتماد پردازش سداد با هدف تبدیل شدن به نخستین انتخاب مودیان برای ارسال صورتحساب الکترونیک در ایران، با ارائه سرویس در سامانه‌های ارسال صورتحساب و همچنین پایانه‌های فروش (POS)، خواهد توانست اعتماد مشتریان و سازمان امور مالیاتی را به دست آورده و جایگاه خود را به عنوان یک مرجع معتبر در این حوزه تثبیت نماید. هدف شرکت، ایجاد بستری امن و کارآمد برای تسهیل فرآیندهای مالی و ارتقاء سطح خدمات مالیاتی در کشور است.
        </p>

        <h3 class="section-title">انگیزه و ماموریت</h3>

        <p class="section-text">
          شرکت اعتماد پردازش سداد به تعهد خود در ارائه خدمات، با کیفیت بالا و پشتیبانی موثر به مودیان پایبند است. این شرکت با تمرکز بر شناخت و پاسخگویی به نیازهای مشتریان و بهبود مستمر فرآیندهای داخلی و خارجی، تلاش می‌کند تا بهترین ویژگی‌ها را برای تسهیل فرآیند ارسال صورتحساب الکترونیک ایجاد کند. هدف اصلی ما، افزایش رضایت مشتریان و ارتقاء تجربه آنان از طریق ارائه خدمات حرفه‌ای و کارآمد است. اعتمادسازی و ایجاد روابط پایدار با مشتریان، یکی از اصول اساسی مأموریت ما است.
        </p>

        <h3 class="section-title">برنامه ریزی و توسعه</h3>

        <p class="section-text">
          شرکت اعتماد پردازش سداد با بهره‌گیری از تیمی متخصص و حرفه‌ای و استفاده از فناوری‌های پیشرفته و روزآمد، برنامه‌ریزی دقیق و جامعی را برای توسعه سامانه‌ها و خدمات خود انجام داده است. استراتژی‌های توسعه‌ای ما بر اساس تحلیل دقیق بازار، شناسایی نیازهای جدید مشتریان و تطابق با آخرین تغییرات و تحولات صنعت طراحی شده‌اند. هدف ما ارائه راهکارهای نوآورانه و بهینه به منظور افزایش کارایی، کاهش هزینه‌ها و ایجاد مزیت رقابتی پایدار برای مودیان است. همچنین، ما به دنبال همکاری و تعامل مستمر با نهادها و سازمان‌های مرتبط و ارتقاء سطح دانش و مهارت‌های تیمی خود هستیم تا بتوانیم به بهترین شکل ممکن، پاسخگوی نیازهای بازار باشیم.
        </p>
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

.mission-vision-page {
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
  font-size: 1.2 rem;
  color: #333333;
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.section-title:not(:first-child) {
  margin-top: 40px;
}

.section-text {
  font-family: 'YekanRegular';
  font: 1 rem;
  color: #404856;
  line-height: 1.8;
  margin: 0 0 20px 0;
  text-align: justify;
}

/* Responsive Design */
@media (max-width: 768px) {
  .mission-vision-page {
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
}
</style>
