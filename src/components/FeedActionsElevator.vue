<template>
    <div class="post-actions-elev-cont">
        <div class="post-actions-elev-subcont">
            <div class="post-actions-elev">
                <a> thread top</a>
                <a> close thread</a>
            </div>
        </div>
    </div>
</template>


<style>
.post-actions-elev-cont {
    height: 0;
    position: sticky;
    top: 256px;
}

.post-actions-elev-subcont {
    width: 0;
    height: 0;
    float: right;
}

.post-actions-elev {
    display: flex;
    flex-direction: column;
    text-wrap-mode: nowrap;
    height: 192px;
}

.scrolltotop:not([data-scroll='0']) {
    display: none;
}
</style>

<style scoped>
a {
    padding-left: 12px;
    color: gray;
    font-size: 1.5em;
}
</style>