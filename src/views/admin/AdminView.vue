<template>
    <div>
        <router-view />
    </div>
</template>
<script setup>
import { provide } from 'vue';
provide('isOperation',true);
provide('isDisabled',false);
provide('viewMode','edit');
</script>