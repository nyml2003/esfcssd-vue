<template>
    <div>
        <router-view />
    </div>
</template>
<script setup>
import { onMounted, provide, ref } from "vue";
import Cookies from "js-cookie";
provide('id',JSON.parse(Cookies.get('admin')).usrPermission)
</script>