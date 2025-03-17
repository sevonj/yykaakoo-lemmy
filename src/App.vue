<script setup lang="ts">
import SiteNav from './components/SiteNav.vue';
import { LemmyHttp } from 'lemmy-js-client';
import { getCurrentInstance } from 'vue';
import SiteAside from './components/SiteAside.vue';
import SiteHead from './components/SiteHead.vue';

const instance = getCurrentInstance();
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client;


</script>

<template>

  <Suspense>
    <SiteHead />
  </Suspense>

  <SiteNav />

  <RouterView />


</template>

<style>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 4px;
}

.main {
  background: #000;
  flex-grow: 1;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.left-aside {
  width: 256px;
  top: 32px;
  flex-shrink: 0;
}

.right-aside {
  margin-left: 32px;
  top: 32px;
  width: 256px;
}
</style>

<!--style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style-->
