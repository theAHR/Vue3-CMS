<template>
  <div class="services-container">
    <div class="services-content">
      <div class="sidebar-navigation services-sidebar">
        <div 
          v-for="service in services" 
          :key="service.id"
          :class="['nav-item', { active: currentServiceId === service.id } ]"
          @click="selectService(service.id)"
        >
          <div v-if="currentServiceId === service.id" class="nav-accent-bar"></div>
          <div style="display: flex; align-items: center; justify-content: center; min-width: 44px;">
            <template v-if="service.id === 'web-application'">
              <svg viewBox="0 0 81 59" xmlns="http://www.w3.org/2000/svg" width="40" height="30" style="display: block;" aria-hidden="true">
                <path fill="#514A9B" d="M74.23 0H14.3a6.8 6.8 0 0 0-6.77 6.8v7.57H6.69A6.7 6.7 0 0 0 0 21.1v29.35A6.7 6.7 0 0 0 6.69 57.17H18.86a6.7 6.7 0 0 0 6.69-6.73h16.89v4.89h-6.69a1.83 1.83 0 0 0 0 3.67h17.04a1.83 1.83 0 0 0 0-3.67h-6.69v-4.89h28.14a6.8 6.8 0 0 0 6.77-6.8V6.8A6.8 6.8 0 0 0 74.23 0ZM21.9 50.44a3.04 3.04 0 0 1-3.04 3.06H6.69A3.04 3.04 0 0 1 3.65 50.44V21.1a3.04 3.04 0 0 1 3.04-3.06H18.86a3.04 3.04 0 0 1 3.04 3.06v29.34Zm55.45-6.8a3.13 3.13 0 0 1-3.12 3.13H25.55V21.1a6.7 6.7 0 0 0-6.69-6.73h-7.68V6.8a3.13 3.13 0 0 1 3.12-3.13h59.93A3.13 3.13 0 0 1 77.35 6.8v36.84Z"/>
              </svg>
            </template>
            <template v-else-if="service.id === 'mobile-application'">
              <svg viewBox="0 0 39 63" xmlns="http://www.w3.org/2000/svg" width="22" height="35" style="display: block;" aria-hidden="true">
                <path fill="#514A9B" d="M0 7.5A7.5 7.5 0 0 1 7.5 0h24A7.5 7.5 0 0 1 39 7.5v48A7.5 7.5 0 0 1 31.5 63h-24A7.5 7.5 0 0 1 0 55.5V7.5ZM7.5 3A4.5 4.5 0 0 0 3 7.5v48A4.5 4.5 0 0 0 7.5 60h24A4.5 4.5 0 0 0 36 55.5V7.5A4.5 4.5 0 0 0 31.5 3H7.5Z"/>
                <path fill="#514A9B" d="M15 51h9v3h-9z"/>
              </svg>
            </template>
            <template v-else-if="service.id === 'web-service'">
              <svg viewBox="0 0 84 73" xmlns="http://www.w3.org/2000/svg" width="40" height="34" style="display: block;" aria-hidden="true">
                <path fill="#514A9B" d="M7 72.86h58.85a7 7 0 0 0 7-7.01V53.24c-.04-1.84-2.77-1.84-2.8 0v12.6a4.2 4.2 0 0 1-4.2 4.21H7a4.2 4.2 0 0 1-4.2-4.21V30.82H28.96a1.4 1.4 0 0 0 0-2.8H2.8v-2.8a4.2 4.2 0 0 1 4.2-4.2H28.95c1.83-.02 1.85-2.77 0-2.8H7C3.14 18.21 0 21.36 0 25.22v40.63a7 7 0 0 0 7 7.01Z"/>
                <circle cx="11.21" cy="25.22" r="1.4" fill="#514A9B"/>
                <circle cx="7" cy="25.22" r="1.4" fill="#514A9B"/>
                <circle cx="15.41" cy="25.22" r="1.4" fill="#514A9B"/>
                <path fill="#514A9B" d="M75.33 15.47C78.22 2.63 62.02-5.51 53.45 4.43 45.72-.43 35.4 6.12 36.49 15.2 26.82 20.24 30.38 34.95 41.33 35.02h32.93c12.34-.36 13.24-17.87 1.07-19.55Zm-1.07 16.76H41.33c-4.25 0-7.71-3.46-7.71-7.71 0-3.2 1.93-6.02 4.92-7.18.64-.25 1.01-.94.87-1.66-1.14-5.13 2.94-10.18 8.2-10.12 1.92 0 3.73.63 5.19 1.84.61.5 1.59.37 2-.27 6.73-9.6 21.45-1.75 17.21 9.19-.43.94.42 2.09 1.43 1.97 9.7-.57 10.43 13.57.71 13.97Z"/>
                <path fill="#514A9B" d="M49.51 63.74c2.64 1.89 6.64-.24 6.54-3.5V40.63c-.14-5.54-8.26-5.54-8.37 0v11.76l-1.87-1.25c-4.69-2.96-9.18 3.82-4.65 7.01l8.35 5.62Zm-7.24-9.88c.41-.63 1.33-.82 1.94-.39l4.05 2.7c.89.63 2.22-.07 2.18-1.12V40.63c.03-1.83 2.77-1.85 2.81 0v19.62c.03 1.08-1.29 1.76-2.17 1.14l-8.41-5.6c-.63-.41-.8-1.33-.4-1.93Z"/>
                <path fill="#514A9B" d="M67.25 60.24V48.48l1.87 1.25c2.99 2.1 7.26-.76 6.42-4.34a5.22 5.22 0 0 0-1.95-2.92l-8.41-5.6c-2.66-1.87-6.64.24-6.54 3.5v19.61c.15 5.55 8.26 5.57 8.61.02Zm-5.6 0V40.63c-.04-1.08 1.29-1.76 2.17-1.14l8.41 5.6c1.53 1.02 0 3.32-1.52 2.34l-4.05-2.7c-.88-.63-2.22.07-2.18 1.12v14.51c-.03 1.84-2.77 1.85-2.83-.02Z"/>
              </svg>
            </template>
            <template v-else-if="service.id === 'pos'">
              <svg viewBox="0 0 62 62" xmlns="http://www.w3.org/2000/svg" width="36" height="36" style="display: block;" aria-hidden="true">
                <path fill="#514A9B" d="M56.19 8.41H45.14V5.81A5.82 5.82 0 0 0 39.33 0H5.81A5.8 5.8 0 0 0 0 5.81v50.38A5.8 5.8 0 0 0 5.81 62h33.6a5.8 5.8 0 0 0 5.78-5.81v-8.9H56.19A5.8 5.8 0 0 0 62 41.48V14.18a5.8 5.8 0 0 0-5.81-5.77ZM56.19 11.63c.75 0 1.47.3 2 .83.52.52.82 1.23.82 1.78v15.25H45.24V11.63h10.95ZM42.02 56.19a3.16 3.16 0 0 1-3.22 2.69H5.81a3.2 3.2 0 0 1-2.65-3.22V5.81a3.2 3.2 0 0 1 2.65-2.65h33.6a3.2 3.2 0 0 1 3.22 2.7v50.33ZM56.19 44.14H45.14V32.51H58.7v8.93a3.2 3.2 0 0 1-2.51 2.7Z"/>
                <path fill="#514A9B" d="M35.2 8.41H10.02a1.57 1.57 0 0 0-1.57 1.57v21.03a1.57 1.57 0 0 0 1.57 1.57H35.2c.42 0 .82-.17 1.12-.47.3-.3.49-.71.49-1.13V9.98a1.6 1.6 0 0 0-1.6-1.57ZM33.64 29.43H11.63V11.63H33.64v17.8Z"/>
                <path fill="#514A9B" d="M18.14 39.41a1.57 1.57 0 1 0 0 3.15 1.57 1.57 0 1 0 0-3.15Z"/>
                <path fill="#514A9B" d="M27.13 39.41a1.57 1.57 0 0 0 0 3.21 1.57 1.57 0 1 0 0-3.21Z"/>
              </svg>
            </template>
          </div>
          <div class="nav-text services-nav-text" style="text-align: start; min-width: 120px;">
            {{ service.title }}
          </div>
          <svg v-if="currentServiceId === service.id" width="18" height="18" viewBox="0 0 24 24" fill="none" style="margin-right: auto;" xmlns="http://www.w3.org/2000/svg"><path d="M15 6l-6 6 6 6" stroke="#514a9b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
      
      <div class="main-content services-main-content">
        <div class="content-header services-header">
          <h1>{{ currentService.title }}</h1>
        </div>
        <div class="service-description services-description">
          <div v-html="currentService.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentServiceId = ref('web-application')

