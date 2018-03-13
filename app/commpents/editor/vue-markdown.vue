<template lang="html">
   <div class="markdown">
       <div class="markdown-editor">
         <button class="btn selectword" @click="insertAfterText('---fds-af-das-f')">选中文字</button>
         <ul class="vue-editor-nav">
         </ul>
             <textarea ref="text" class="markdown-code"  v-model="content"  @keydown="key($event)"
                   @mousedown="updatePosition"  @keyup="updatePosition"
                @dragover="allowDrop($event)" @drop="drap($event)"
             ></textarea>
            <section class="editor-img" v-show="picshow">
                 <div class="editor-tab-img">
                     <span class="editor-title-img" :class="{active:tabimg==2}" @click="openPic()">图片库</span>
                     <span class="editor-title-img" :class="{active:tabimg==3}" @click="tabimg=3">网络图片</span>
                 </div>

                 <div class="tab1-img" v-show="tabimg==2">
                     <ul class="list-pic">
                         <li class="pic-item" v-for="(item,index) in pic.data">
                             <label :class="{checked:pic.selecter.indexOf(item.path)>=0}">
                                 <div class="show-img"><img :src="Api.imgurl+item.path"></div>
                                 <div class="pic-checks">
                                     <i class="icon icon-checks" :class="{active:pic.selecter.indexOf(item.path)>=0}"></i>
                                     <p>{{item.width}}*{{item.height}} </p>
                                 </div>
                                <input type="checkbox" :checked="pic.selecter.indexOf(item.path)>=0" :value="item.path"
                                        v-model="pic.selecter">
                             </label>
                         </li>
                             <span class="vuk-deitor-loading" @click="getPics()"><i v-show="pic.more=='加载中...'"><img width="20" src="/style/admin/style/file/loading.svg" /></i>{{pic.more}}</span>
                     </ul>

                     <div class="editor-oper-bar">
                         <button class="editor-btn-sure" @click="insertPic()">插入</button>
                         <select class="type" @change="searchPic()" v-model="pic.search">
                           <option value="0">全部</option>
                           <option value="200-400">200-400</option>
                           <option value="600-800">600-800</option>
                           <option value="800-1200">800-1200</option>
                           <option value="1200-1600">1200-1600;</option>
                           <option value="1600">1600以上</option>
                        </select>
                     </div>

                 </div>
                 <div class="tab1-img" v-show="tabimg==3">3</div>
             </section>

       </div>

       <div class="show-content" v-html="format()">

       </div>
   </div>
 </template>
 <script>
