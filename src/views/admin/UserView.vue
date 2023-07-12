<template>
    <div>
        <tableDisplay />
    </div>
</template>
<script setup>
import tableDisplay from '@/components/tableDisplay.vue';
import { provide } from 'vue';
provide('table', 'User');
provide('idName','usrId')
provide('pkid','usrId')
</script>