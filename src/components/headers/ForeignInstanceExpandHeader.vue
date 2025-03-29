<script setup lang="ts">
import { LemmyHttp, type FederatedInstances, type GetSiteResponse } from 'lemmy-js-client'
import { getCurrentInstance } from 'vue'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import InstanceMeta from '../InstanceMeta.vue'
import ActorTitleBlockMicro from '../common/ActorTitleBlockMicro.vue'
import ExpanderComponent from '../common/ExpanderComponent.vue'

const props = defineProps<{
  id: number
}>()

const appInstance = getCurrentInstance()
const localSite: GetSiteResponse = appInstance?.appContext.config.globalProperties.$localSite
const federatedInstances: FederatedInstances =
  appInstance?.appContext.config.globalProperties.$federatedInstances

async function getForeignSite(): Promise<GetSiteResponse | undefined> {
  if (props.id === localSite.site_view.site.id) {
    return undefined
  }

  const inst = federatedInstances.linked.find((inst) => inst.id == props.id)
  if (!inst) {
    return undefined
  }

  const foreignClient = new LemmyHttp('https://' + inst.domain)
  return await foreignClient.getSite()
}

const foreignSite = await getForeignSite()
</script>

<template>
  <div v-if="foreignSite" class="instance-header">
    <div class="instance-header-titlerow">
      <InformationCircleIcon class="instance-header-titlerow-icon" />
      <h4>You're now visiting another instance</h4>
    </div>

    <div class="instance-header-content">
      <ExpanderComponent>
        <template v-slot:title>
          <ActorTitleBlockMicro
            :title="foreignSite.site_view.site.name"
            :img-src="foreignSite.site_view.site.icon"
          />
        </template>
        <template v-slot:content>
          <InstanceMeta :site="foreignSite" />
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
