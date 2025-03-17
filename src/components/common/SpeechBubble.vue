<script setup lang="ts">


</script>

<template>

    <div class="speechbub">
        <div class="speechbub-top meta">
                <slot name="top"></slot>
        </div>
        <div class="speechbub-mid">
            <slot name="content"></slot>
        </div>
        <div class="speechbub-below meta">
            <div class="speechbub-below-spike">
                <div class="speechbub-below-spike-inner"></div>
            </div>
            <slot name="below"></slot>
        </div>
    </div>

</template>

<style scoped>
.speechbub {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.speechbub-top {
    background: #232323;
    display: flex;
    flex-direction: column;
    padding: 0 4px;
    border: 1px solid #444;
    border-bottom: 0;
    border-radius: 8px 8px 0 0;
}

.speechbub-mid {
    flex-grow: 1;
    gap: 8px;
    color: beige;
    background: #232323;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-color: #fff4;
    border-color: #444;
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-radius: 0 0 8px 8px;
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
    margin: 0 8px 0 16px;
    border-bottom: 24px solid black;
    border-left: 24px solid transparent;
    background: #444;
}

.speechbub-below-spike-inner {
    position: relative;
    left: -23px;
    top: -2px;
    border-bottom: 24px solid transparent;
    border-left: 24px solid #232323;
}
</style>