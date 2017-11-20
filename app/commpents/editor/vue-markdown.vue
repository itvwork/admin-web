<template lang="html">
   <div class="markdown">
       <div class="markdown-editor">
         <ul class="vue-editor-nav">
         </ul>
             <textarea class="markdown-code"  v-model="content"  @keydown="key($event)"
                   @mouseup="updatePosition" @keyup="updatePosition"
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
          num: 12},
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
    _execCommand(name, value) {

      if (this.range === null) {
       return false;
      }
      this.restoreSelection();
      document.execCommand(name, false, value);
      this.saveRange();
   },
    //恢复焦点
    restoreSelection() {
     const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(this.range);
      this.saveRange();
    },
    queryCommandValue(name) {
      return document.queryCommandValue(name)
    },
    // 封装 document.queryCommandState
    queryCommandState(name) {
      return document.queryCommandState(name)
    },
    // 封装 document.queryCommandSupported
    queryCommandSupported(name) {
     return document.queryCommandSupported(name)
    },
    saveRange(e) {
        if (e && (!this.nodes)) {
            this.nodes = e.target;
        }
        const selection = window.getSelection();
        if (selection.rangeCount === 0) {
            return
       }
       const range = selection.getRangeAt(0);
        this.range = range;
      },
      updatePosition(ev) {
        let alt = ev.altKey;
        let ctrl = ev.ctrlKey;
        let shift = ev.shiftKey;
        let meta = ev.metaKey;

        if ((!alt) && (!ctrl) && (!shift)) {
          switch (ev.keyCode) {
            case 8:
              if (this.getContent().length < 1) {
               ev.preventDefault();
                this._execCommand('formatBlock', '<p>');
                 }
                 break;
             }
           }
          let section = window.getSelection().anchorNode;
          if (section.nodeType == 1) {
         if (section.nodeName.toLowerCase() == "span" || section.imgurl) {
           this.imgp = {
             top: section.offsetTop + 'px',
             left: section.offsetLeft + 'px'

           }		}}
           this.saveRange(ev); },
           allowDrop(event) {
         event.preventDefault();
     },
     async drap(event) {
         event.preventDefault();
         var self = this;
         var file = event.dataTransfer.files; //获取文件
        var img = await this.$tool.base64(1920, file);
         let result = await this.$ajax.postXhr2(this.Api.uploads,{token: this.$store.state.token,data:img,type:'content'} );
         if(result.err_code==200){
             let list=result.data;
             let str='';
             for(let i =0 ,len=list.length;i<len;i++){
                  str+=`<span value="pics"><img src="${Api.imgurl}${list[i].path}"</span>`;
                }
          this._execCommand("insertHTML",str);
            }
            //this.upload(img);
          },
          key: function (ev) {

          }

        }
 }
 </script>
