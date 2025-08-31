<template>
  <span class="formatted-date">
    {{ formattedDate }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  date: {
    type: [String, Date],
    default: null
  },
  format: {
    type: String,
    default: 'full', // 'full', 'date-only', 'time-only'
    validator: (value) => ['full', 'date-only', 'time-only'].includes(value)
  },
  fallback: {
    type: String,
    default: 'نامشخص'
  }
});

const formattedDate = computed(() => {
  if (!props.date || props.date === 'null' || props.date === 'undefined') {
    return props.fallback;
  }
  
  try {
    const date = new Date(props.date);
    if (isNaN(date.getTime())) {
      return props.date;
    }
    
    let options = {};
    
    switch (props.format) {
      case 'date-only':
        options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        };
        break;
      case 'time-only':
        options = {
          hour: '2-digit',
          minute: '2-digit'
        };
        break;
      case 'full':
      default:
        options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        };
        break;
    }
    
    return new Intl.DateTimeFormat('fa-IR', options).format(date);
  } catch (error) {
    console.warn('Error formatting date:', error, props.date);
    return props.date || props.fallback;
  }
});
</script>

<style scoped>
.formatted-date {
  font-family: inherit;
  font-weight: 500;
}
</style>
