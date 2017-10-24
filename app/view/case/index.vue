<template>
    <indoor>
        <addbtn :btn="btn"></addbtn>
        <table class="list-table" cellpadding="0" border="0">
            <thead>
            <tr>
                <th>标题</th>
                <th>封面</th>
                <th>所属分类</th>
                <th>作者</th>
                <th>添加时间</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>中华人民</td>
                <td><img width="100" src="/wgc/style/file/car.jpg"/></td>
                <td>分类</td>
                <td>admin</td>
                <td>2017-12-11 11:00:00</td>
                <td>操作</td>
            </tr>
            </tbody>
        </table>
    </indoor>
</template>

<script>
    import addbtn from '../../commpents/meun/addbtn'

    export default {
        components: {addbtn},
        data() {
            return {
                btn: [{
                    type: 'link',
                    url: {
                        name: 'caseadd'
                    },
                    name: '添加案例',
                    class: 'btn-add-model'
                }
                ]
            }
        },
        watch: {
            username: function (val, oldval) {
                console.log(this.login);
            }
        },
        methods: {
            sub() {
                console.log(this.$data);
            }
        },
        events: {}
    };
</script>
