<template>
  <section class="pos-section">
    <div class="container">
      <div class="pos-content">
        <div class="pos-content__text">
          <header class="section-header">
            <div class="title-group">
              <div class="title-header">
                <img src="/src/assets/img/title-green.svg" alt="" class="title-icon" />
                <h2>دستــــــــگاه POS اختصاصــــی</h2>
              </div>
              <p>راهکاری جامع برای مدیریت فروش و پرداخت</p>
            </div>
          </header>
          
          <p class="pos-content__description">
            دستگاه پوز (Point of Sale) یک ابزار الکترونیکی است که در فروشگاه‌ها و مکان‌های خدماتی برای پردازش پرداخت‌ها و انجام تراکنش‌های مالی استفاده می‌شود. این دستگاه‌ها به فروشندگان این امکان را می‌دهند که پرداخت‌های نقدی و غیرنقدی را به‌سرعت و به‌راحتی انجام دهند. با استفاده از دستگاه‌های پوز، مشتریان می‌توانند با کارت‌های اعتباری، دبیت، و حتی کیف پول‌های دیجیتال، هزینه خریدهای خود را پرداخت کنند.
          </p>
          
          <ul class="pos-features">
            <li class="pos-features__item">
              <span class="pos-features__icon"></span>
              <span>دریافت دستگاه پوز رایگان برای صاحبین کسب و کار</span>
            </li>
            <li class="pos-features__item">
              <span class="pos-features__icon"></span>
              <span>امکان استفاده از تمامی امکانات پنل از طریق دستگاه</span>
            </li>
            <li class="pos-features__item">
              <span class="pos-features__icon"></span>
              <span>سفارشی سازی شده ویژه کسب و کارهای مختلف</span>
            </li>
            <li class="pos-features__item">
              <span class="pos-features__icon"></span>
              <span>امکان استفاده بصورت چند کاربره و همزمان</span>
            </li>
            <li class="pos-features__item">
              <span class="pos-features__icon"></span>
              <span>قابلیت نصب و صدور صورتحساب آسان</span>
            </li>
            <li class="pos-features__item">
              <span class="pos-features__icon"></span>
              <span>پشتیبانی از کلیه خدمات بانکداری و مالیاتی</span>
            </li>
          </ul>
        </div>

        <div class="pos-content__image">
          <img 
            src="@/assets/img/illustration-2.svg" 
            alt="دستگاه POS اختصاصی"
            class="pos-content__image-element"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style src="./section-header.css"></style>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 35px;
}

.pos-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.pos-content__text {
  flex: 1;
  max-width: 50%;
}

.pos-content__image {
  flex: 1;
  max-width: 50%;
  display: flex;
  justify-content: center;
}

.pos-content__image-element {
  max-width: 100%;
  height: auto;
}

.pos-content__description {
  margin: 20px 0;
  line-height: 1.6;
  color: #3C4150;
}

.pos-features__item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1rem;
  color: #3C4150;
  font-weight: 500;
  line-height: 1.5;
}

.pos-features__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #514a9b;
  border-radius: 50%;
  margin-left: 15px;
  flex-shrink: 0;
  position: relative;
}

.pos-features__icon::after {
  content: '✔';
  color: white;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 992px) {
  .pos-section {
  margin: 0 20px 60px 20px;
}

  .pos-content {
    flex-direction: column-reverse;
    gap: 20px;
  }
  
  .pos-content__text,
  .pos-content__image {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .pos-section {
    padding: 20px 0;
    margin-bottom: 40px;
  }
  
  .pos-content {
    gap: 30px;
  }
  
  .pos-features__item {
    font-size: 0.95rem;
    margin-bottom: 12px;
  }
  
  .pos-features__icon {
    width: 20px;
    height: 20px;
    margin-left: 12px;
  }
  
  .pos-features__icon::after {
    font-size: 12px;
  }
}
</style> 