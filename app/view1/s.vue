
<template>
    <section>

    </section>

</template>

<script>
    export default {
        watch: {
            '$route': function(to, from) {
                if (this.$route.params.id) {

                }

            }
        },
        created() {

            console.log(this.$route.params.id);
        }
    };
</script>
