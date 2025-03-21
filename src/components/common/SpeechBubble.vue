<template>
  <div class="speechbub-cont">
    <div class="speechbub">
      <slot name="content"></slot>
    </div>
    <div class="speechbub-below">
      <div class="speechbub-below-spike">
        <div class="speechbub-below-spike-inner"></div>
      </div>
      <slot name="below"></slot>
    </div>
  </div>
</template>

<style scoped>
.speechbub-cont {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 3px;
}

.speechbub {
  background: var(--color-background-speechbub);
  border: 1px solid var(--color-border-speechbub);
  border-radius: 12px;
  overflow: hidden;
  color: #ddd;
}

.speechbub-below {
  display: flex;
  justify-content: space-between;
  max-height: 24px;
  padding-right: 8px;
}

.speechbub-below-spike {
  margin: 0 0 0 16px;
  border-bottom: 24px solid var(--color-background);
  border-left: 24px solid transparent;
  max-width: 24px;
  background: var(--color-border-speechbub);
}

.speechbub-below-spike-inner {
  position: relative;
  left: -23px;
  top: -2px;
  border-bottom: 24px solid transparent;
  border-left: 24px solid var(--color-background-speechbub);
}
</style>
