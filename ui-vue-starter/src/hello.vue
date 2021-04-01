<template>
    <form style="width: 300px;">
        <h1>
            {{ message }}
        </h1>
        <p>
            Button has been clicked {{ count }} times.
        </p>
        <footer>
            <button uxp-variant="cta" v-on:click="increment">Click me</button>
            <button type="submit" uxp-variant="primary" v-on:click="close">Done</button>
        </footer>
    </form>
</template>

<script>
    module.exports = {
        props: {
            dialog: {
                type: Object
            }
        },
        methods: {
            increment() {
                this.count++;
            },
            close() {
                this.dialog.close();
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
