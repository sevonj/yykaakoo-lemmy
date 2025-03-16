<script setup lang="ts">


</script>

<template>

    <div class="speechbub">
        <div class="speechbub-top meta">
            <div style="overflow: hidden;">
                <slot name="top"></slot>
            </div>
            <div class="speechbub-top-end"></div>
        </div>
        <div class="speechbub-mid">
            <slot name="content"></slot>
        </div>
        <div class="speechbub-bottom meta">
            <div class="speechbub-bottom-spike"></div>
            <slot name="bottom"></slot>
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
    background: #47443b;
    display: flex;
    justify-content: space-between;
}

.speechbub-top-end {
    width: 24px;
    height: 24px;
    border-top: 24px solid black;
    border-left: 24px solid transparent;
}

.speechbub-mid {
    padding-left: 4px;
    flex-grow: 1;
    gap: 8px;
    color: beige;
    background: #5f5c55;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.speechbub-bottom {
    display: flex;
    justify-content: space-between;
}

.speechbub-bottom>* {
    margin-right: 32px;
}

.speechbub-bottom-spike {
    width: 32px;
    height: 32px;
    margin-right: 8px;

    border-bottom: 32px solid black;
    border-left: 32px solid transparent;
    background: #5f5c55;
}
</style>