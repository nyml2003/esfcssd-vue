<template>
    <div>
        <tableDisplay />
    </div>
</template>
<script setup>
import tableDisplay from '@/components/tableDisplay.vue';
import { provide } from 'vue';
import Cookies from "js-cookie";
provide('table', 'CollectBill');
provide('isOperation',false)
provide('isDisabled',true)
provide('viewMode','view')
</script>