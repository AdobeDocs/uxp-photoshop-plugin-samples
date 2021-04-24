<template>
    <form style="padding: 20px;">
        <sp-heading>
            {{ message }}
        </sp-heading>
        <sp-body>
            Button has been clicked {{ count }} times.
        </sp-body>
            <sp-button v-on:click="increment">Click me</sp-button>
    </form>
</template>

<script>
    module.exports = {
        methods: {
            increment() {
                this.count++;
            }
        },
        data() {
            return {
                reactive: true,
                message: 'Hello World Vue Component!',
                count: 0
            }
        }
    }
</script>
