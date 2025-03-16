<script async setup lang="ts">
import { LemmyHttp } from 'lemmy-js-client';

import { getCurrentInstance } from 'vue';

const instance = getCurrentInstance();
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client;
const instance_url: string = instance?.appContext.config.globalProperties.$instance_url;

const site = await client.getSite();

</script>

<template>

    <header>
        <div class="subtitle-row">
            <p>{{ instance_url }}</p>
            <p>-</p>
            <p>{{ site.site_view.site.description }}</p>
            <div class="subtitle-end"></div>
        </div>
        <div v-if="site.taglines.length > 0" class="subtitle-row">
            <p>{{ site.taglines[Math.floor(Math.random() * site.taglines.length)].content }} </p>
        </div>
    </header>

</template>

<style scoped>
header {
    padding: 16px 0;
    background: orange;
    background: url(../assets/waves.svg);
    background-size: auto 128px;
    height: 128px;
    min-height: 128px;
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
}

.subtitle-row {
    margin-top: 2px;
    padding-left: 8px;
    color: #322918;
    display: flex;
    align-items: center;
    font-family: monospace;
    font-size: .75em;
    gap: 1em;
}

.subtitle-separator {
    border-left: 1em solid orange;
    border-top: 1em solid transparent;
    background: black;
    margin-right: 1em;
}

.subtitle-end {
    border-left: 1em solid orange;
    border-top: 1em solid transparent;
    background: black;
    flex-grow: 1;
}

.site-logo {
    height: 32px;
}

h1 {

    font-weight: 900;
    font-variant: small-caps;
    font-size: 2em;
    color: white;
}
</style>