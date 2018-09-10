import wyq_css from './todoList.css'
let big = require('../image/big.jpg');
let small = require('../image/small.png');

Vue.component('todoList',{
    data(){
        return{
            wyq_css:wyq_css,
            big:big,
            small:small
        }
    },
    template:`
        <div :class="wyq_css.wrap">
            个如果确认过去人工
            <img :src="big" alt="">
            <img :src="small" alt="">
        </div>`
});