<script setup lang="ts">
import { type Community } from 'lemmy-js-client'
import ActorTitleBlockMicro from '../common/ActorTitleBlockMicro.vue'
import ExpanderComponent from '../common/ExpanderComponent.vue'
import MarkdownView from '../markdown/MarkdownView.vue'
import ActorTitleBlock from '../common/ActorTitleBlock.vue'
import { communityIdentifier } from '@/lib/actors'

const props = defineProps<{
  comm: Community
}>()

const identifier = communityIdentifier(props.comm)
</script>

<template>
  <div class="instance-header">
    <div class="instance-header-content">
      <ExpanderComponent>
        <template v-slot:title>
          <ActorTitleBlockMicro :title="identifier" :img-src="comm.icon" />
        </template>
        <template v-slot:content>
          <ActorTitleBlock :title="comm.name" :subtitle="identifier" :img-src="comm.icon" />
          <MarkdownView v-if="comm.description" :source="comm.description" />
        </template>
      </ExpanderComponent>
    </div>
  </div>
</template>

<style>
.instance-header-titlerow {
  display: flex;
  align-items: center;
  gap: 4px;
}

.instance-header-titlerow-icon {
  height: 20px;
}

.instance-header-icon {
  max-height: 1.2em;
  margin-top: 4px;
}

.instance-header-content {
  margin-top: 8px;
}
</style>
