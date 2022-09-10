<template>
    <div class="stock-item" @click="itemChange">
        <div class="nameinfo">
            <p style="color: #2c2c2c">{{ stockinfo.id }}</p>
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
                'color': this.stockinfo.rate < 0 ? '#6db' : 'red'
            }
        },
        toindex() {
            let a = this.stockinfo.rate.toFixed(2) + '%';
            if (this.stockinfo.rate >= 0)
                a = '+'.concat(a);
            return a;
        },
    },
    methods: {
        itemChange() {
            this.$emit("itemChange", this.stockinfo.id);
        },
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
    padding: 10px 15px;
    font-size: 14px;
    color: #2c2c2c;
    align-items: center;
    border-bottom: 1px solid #F0F0F0;
}

.stock-item:hover {
    background-color: #f0f0f0;
}

.nameinfo {
    margin-right: auto;
}

.stock-item p {
    margin: 0;
    padding: 0;
    color: #2c2c2c;
}

.rate {
    box-sizing: border-box;
    width: 70px;
    text-align: right;
}
</style>