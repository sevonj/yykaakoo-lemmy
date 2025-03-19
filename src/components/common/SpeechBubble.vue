<template>
  <div class="speechbub-cont">
    <div class="speechbub-above">
      <slot name="above"></slot>
    </div>
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
  margin-top: 4px;
}

.speechbub-above {
  display: flex;
  max-height: 12px;
  align-items: end;
  justify-content: end;
  padding-right: 8px;
}

.speechbub {
  background: #222;
  border: 1px solid #333;
  border-radius: 12px;
  overflow: hidden;
  color: #ddd;
}

.speechbub-below {
  display: flex;
  justify-content: space-between;
  max-height: 24px;
}

.speechbub-below>* {
  margin-right: 32px;
}

.speechbub-below-spike {
  margin: 0 0 0 16px;
  border-bottom: 24px solid #0c0c0e;
  border-left: 24px solid transparent;
  background: #333;
}

.speechbub-below-spike-inner {
  position: relative;
  left: -23px;
  top: -2px;
  border-bottom: 24px solid transparent;
  border-left: 24px solid #222;
}
</style>
