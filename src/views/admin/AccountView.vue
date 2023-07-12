<template>
    <div>
        <tableDisplay />
    </div>
</template>
<script setup>
import tableDisplay from '@/components/tableDisplay.vue';
import { provide } from 'vue';
provide('table', 'Account');
provide('idName','aid');
provide('isOperation',true);
provide('isDisabled',false);
provide('viewMode','edit');
provide('pkid','aid');
</script>