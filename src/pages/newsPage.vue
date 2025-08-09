<template>
  <MagazinePage :type="1" />
</template>

<script>
import MagazinePage from '@/components/common/VMagazine';

export default {
  name: 'NewsPage',
  components: {
    MagazinePage
  }
};
</script>