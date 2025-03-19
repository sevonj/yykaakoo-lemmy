<script setup lang="ts">

const props = defineProps<{
  timestamp: string,
}>();


const units = [
  { unit: 'day', threshold: 24 * 60 * 60 * 1000 },
  { unit: 'year', threshold: 365 * 24 * 60 * 60 * 1000 },
  { unit: 'month', threshold: 30 * 24 * 60 * 60 * 1000 },
  { unit: 'week', threshold: 7 * 24 * 60 * 60 * 1000 },
  { unit: 'hour', threshold: 60 * 60 * 1000 },
  { unit: 'minute', threshold: 60 * 1000 },
  { unit: 'second', threshold: 1000 },
]

function timestampFormatted(): string {
  const date = new Date(props.timestamp).getTime();
  const now = Date.now();
  const diff = now - date;

  for (let i = 0; i < units.length - 1; i++) {
    if (diff >= units[i].threshold) {
      const value = Math.round(diff / units[i].threshold);
      return new Intl.RelativeTimeFormat('en').format(-value, units[i].unit as Intl.RelativeTimeFormatUnit).toString();
    }
  }
  return 'Just now'
}

</script>

<template>
  <p class="meta">{{ timestampFormatted() }}</p>
</template>