const services = ref([
  {
    id: 'web-application',
    title: 'سامانه تحت وب',
    description: `
      <div class="service-intro">
        <p>سامانه تحت وب شرکت اعتماد پردازش سداد، یک پلتفرم جامع و یکپارچه برای ارسال و مدیریت صورتحساب‌های الکترونیک مودیان به سامانه مودیان ارائه می‌دهد. این سامانه با بهره‌گیری از فناوری‌های پیشرفته وب، ابزارهای متعددی برای کسب و کارها فراهم می‌کند تا عملیات مالی خود را به صورت الکترونیکی و با دقت کامل انجام دهند.</p>
      </div>
      
      <h3>عملکرد سامانه تحت وب</h3>
      <ul>
        <li><strong>ثبت و مدیریت صورتحساب‌ها:</strong> از طریق سامانه تحت وب، کاربران می‌توانند به سادگی صورتحساب‌های خود را ثبت و مدیریت کنند. این صورتحساب‌ها به صورت الکترونیکی تهیه و برای تایید به سامانه مودیان ارسال می‌شوند.</li>
        <li><strong>دسترسی چندکاربره:</strong> این سامانه امکان دسترسی چندکاربره را فراهم می‌کند، به طوری که کارکنان مختلف یک سازمان می‌توانند با سطوح دسترسی متفاوت به سیستم وارد شده و وظایف اختصاصی خود را انجام دهند.</li>
        <li><strong>پیگیری وضعیت صورتحساب‌ها:</strong> کاربران قادر خواهند بود تا وضعیت صورتحساب‌های ارسالی را در هر لحظه پیگیری کنند و از تایید یا رد شدن آن‌ها توسط سامانه مودیان مطلع شوند.</li>
        <li><strong>گزارش‌دهی و تحلیل:</strong> سامانه تحت وب ابزارهای متعددی برای گزارش‌دهی و تحلیل داده‌های مالی ارائه می‌دهد. کاربران می‌توانند گزارش‌های مختلفی همچون گزارش‌های فروش و عملکرد مالی را برای اتخاذ تصمیمات مدیریتی بهتر تولید کنند.</li>
        <li><strong>امنیت و محرمانگی:</strong> امنیت داده‌ها یکی از اولویت‌های اعتماد پردازش سداد است. سامانه تحت وب این شرکت از پروتکل‌های امنیتی پیشرفته مانند SSL و HTTPS استفاده می‌کند تا اطلاعات مالی کاربران به صورت امن منتقل و ذخیره شود.</li>
        <li><strong>پشتیبانی از استانداردها:</strong> سامانه تحت وب ما با استانداردهای ملی و بین‌المللی سازگاری دارد و به کاربران اطمینان می‌دهد که تمامی صورتحساب‌ها مطابق با مقررات مالیاتی مربوطه تهیه و ارسال می‌شود.</li>
      </ul>
      
      <h3>مزایا</h3>
      <ul>
        <li><strong>دسترسی آسان و همه‌جانبه:</strong> کاربران می‌توانند از هر کجا و در هر زمان به سامانه دسترسی پیدا کنند.</li>
        <li><strong>بروزرسانی مداوم:</strong> سامانه به‌طور مرتب بروز رسانی می‌شود تا بهترین عملکرد و امنیت ممکن را فراهم آورد.</li>
        <li><strong>افزایش دقت و کاهش خطا:</strong> تمامی عملیات به صورت الکترونیکی و خودکار انجام می‌شود که خطاهای انسانی را به حداقل می‌رساند.</li>
      </ul>
      
      <div class="conclusion">
        <p>سامانه تحت وب شرکت اعتماد پردازش سداد، ابزاری قدرتمند برای مدیریت مالی و ارسال صورتحساب‌های الکترونیکی مودیان به سامانه مودیان است که با طراحی کاربرپسند و امنیت بالا، تمام نیازهای کسب و کارها را پوشش می‌دهد.</p>
      </div>
    `
  },
  {
    id: 'mobile-application',
    title: 'نرم‌افزار موبایل',
    description: `
      <div class="service-intro">
        <p>نرم‌افزار موبایل همراه شرکت اعتماد پردازش سداد، راهکاری کارآمد برای کسب‌وکارها و فروشندگان جهت ارسال و مدیریت صورتحساب‌های الکترونیکی مودیان از طریق دستگاه‌های موبایل است. این نرم‌افزار بر پایه سیستم‌های عامل Android و iOS طراحی شده است و امکان استفاده آسان و سریع را برای کاربران فراهم می‌کند.</p>
      </div>
      
      <h3>عملکرد نرم‌افزار</h3>
      <ul>
        <li><strong>نصب و راه‌اندازی:</strong> کاربران می‌توانند نرم‌افزار را به راحتی از سایت شرکت دانلود و نصب کنند. فرآیند نصب ساده است و تنها چند دقیقه زمان می‌برد.</li>
        <li><strong>ایجاد و ارسال صورتحساب‌ها:</strong> نرم‌افزار موبایل همراه امکان ایجاد سریع و آسان صورتحساب‌های الکترونیکی را فراهم می‌کند. پس از ایجاد صورتحساب، کاربران می‌توانند آن را به صورت آنی به سامانه شرکت ارسال و تاییدیه آن را دریافت کنند.</li>
        <li><strong>پیگیری وضعیت صورتحساب‌ها:</strong> کاربران می‌توانند وضعیت صورتحساب‌های ارسالی خود را به سادگی پیگیری کنند و از تایید یا رد شدن آنها توسط سامانه مودیان مطلع شوند.</li>
        <li><strong>امنیت و احراز هویت:</strong> نرم‌افزار موبایل همراه از پروتکل‌های امنیتی پیشرفته و احراز هویت دوبل برای تضمین امنیت دیتاها و اطلاعات مالی استفاده می‌کند.</li>
        <li><strong>هماهنگی چنددستگاهی:</strong> کاربران می‌توانند از طریق اکانت کاربری خود به نرم‌افزار روی چندین دستگاه وارد شده و به یکپارچه سازی اطلاعات دسترسی پیدا کنند.</li>
      </ul>
      
      <h3>نحوه استفاده</h3>
      <ul>
        <li><strong>دانلود و نصب:</strong> ابتدا کاربران باید نرم‌افزار را از فروشگاه اپلیکیشن مربوطه دانلود و نصب کنند.</li>
        <li><strong>ورود:</strong> پس از نصب، کاربران باید با حساب کاربری موجود خود وارد شوند.</li>
        <li><strong>ایجاد صورتحساب:</strong> کاربران می‌توانند با وارد کردن اطلاعات مربوط به تراکنش و مشتری، به سرعت صورتحساب جدیدی ایجاد کنند.</li>
        <li><strong>ارسال به سامانه اعتماد سداد:</strong> پس از تایید صورتحساب، کاربران می‌توانند آن را به صورت آنی به سامانه اعتماد سداد ارسال کنند و تاییدیه دریافت کنند.</li>
        <li><strong>مدیریت و گزارش‌دهی:</strong> کاربران می‌توانند تمام صورتحساب‌های ارسال شده خود را مشاهده و گزارش‌های مختلفی تهیه کنند.</li>
      </ul>
      
      <h3>مزایا</h3>
      <ul>
        <li><strong>دسترسی همراه و پیوسته:</strong> کاربران در هر زمان و مکانی می‌توانند به نرم‌افزار دسترسی داشته باشند.</li>
        <li><strong>سرعت بالا:</strong> ارسال و مدیریت صورتحساب‌ها با سرعت بالا و به صورت آنی انجام می‌شود.</li>
        <li><strong>امنیت بالا:</strong> استفاده از پروتکل‌های امنیتی پیشرفته برای حفاظت از داده‌ها و اطلاعات مالی.</li>
        <li><strong>کاربرپسند:</strong> رابط کاربری ساده و آسان باعث می‌شود کاربران به راحتی بتوانند با نرم‌افزار تعامل کنند.</li>
      </ul>
      
      <div class="conclusion">
        <p>نرم‌افزار موبایل همراه شرکت اعتماد پردازش سداد، ابزاری ایده‌آل برای کسب‌وکارها و فروشندگانی است که به دنبال راهکاری مطمئن، سریع و قابل اعتماد برای ارسال و مدیریت صورتحساب‌های الکترونیکی مودیان از طریق دستگاه‌های موبایل هستند.</p>
      </div>
    `
  },
  {
    id: 'web-service',
    title: 'وب سرویس API',
    description: `
      <div class="service-intro">
        <p>وب سرویس API شرکت اعتماد پردازش سداد، ابزاری قدرتمند و انعطاف‌پذیر برای ارسال و مدیریت صورتحساب‌های الکترونیکی مودیان به سامانه مودیان فراهم می‌کند. این APIها امکان یکپارچه‌سازی نرم‌افزارهای مختلف با سیستم مرکزی را به سادگی فراهم می‌آورند.</p>
      </div>
      
      <h3>نحوه کار و عملکرد کلی</h3>
      <ul>
        <li><strong>ارتباط و یکپارچه‌سازی:</strong> وب‌سرویس API ما به عنوان واسطی میان نرم‌افزار شما و سامانه مودیان عمل می‌کند و امکان ارسال و دریافت اطلاعات به صورت ایمن و سریع را فراهم می‌آورد. این APIها از پروتکل‌های استاندارد مانند HTTP و HTTPS برای برقراری ارتباط استفاده می‌کنند.</li>
        <li><strong>ارسال و پیگیری صورتحساب‌ها:</strong> با استفاده از API، شما می‌توانید صورتحساب‌های الکترونیکی را به طور مستقیم از نرم‌افزارهای مختلف به سامانه اعتماد سداد ارسال کنید و وضعیت آنها را به آسانی پیگیری نمایید. این عملیات شامل ایجاد، بروزرسانی و حذف صورتحساب‌ها می‌شود.</li>
        <li><strong>ساختار JSON:</strong> وب‌سرویس API ما از فرمت داده استاندارد JSON بهره می‌برد که تعامل و درک آن برای توسعه‌دهندگان را تسهیل می‌کند.</li>
        <li><strong>احراز هویت و امنیت API:</strong> استفاده از روش‌های پیشرفته احراز هویت با استفاده از JWT (JSON Web Token) برای تضمین امنیت و صحت داده‌ها بهره می‌برد.</li>
        <li><strong>مستندات کامل و نمونه کدها:</strong> وب‌سرویس API ما شامل مستندات جامع و نمونه کدهایی در زبان‌های برنامه‌نویسی مختلف است که به توسعه‌دهندگان کمک می‌کند به راحتی و سرعت به پیاده‌سازی بپردازند.</li>
      </ul>
      
      <h3>مزایا</h3>
      <ul>
        <li><strong>یکپارچگی آسان:</strong> امکان یکپارچه‌سازی سریع و آسان با سیستم‌ها و نرم‌افزارهای موجود.</li>
        <li><strong>بروزرسانی‌های مداوم API:</strong> به‌روز شده و به طور مداوم با قابلیت‌ها و ویژگی‌های جدید توسعه می‌یابد.</li>
        <li><strong>کاهش خطا:</strong> تمامی عملیات به صورت خودکار و با کمترین دخالت انسانی انجام می‌شود که احتمال بروز خطا را به حداقل می‌رساند.</li>
        <li><strong>پشتیبانی توسعه‌دهندگان:</strong> تیم پشتیبانی ما همواره آماده پاسخ‌گویی به سوالات و مشکلات توسعه‌دهندگان است.</li>
      </ul>
      
      <h3>موارد استفاده</h3>
      <ul>
        <li><strong>سیستم‌های مالی و حسابداری:</strong> یکپارچه‌سازی مستقیم با نرم‌افزارهای مالی و حسابداری جهت ارسال خودکار صورتحساب‌ها.</li>
        <li><strong>تجارت الکترونیک:</strong> ارسال و مدیریت صورتحساب‌های فروشگاه‌های آنلاین با استفاده از API.</li>
        <li><strong>نرم‌افزارهای موبایل:</strong> ارسال صورتحساب‌های الکترونیکی از طریق اپلیکیشن‌های موبایل.</li>
      </ul>
      
      <div class="conclusion">
        <p>وب سرویس API شرکت اعتماد پردازش سداد، ابزار کاملی برای کسب و کارهایی است که به دنبال یکپارچه‌سازی سریع و امن سیستم‌ها و نرم‌افزارهای خود با سامانه مودیان هستند.</p>
      </div>
    `
  },
  {
    id: 'pos',
    title: 'پایانه فروشگاهی',
    description: `
      <div class="service-intro">
        <p>پایانه فروشگاهی (POS) شرکت اعتماد پردازش سداد دستگاهی است که ابزار پیشرفته‌ای برای ارسال صورتحساب الکترونیک مودیان به سامانه مودیان اجرا می‌کند. این دستگاه‌ها به گونه‌ای طراحی شده‌اند که هم کاربران و هم فروشندگان بتوانند به راحتی از آن‌ها استفاده کنند.</p>
      </div>
      
      <h3>مدل دستگاه</h3>
      <ul>
        <li><strong>طراحی ارگونومیک:</strong> دستگاه‌های ما با طراحی کاربرپسند و ارگونومیک، مناسب برای استفاده طولانی مدت و همه نوع کسب‌و‌کارها می‌باشند.</li>
        <li><strong>صفحه نمایش لمسی:</strong> صفحه نمایش لمسی با کیفیت بالا که عملکرد سریع و دقیق را تضمین می‌کند.</li>
        <li><strong>پردازنده قدرتمند:</strong> پردازنده‌های قدرتمند به کاربران این امکان را می‌دهند تا عملیات مختلف را با سرعت و بدون تاخیر اجرا کنند.</li>
      </ul>
      
      <h3>نرم‌افزار دستگاه</h3>
      <ul>
        <li><strong>سیستم عامل آندروید:</strong> نرم‌افزار دستگاه بر پایه سیستم‌عامل آندروید طراحی شده است که امکان اجرای برنامه‌های متنوع و به‌روزرسانی سریع را فراهم می‌کند.</li>
        <li><strong>رابط کاربری ساده و کاربرپسند:</strong> نرم‌افزار با رابط کاربری ساده و مناسب، امکان استفاده آسان و سریع را به کاربران می‌دهد.</li>
        <li><strong>ارتباط مستقیم با سامانه مودیان:</strong> نرم‌افزار به طور مستقیم به سامانه مودیان متصل است و تمام صورتحساب‌ها مستقیماً ارسال و پیگیری می‌شود.</li>
      </ul>
      
      <h3>عملکرد کلیدی</h3>
      <ul>
        <li><strong>ارسال سریع صورتحساب:</strong> ارسال صورتحساب‌ها به صورت آنی و بدون تاخیر به سامانه مودیان.</li>
        <li><strong>گزارش‌گیری:</strong> امکان دریافت گزارش‌های متنوع از تراکنش‌ها و صورتحساب‌های ثبت شده.</li>
        <li><strong>پشتیبانی فنی:</strong> تیم پشتیبانی ما آماده پاسخگویی به سوالات و مشکلات کاربران است.</li>
      </ul>
      
      <h3>مزایا</h3>
      <ul>
        <li><strong>سرعت و دقت بالا:</strong> انجام عملیات مالی با سرعت و دقت بالا.</li>
        <li><strong>امنیت اطلاعات:</strong> استفاده از پروتکل‌های امنیتی برای حفاظت از داده‌ها.</li>
        <li><strong>کاربری آسان:</strong> مناسب برای تمامی کاربران با هر سطح دانشی.</li>
      </ul>
      
      <div class="conclusion">
        <p>پایانه فروشگاهی شرکت اعتماد پردازش سداد، راهکاری جامع و مطمئن برای مدیریت و ارسال صورتحساب‌های الکترونیکی مودیان است که با امکانات پیشرفته و امنیت بالا، نیازهای فروشندگان و کسب‌وکارها را به طور کامل پوشش می‌دهد.</p>
      </div>
    `
  }
])

