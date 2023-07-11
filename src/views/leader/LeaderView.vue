<template>
    <div>
        <router-view />
    </div>
</template>
<script setup>
import { onMounted, provide, ref } from "vue";
import Cookies from "js-cookie";
const id=ref(Math.floor(Math.random() * 100) + 1)
provide('id',Cookies.get('admin').userPermission)
provide('table','Company')
</script>