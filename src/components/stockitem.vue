<template>
    <div class="stock-item">
        <div class="nameinfo">
            <p style="color: #f5f5f5">{{ stockinfo.id }}</p>
            <p>{{ stockinfo.name }}</p>
        </div>
        <div class="index">{{ stockinfo.index }}</div>
        <div :style="risefallcolor" class="rate">{{ toindex }}</div>
    </div>
</template>

<script>
export default {
    name: "stockItem",
    props: ["stockinfo"],
    computed: {
        risefallcolor() {
            return {
                'color': this.stockinfo.rate < 0 ? 'green' : 'red'
            }
        },
        toindex() {
            let a = this.stockinfo.rate.toFixed(2) + '%';
            if (this.stockinfo.rate >= 0)
                a = '+'.concat(a);
            return a;
        }
    },
    methods: {

    },
    data() {
        return {

        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stock-item {
    display: flex;
    margin: 15px 15px;
    font-size: 14px;
    color: #f5f5f5;
    align-items: center;
}

.nameinfo {
    margin-right: auto;
}

.stock-item p {
    margin: 0;
    padding: 0;
    color: #a0a0a0;
}

.rate {
    box-sizing: border-box;
    width: 70px;
    text-align: right;
}
</style>