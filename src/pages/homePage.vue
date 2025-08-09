<template>
  <main>
    <Banner />
    <Hero />
    <Customers /> 
    <News />
    <Mockup />
    <Steps />
    <Pos />
    <Multimedia />
    <Reviews />
    <Faq />
    <SocialMedia />
  </main>
</template>

<script setup>
import Banner from '@/components/home/banner.vue'
import Hero from '@/components/home/hero.vue'
import Customers from '../components/home/customers.vue'
import Reviews from '../components/home/reviews.vue'
import Faq from '../components/home/faq.vue'
import News from '../components/home/news.vue'
import Mockup from '../components/home/mockup.vue'
import Steps from '../components/home/steps.vue'
import Pos from '@/components/home/pos.vue'
import Multimedia from '@/components/home/multimedia.vue'
import SocialMedia from '@/components/home/socialMedia.vue'
</script>
  