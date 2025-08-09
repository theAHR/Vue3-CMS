<template>
    <div class="p-shareholder">
      <div class="container">
        <div v-for="(item, index) in items" :key="index" class="mb-5">
          <div class="relative mb-4">
            <img :src="item.logo" class="p-shareholder__item-logo" :alt="item.title" />
  
            <h4 class="heading-4 p-shareholder__item-title">{{ item.title }}</h4>
          </div>
  
          <div class="card radius-20 outline">
            <div class="card-content">
              <p class="text-preline line-height-1_8">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import logoSadad from '@/assets/img/logo-sadad-gr.png'
  import logoSadadPay from '@/assets/img/logo-sadad-pay-gr.png'
  import logoPars from '@/assets/img/logo-pars-gr.png'
  
  const title = ref('سهامدارن')
  
  const items = ref([
    {
      logo: logoSadad,
      title: 'داده ورزی سداد',
      text: 'بانک ملی ایران به عنوان بزرگترین نهاد بانکی جهان اسلام، با هدف بهره مندی بیشتر از قابلیت‌های فناوری اطلاعات و خدمت‌رسانی بهتر به آحاد جامعه، اقدام به تاسیس شرکت داده ورزی سداد نمود. بر این اساس شركت داده ورزی سداد در تاریخ 13/03/1378 به ثبت رسید. شركت داده ورزی سداد از بدو تاسیس تاكنون با ایجاد روندی پویا به منظور بهره برداری صحیح و اصولی از ابزار فناوری اطلاعات همگام با انتظارات بانك و همسو با توسعه فناوری فعالیت نموده است. حاصل تلاش‌های انجام شده طی سال‌های اخیر سبب گردیده تا در حال حاضر مجموعه‌ای توانمند و تخصصی با كادری مجرب متشكل از مدیران، مشاوران، كارشناسان، و تكنیسین‌های امور فناوری اطلاعات، طیف گسترده‌ای از خدمات مشاوره، طراحی، تولید، تامین، مدیریت، نظارت، راهبری و پشتیبانی راه حل‌ها و سیستم‌ها در حوزه‌های سخت افزار، نرم افزار و ارتباطات را به ادارات مركزی، ادارات امور شعب، شبکه شعب و مشتریان خاص بانک ملّی ایران، شبکه بانکی کشور و برخی از سایر مشتریان ارائه نمایند.'
    },
    {
      logo: logoSadadPay,
      title: 'پرداخت الکترونیک سداد',
      text: 'شرکت پرداخت الکترونیک سداد در سال 1393 از سوی بانک ملی ایران، به عنوان یکی از شرکت‌های زیرمجموعه هلدیگ داده‌ورزی سداد، مأموریت یافت تا به ارائه محصولات و خدمات نوین در زمینه پرداخت الکترونیکی بپردازد و هم‌اکنون عرضه‌کننده محصولات و خدمات پرداخت الکترونیکی در زمینه‌هایی نظیر کارتخوان (POS)، درگاه پرداخت اینترنتی (IPG)، اپلیکیشن پرداخت (ایوا و پالس) و کد دستوری (#737*) است. \n\nاین شرکت در مدت‌زمانی کوتاه توانسته‌ به دستاوردهای مهمی چون طراحی و اجرای کامل زیرساخت شبکه پرداخت (سوئیچ پذیرندگی و شبکه تجمیع‌) نائل شده و در مقام یکی از بزرگ‌ترین شرکت‌های ارائه‌دهنده خدمات پرداخت الکترونیکی (‍‌پی‌اس‌پی) در ایران مشغول به خدمت شود.'
    },
    {
      logo: logoPars,
      title: 'پارس تکنولوژی سداد',
      text: 'شرکت پارس تکنولوژی سداد، یکی از شرکت‌های زیرمجموعه هلدینگ داده‌ورزی سداد، با هدف ارائه خدمات در حوزه فناوری اطلاعات و ارتباطات به بانک ملی ایران، از سال 1393 شروع به کار نمود. این خدمات در بخش‌های پشتیبانیِ سخت‌افزار و نرم‌افزار، تعمیر و نگهداری تجهیزات و سیستم‌ها، شبکه و امنیت، انرژي‌هاي تجديد‌پذير On-Grid و Off-Grid، برق و UPS، صدور کارت و رمز به صورت تخصصی و یکپارچه و همچنین ایجاد شبکه منسجم خدمات مشتریان به منظور پشتیبانی از تمامی سامانه‌های الکترونیکی و پاسخگویی به مشکلات و درخواست‌های مشتریان حقیقی و حقوقی بانک ملی در سطح کشور ارائه می‌گردد. \n\nاین شرکت با دارا بودن نیروهایِ متخصص، جوان و باانگیزه، با استفاده از دانش روز دنیا محصولاتی همچون سامانه انرژی خورشیدی، سیستم یکپارچه و هوشمند نوبت‌دهی‌، ساماندهی مرکز تماس و دیگر محصولات حوزه فناوری اطلاعات طراحی، تولید و به بهره‌برداری رسانده‌است.'
    }
  ])
  </script>
  
  <style scoped>
  .p-shareholder {
    padding: 2rem 0;
  }
  
  .p-shareholder__item-logo {
    height: 108px;
    width: auto;
    margin: auto;
    display: block;
  }
  
  .p-shareholder__item-title {
    color: var(--primary-d2, #514a9b );
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    text-align: center;
  }
  
  .relative {
    position: relative;
  }
  
  .mb-3 {
    margin-bottom: 1rem;
  }
  
  .mb-4 {
    margin-bottom: 1.5rem;
  }
  
  .mb-5 {
    margin-bottom: 3rem;
  }

  
  .heading-4 {
    font-size: 1.5rem;
  }
  
  .line-height-1_8 {
    line-height: 1.8;
  }
  
  .text-preline {
    font-family: 'YekanRegular';
    font-size: 1rem;
    color: #353535;
  }
  
  .card {
    border-radius: 20px;
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  
  .card-content {
    padding: 2rem;
  }
  
  .radius-20 {
    border-radius: 20px;
  }

  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .intro-section {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .p-shareholder__item-logo {
      height: 70px;
    }
    
    .heading-1 {
      font-size: 2rem;
    }
    
    .card-content {
      padding: 1.5rem;
    }
  }
  </style>
  