<template>
    <div>
        <tableDisplay />
    </div>
</template>
<script setup>
import tableDisplay from '@/components/tableDisplay.vue';
import { provide } from 'vue';
provide('table', 'Dpfederation');
// provide('idName','dpfid')
</script>