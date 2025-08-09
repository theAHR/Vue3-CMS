<template>
  <footer class="v-footer">
    <div class="v-footer__wrapper">
      <div class="v-footer__content">
        <div class="v-footer__container">
          <div class="v-footer__grid">
            <div class="v-footer__intro">
              <div class="v-footer__logo-section">
                <router-link to="/" class="v-footer__brand">
                  <img :src="logoSrc" alt="Logo" class="v-footer__brand-img" />
                </router-link>
              </div>

              <div class="v-footer__description">
                <p class="v-footer__bio">
                  «شرکت اعتماد پردازش سداد» با هدف اصلی نقش آفرینی در زیست بوم و زنجیره نظام یکپارچه و فراگیر پایانه‌های فروشگاهی و سامانه مؤدیان، با
                  مشارکت کنسرسیومی بین شرکتهای هلدینگ داده ورزی سداد، پارس تکنولوژی سداد و پرداخت الکترونیک سداد در سال <strong>1401</strong> تأسیس
                  گردیده است. این شرکت معتمد با هدف ارائه مجموعه خدمات مالیاتی در حوزه‌هایی چون نصب، راه‌اندازی، پیکربندی، ارائه پشتیبانی و تأمین تجهیزات
                  موردنیاز، صدور صورتحساب الکترونیکی و همچنین صدور، نگهداری، جمع‌آوری و ارسال اطلاعات این صورتحساب‌ها به سامانه مودیان، موفق به کسب
                  <strong>«مجوز معتمد مالیاتی نوع اول»</strong> از سازمان امور مالیاتی کشور گردیده است.
                </p>
              </div>
            </div>

            <div class="v-footer__links">
              <h6 class="v-footer__section-title">لینک های مرتبط</h6>
              <ul class="v-footer__list">
                <li v-for="(item, itemIndex) in links" :key="itemIndex" class="v-footer__list-item">
                  <a :href="item.href" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
                </li>
              </ul>
            </div>

            <div class="v-footer__contact">
              <ul class="v-footer__contact-list">
                <li v-for="(item, itemIndex) in contacts" :key="itemIndex" class="v-footer__contact-item">
                  <a :href="item.link" :target="item.newTab ? '_blank' : '_self'" rel="noopener noreferrer">
                    <strong class="v-footer__contact-title">{{ item.title }}:</strong>
                    <span class="v-footer__contact-value">{{ item.value }}</span>
                  </a>
                </li>
              </ul>
<!-- 
              <div class="v-footer__license">
                <a
                  referrerpolicy="origin"
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=550206&Code=nEzsIHYOZmzdAEh2DRq3ZG9qh8nP093T"
                  rel="noopener noreferrer"
                >
                  <img
                    referrerpolicy="origin"
                    src="https://trustseal.enamad.ir/logo.aspx?id=550206&Code=nEzsIHYOZmzdAEh2DRq3ZG9qh8nP093T"
                    alt="اعتماد الکترونیکی"
                    class="v-footer__license-img"
                  />
                </a>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="v-footer__bottom">
        <div class="v-footer__container">
          <div class="v-footer__bottom-content">
            <p class="v-footer__copyright">
              تمامی حقوق و قوانین متعلق به شرکت «<strong>اعتماد پردازش سداد</strong>» میباشد
            </p>
            <p class="v-footer__year">© Copyright 2025</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import logoSrc from '@/assets/img/logo2.svg'

// Reactive data
const links = ref([
  {
    title: 'بانک مرکزی',
    href: 'https://www.cbi.ir/'
  },
  {
    title: 'سازمان امور مالیاتی',
    href: 'https://tax.gov.ir/'
  },
  {
    title: 'درگاه ملی خدمات الکترونیک',
    href: 'https://my.gov.ir/'
  },
  {
    title: 'بانک ملی',
    href: 'https://www.bmi.ir/'
  },
  {
    title: 'سامانه جامع تجارت',
    href: 'https://www.ntsw.ir/'
  },
  {
    title: 'سامانه دریافت شناسه کالا و خدمات',
    href: 'https://stuffid.tax.gov.ir/'
  }
])

