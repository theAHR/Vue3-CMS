<template>
    <MagazinePage :type="2" />
  </template>
  
  <script>
  import MagazinePage from '@/components/common/VMagazine';
  
  export default {
    name: 'AnnouncementsPage',
    components: {
      MagazinePage
    }
  };
  </script>