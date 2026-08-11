<script setup lang="ts">
import TabSelector from '@/components/TabSelector.vue';
import SpeechBubble from '@/components/common/SpeechBubble.vue';
</script>

<template>
  <div class="flex-col flex-center">
    <SpeechBubble style="max-width: 300px; margin-top: 100px;">
      <template v-slot:content>
        <div style="width: 300px; height: 300px; padding: 8px;">
          <p>This is the zoo.</p>
        </div>
      </template>
    </SpeechBubble>
    <TabSelector
      :tabs="[{ label: 'Tab1', forceSelect: true }, { label: 'Tab2' }, { label: 'Tab3' }, { label: 'Tab4' }]" />

  </div>
</template>
