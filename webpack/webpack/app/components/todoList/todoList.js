let css_json = require('./todoList.css');
let img = require('./images/big.jpg');
console.log(css_json);
Vue.component('todoList',{
    template:`
    <div :class="css_json.wrap">累了累了
        <div :class="css_json.a">12345</div>
        <div class="b">678910</div>
        <img :src="img" alt="">
    </div>
    `,
    data(){
        return{
            css_json:css_json,
            img:img
        }
    },
    methods:{
        fn(){
            // cnpm i --save-dev babel-preset-es2015 转码
            let [d,,e] = [1,2,3];
            console.log(d);
            console.log(e);
        }
    }
});