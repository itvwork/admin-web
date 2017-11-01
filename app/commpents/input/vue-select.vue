<template>
    <label class="row-label">
        <span class="row-title" v-if="toggleTitle==1" :style="{width:tw}">{{title}}</span>
        <span class="text-outdoor">
        <div class="vue-select" @click="option=!option">
            <input type="text" :placeholder="tips"  readonly="readonly" v-model="showtitle">
            <div class="vue-option" v-show="option" :class="{up:seat,down:!seat}">
                <p class="vue-option-item" v-for="(item,index) in sort" :value="item._id" @click="updateValue(index)">{{item.title}}</p>
            </div>
        </div>

            <!--<em class="err-msg" v-if="err!==true">{{err}}</em>-->
  </span>
    </label>
</template>


<script>
    export default {
        props: {
            value: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: '标题'
            },
            tips: {
                type: String,
                default: '请输入内容'
            },
            type: {
                type: String,
                default: 'text'
            },
            tw: {
                type: String,
                default: '.1rem'
            },
            name: {
                type: String,
                default: 'username'
            },
            sort: {
                type: Array,
                default: []
            },
            toggleTitle: {
                type: String,
                default: '0'
            }
        },
        computed: {},
        data() {
            return {

                seat: false,
                des: 10,
                option: false,
                showtitle: ''
            }
        },
        created() {
            let self = this;
            this.$root.uievent.$on('scroll', function (e) {
                let scrollHeight = e.target.scrollHeight;
                let scrollTop = e.target.scrollTop;
                let height = e.target.offsetHeight;
                let solt = self.$el.offsetTop;
                if (solt - scrollTop < height - 260) {
                    self.seat = false;
                } else {
                    self.seat = true;
                }

            });
            document.addEventListener('click', function (e) {
                let node = e.target;
                while (node.nodeName.toLowerCase() != "body" && node.className.toLowerCase() != "vue-select") {
                    node = node.parentNode;
                }
                if (node.className.toLowerCase() !== "vue-select") {
                    self.option = false;
                }
            })


        },

        methods: {
            updateValue: function (index) {

                this.$emit('update:value',this.sort[index]._id);
                this.showtitle = this.sort[index].title;
                this.option=false;

            },

            close: function () {
                console.log(this.$el)
            },
            findName() {
                if (this.value) {
                    sort.forEach(function (ele) {
                        console.log(ele);
                    })

                }
            }


        }

    };
</script>
