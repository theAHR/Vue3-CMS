<template>
    <MagazinePage :type="3" />
  </template>
  
  <script>
  import MagazinePage from '@/components/common/VMagazine';
  
  export default {
    name: 'CircularsPage',
    components: {
      MagazinePage
    }
  };
  </script>