import showdown from 'showdown';
let converter = new showdown.Converter();
export default {
    name: 'markdown',
    props: {
        source: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            content: this.source,
            picshow: false,
            tabimg: 2,
            pic: {
                selecter: [],
                data: [],
                page: 1,
                count: 0,
                size: {
                    width: '',
                    height: ''
                },
                search: '0',
                more: '加载更多'
            }
        }
    },


    methods: {
        format() {
            return converter.makeHtml(this.content);
        },
        openPic() {
            this.tabimg = 2;
            this.pic.selecter = [];
            if (this.picshow && this.pic.data.length <= 0) {
                this.getPics();

            }
        },
        searchPic() {
            this.pic.page = 1;
            this.getPics();

        },
        async getPics() {
            let arr = this.pic.search.split('-');
            var search = "";
            if (arr.length >= 2) {
                search = {
                    $gt: arr[0],
                    $lt: arr[1]
                }
            } else {
                search = {
                    $gt: arr[0]
                }
            }
            this.pic.more = "加载中...";
            let result = await this.$ajax.post(this.Api.file, {
                data: {
                    page: this.pic.page,
                    query: {
                        width: search
                    },
                    num: 12
                },
                token: this.$store.state.token
            })
            if (result.err_code == 200) {
                let list = result.data.result;
                if (this.pic.page > 1) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        this.pic.data.push(list[i]);
                    }
                } else {
                    this.pic.data = list;
                }

                this.pic.count = result.data.count;
                this.pic.page++;

            }
            this.pic.more = '加载更多';
        },
        insertPic() {
            this.restoreSelection();
            let pic = '';
            let list = this.pic.selecter;
            for (var i = 0, len = list.length; i < len; i++) {
                pic += `<img src="${this.Api.imgurl}${list[i]}" imgurl="${list[i]}" >`;
            }
            this._execCommand('insertHTML', pic);
            this.pic.selecter = [];
            this.picshow = false;

        },

        //选中文字
        setSelectText(startPos, endPos) {
            let textDom = this.$refs.text;
            var startPos = parseInt(startPos),
                endPos = parseInt(endPos),
                textLength = textDom.value.length;
            if (textLength) {
                if (!startPos) {
                    startPos = 0;
                }
                if (!endPos) {
                    endPos = textLength;
                }
                if (startPos > textLength) {
                    startPos = textLength;
                }
                if (endPos > textLength) {
                    endPos = textLength;
                }
                if (startPos < 0) {
                    startPos = textLength + startPos;
                }
                if (endPos < 0) {
                    endPos = textLength + endPos;
                }
                if (textDom.createTextRange) {
                    // IE Support
                    var range = textDom.createTextRange();
                    range.moveStart("character", -textLength);
                    range.moveEnd("character", -textLength);
                    range.moveStart("character", startPos);
                    range.moveEnd("character", endPos);
                    range.select();
                } else {
                    // Firefox support
                    textDom.setSelectionRange(startPos, endPos);
                    textDom.focus();
                }
            }
        },
        updatePosition(ev) { //保存text光标位置
            let textDom = this.$refs.text;
            var cursorPos = 0;
            if (document.selection) {
                // IE Support
                textDom.focus();
                var selectRange = document.selection.createRange();
                selectRange.moveStart('character', -textDom.value.length);
                cursorPos = selectRange.text.length;
            } else if (textDom.selectionStart || textDom.selectionStart == '0') {
                // Firefox support
                cursorPos = textDom.selectionStart;
            }
            this.range = cursorPos;



        },
        setCaretPosition(textDom, pos) {
            if (textDom.setSelectionRange) {
                // IE Support
                textDom.focus();
                textDom.setSelectionRange(pos, pos);
            } else if (textDom.createTextRange) {
                // Firefox support

                var range = textDom.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        },
        //在光标后面插入文字或选中的文字中插入文字
        insertAfterText(value) {
            let textDom = this.$refs.text;
            var selectRange;
            if (document.selection) {
                // IE Support
                textDom.focus();
                selectRange = document.selection.createRange();
                selectRange.text = value;
                textDom.focus();
            } else if (textDom.selectionStart || textDom.selectionStart == '0') {
                // Firefox support
                var startPos = textDom.selectionStart;
                var endPos = textDom.selectionEnd;
                var scrollTop = textDom.scrollTop;
                textDom.value = textDom.value.substring(0, startPos) + value + textDom.value.substring(endPos, textDom.value.length);
                textDom.focus();
                textDom.selectionStart = startPos + value.length;
                textDom.selectionEnd = startPos + value.length;
                textDom.scrollTop = scrollTop;
            } else {
                textDom.value += value;
                textDom.focus();
            }
        },
        allowDrop(event) {
            event.preventDefault();
        },
        async drap(event) {
            event.preventDefault();
            var self = this;
            var file = event.dataTransfer.files; //获取文件
            var img = await this.$tool.base64(1920, file);
            let result = await this.$ajax.postXhr2(this.Api.uploads, {
                data: img,
                token: this.$store.state.user.token,
                type: 'content'
            });


            // if (result.err_code == 200) {
            //     let list = result.data;
            //     let str = '';
            //     for (let i = 0, len = list.length; i < len; i++) {
            //         str += `<span value="pics"><img src="${Api.imgurl}${list[i].path}"</span>`;
            //     }
            //     this._execCommand("insertHTML", str);
            // }
            //this.upload(img);
        },
        key: function(ev) {

        }

    }
}
</script>
