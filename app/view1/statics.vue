<template>
    <section>

        <textarea v-model="html" style="width:100%;height: 500px;"></textarea>
        <vue-markdown :source="html"  ></vue-markdown>

        <router-view></router-view>
    </section>

</template>

<script>

    export default {
        data(){
            return{
                html:'``` javascript\n' +
                '\n' +
                '    var foo = function (bar) {\n' +
                '    return bar++;\n' +
                '    };\n' +
                '\n' +
                '    console.log(foo(5));\n' +
                '\n' +
                '```'
            }
        }


    };
</script>
