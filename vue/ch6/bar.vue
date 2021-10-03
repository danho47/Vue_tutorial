<template>
    <div class="bar">
        <h1 class="header">Bar component</h1>
        <p>This is a Bar component. </p>
        <foo class="header"/>
    </div>
</template>

<script>
import Foo from './foo.vue'

export default {
    components: {
        Foo
    }
}
</script>

<style scoped>
.bar {
    border: 1px solid red;
    margin: 4px;
    padding: 4px;
}
.header { font-size: 125%; }
</style>