<template>
    <MagazinePage :type="4" />
  </template>
  
  <script>
  import MagazinePage from '@/components/common/VMagazine';
  
  export default {
    name: 'InstructionsPage',
    components: {
      MagazinePage
    }
  };
  </script>