const currentService = computed(() => {
  return services.value.find(service => service.id === currentServiceId.value) || services.value[0]
})

const selectService = (serviceId) => {
  currentServiceId.value = serviceId
  router.push(`/services/${serviceId}`)
}

onMounted(() => {
  const pathSegments = route.path.split('/')
  const serviceIdFromRoute = pathSegments[pathSegments.length - 1]
  
  if (serviceIdFromRoute && services.value.find(s => s.id === serviceIdFromRoute)) {
    currentServiceId.value = serviceIdFromRoute
  }
})
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

.services-container {
  min-height: 100vh;
  direction: rtl;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
}

.services-content {
  display: flex;
  align-items: flex-start; 
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.2rem 1.1rem 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.18s cubic-bezier(.4,0,.2,1);
  color: #6c757d;
  background: #f7f8fa;
  font-weight: 500;
  margin-bottom: 0.7rem;
  position: relative;
  box-shadow: 0 1px 4px rgba(81, 74, 155, 0.04);
  border: 1.5px solid transparent;
}

.nav-item:last-child {
  margin-bottom: 0;
}

.nav-item:hover {
  background: #edefff;
  color: #514a9b;
  box-shadow: 0 2px 8px rgba(81, 74, 155, 0.08);
  border: 1.5px solid #b2b7ff;
}