const contacts = ref([
  {
    title: 'آدرس',
    value: 'خیابان احمد قصیر(بخارست)، نبش کوچه نهم',
    link: 'https://maps.app.goo.gl/fNA7PADoH5SyBqET9',
    newTab: true
  },
  {
    title: 'تلفن',
    value: '91092005–(021)',
    link: 'tel:02191092005',
    newTab: false
  },
  {
    title: 'فکس',
    value: '88707939–(021)',
    link: 'fax:02188707939',
    newTab: false
  },
  {
    title: 'ایمیل',
    value: 'info@sadadtsp.ir',
    link: 'mailto:info@sadadtsp.ir',
    newTab: false
  }
])
</script>

<style scoped>
.v-footer {
  background: linear-gradient(0deg, #4b4a79 0%, #4A4A79 50%, #514a9b 100%);
  color: white;
  margin-top: 80px;
  width: 90%;
  margin: auto;
  border-radius: 20px;

}

.v-footer__wrapper {
  position: relative;
}

.v-footer__content {
  padding: 50px 0;
}

.v-footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.v-footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

/* Logo Section */
.v-footer__logo-section {
  text-align: right;
  margin-bottom: 20px;
}

.v-footer__brand {
  display: inline-block;
}

.v-footer__brand-img {
  height: 50px;
  width: auto;
  filter: brightness(0) invert(1);
}

/* Company Description */
.v-footer__description {
  margin-bottom: 30px;
}

.v-footer__description-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.9);
}

.v-footer__bio {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  text-align: justify;
  margin: 0;
}

.v-footer__bio strong {
  color: #ffffff;
  font-weight: 600;
}

/* Grid Layout for Desktop */
@media (min-width: 1024px) {
  .v-footer__grid {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 40px;
    align-items: start;
  }

  .v-footer__description {
    margin-bottom: 0;
  }
}

/* Links Section */
.v-footer__links {
  margin-bottom: 30px;
}

.v-footer__section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 15px;
  margin-top: 0;
}

.v-footer__list {
  list-style: disc;
  padding-right: 20px;
  margin: 0;
}

.v-footer__list-item {
  margin-bottom: 8px;
}

.v-footer__list-item::marker {
  color: rgba(255, 255, 255, 0.6);
}

.v-footer__list-item a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.v-footer__list-item a:hover {
  color: #ffffff;
}

.v-footer__contact {
  margin-bottom: 30px;
}

.v-footer__contact-list {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
}

.v-footer__contact-item {
  margin-bottom: 15px;
}

.v-footer__contact-item a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  display: block;
  transition: color 0.3s ease;
}

.v-footer__contact-item a:hover {
  color: #ffffff;
}

.v-footer__contact-title {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 3px;
}

.v-footer__contact-value {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  direction: ltr;
  text-align: right;
}

/* License Section */
.v-footer__license {
  text-align: center;
  margin-top: 20px;
}

.v-footer__license-img {
  height: 70px;
  width: auto;
  border-radius: 6px;
}

/* Bottom Section */
.v-footer__bottom {
  background: #1d1d1d;
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 0 20px 20px;
  margin-bottom: 40px;
}

.v-footer__bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.v-footer__copyright,
.v-footer__year {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.v-footer__copyright strong {
  color: #ffffff;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .v-footer__content {
    padding: 40px 0;
  }

  .v-footer__container {
    padding: 0 16px;
  }

  .v-footer__grid {
    gap: 25px;
  }

  .v-footer__brand-img {
    height: 45px;
  }

  .v-footer__bio {
    font-size: 0.9rem;
  }

  .v-footer__bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }

  .v-footer__license-img {
    height: 60px;
  }

  .v-footer__description-icon {
    margin-bottom: 15px;
  }
}

@media (max-width: 480px) {
  .v-footer__content {
    padding: 30px 0;
  }

  .v-footer__brand-img {
    height: 40px;
  }

  .v-footer__bio {
    font-size: 0.85rem;
  }

  .v-footer__section-title {
    font-size: 1rem;
  }

  .v-footer__license-img {
    height: 55px;
  }

  .v-footer__description-icon {
    margin-bottom: 12px;
  }
}

.v-footer {
  direction: rtl;
  text-align: right;
}

.v-footer__year {
  direction: ltr;
} 
</style> 