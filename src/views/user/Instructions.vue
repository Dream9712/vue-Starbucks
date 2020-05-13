<template>
    <div class="instruction-container">
        <p class="instr-title">订购须知</p>
        <p>
            1、【限时福利】单笔买满60元，免配送费。
        </p>
        <p>
            2、【满十杯，送一杯】单笔消费每满11杯会自动折扣1杯均价，每满22杯会自动折扣2杯均价，依次类推。
        </p>
        <p>
            3、小杯容量是8盎司，中杯容量是12盎司，大杯容量是16盎司。我想如果你不想牛饮的话，中杯是比较常用的量。
        </p>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.instruction-container {
    @include fixedBg($head_px);
    background: #f6f6f6;
    padding: 0 12px;
    text-align: left;
    color: #333;
    p {
        font-weight: bold;
        margin-bottom: 20px;
    }
    .instr-title {
        padding-top: 20px;
        font-weight: normal;
    }
    
}
</style>