<template>
    <div>
        <tableDisplay />
    </div>
</template>
<script setup>
import tableDisplay from '@/components/tableDisplay.vue';
import { provide,ref,onMounted } from 'vue';
import request from '@/utils/request'
provide('table', 'Staffapplicationrecord');
provide('idName','sarid')
provide('pkid','sarid')
</script>