.nav-item.active {
  background: #fff;
  color: #514a9b;
  box-shadow: 0 2px 12px rgba(81, 74, 155, 0.10);
  border: 1.5px solid #514a9b;
  font-weight: 700;
}

.nav-accent-bar {
  position: absolute;
  right: -1.5rem;
  top: 0.7rem;
  bottom: 0.7rem;
  width: 5px;
  border-radius: 8px;
  background: linear-gradient(0deg, #514a9b 0%, #514a9b 100%);
  box-shadow: 0 1px 4px rgba(81, 74, 155, 0.10);
  content: '';
}

.services-nav-text {
  font-size: 1 rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: inherit;
  transition: color 0.2s;
}

.nav-icon {
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.services-sidebar {
  background: #fff !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
  border-radius: 16px !important;
  margin: 2rem 0 0 0.5rem;
  padding: 1.5rem;
  width: 320px; 
  padding-left: 1.5rem; 
  padding-right: 1.5rem;
  position: sticky;
  top: 6rem;
  align-self: flex-start;
  height: fit-content;
  z-index: 10;
}

.services-main-content {
  background: #fff !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
  margin: 2rem 1rem 2rem 0;
  padding: 3rem 2.5rem;
  min-height: 80vh;
  position: relative;
}

.services-header {
  margin-bottom: 2.5rem;
  border-bottom: 2.5px solid #e2e2e2;
  padding-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.services-header h1 {
  font-family: 'YekanBold';
  font-size: 1.2rem;
  font-weight: 900;
  color: #333333;
  margin: 0;
  line-height: 1.4;
}

.services-description {
  line-height: 1.5;
  color: #333333;
  font-size: 1rem;
}

.services-description :deep(.service-intro) {
  background: linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%);
  padding: 1.7rem 1.7rem;
  border-radius: 12px;
  margin-bottom: 2.2rem;
  box-shadow: 0 2px 12px rgba(81, 74, 155, 0.07);
}

.services-description :deep(.service-intro p) {
  margin: 0;
  font-size: 1  rem;
  color: #495057;
}

.services-description :deep(h3) {
  color: #666;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 2.2rem 0 1.2rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px dashed #d1d1d1;
  letter-spacing: 0.01em;
}

.services-description :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0;
}

.services-description :deep(li) {
  padding: 0.85rem 0;
  border-bottom: 1px dashed #e0e7ff;
  position: relative;
  padding-right: 2.2rem;
  font-size: 1.05rem;
  transition: background 0.2s;
}

.services-description :deep(li):last-child {
  border-bottom: none;
}

.services-description :deep(li):before {
  content: "";
  position: absolute;
  right: 0.5rem;
  top: 1.1rem;
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, #b6b6b6 60%, #ffffff 100%);
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(81, 74, 155, 0.10);
}

@media (max-width: 1024px) {
  .services-content {
    flex-direction: column;
  }
  .services-sidebar {
    position: static;
    top: unset;
    align-self: unset;
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    border-radius: 24px 24px 0 0;
    margin: 1rem 0 0 0;
    padding: 1rem 0.5rem;
    box-shadow: 0 2px 12px rgba(81, 74, 155, 0.10);
    display: flex;
    gap: 1rem;
    scrollbar-width: thin;
    scrollbar-color: #514a9b #e0e7ff;
    height: auto;
    z-index: 5;
  }
  .nav-item {
    min-width: 90vw;
    max-width: 90vw;
    flex-shrink: 0;
    scroll-snap-align: start;
    justify-content: center;
    margin-bottom: 0;
  }
  .nav-accent-bar {
    display: none;
  }
  .services-main-content {
    margin: 1rem 0.5rem;
    padding: 2rem 1rem;
  }
  .services-header h1 {
    font-size: 1.5rem;
  }
}
@media (max-width: 600px) {
  .services-sidebar {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    padding: 0.5rem 0.2rem;
    scroll-snap-type: x mandatory;
    overflow-x: auto;
  }
  .nav-item {
    min-width: 100vw;
    max-width: 100vw;
    flex-shrink: 0;
    scroll-snap-align: start;
    justify-content: center;
    margin-bottom: 0;
  }
  .nav-accent-bar {
    display: none;
  }
}
</style>
