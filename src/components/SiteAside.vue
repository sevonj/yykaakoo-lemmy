<script async setup lang="ts">
import AsideHead from './AsideHead.vue';

import { LemmyHttp } from 'lemmy-js-client';
import VueMarkdown from 'vue-markdown-render'

import { getCurrentInstance } from 'vue';
import InstanceMeta from './InstanceMeta.vue';

const instance = getCurrentInstance();
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client;

const site = await client.getSite();

</script>

<template>

    <aside>
        <AsideHead :site_view="site.site_view" />
        <InstanceMeta :site />
        <div class="sidebar">
            <VueMarkdown :source="site.site_view.site.sidebar" class="md" />
        </div>
    </aside>

</template>


<style scoped>
aside {
    width: 256px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.sidebar {
    background: #3f636b;
}
</style>