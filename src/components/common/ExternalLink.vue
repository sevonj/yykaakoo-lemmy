<script setup lang="ts">

defineProps<{
  url: string
}>();

</script>

<template>

  <a :href="url">
    <div class="ext-link-block">
      <p> {{ url }} </p>
    </div>
  </a>

</template>


<style>
.ext-link-block {
  background: #444;
  border-radius: 8px;
}
</style>
