<template>
    <div>
        <router-view />
    </div>
</template>
<script setup>
import { onMounted, provide, ref } from "vue";
const id=ref(Math.floor(Math.random() * 100) + 1)
provide('id',id)
provide('table','Company')
</script>