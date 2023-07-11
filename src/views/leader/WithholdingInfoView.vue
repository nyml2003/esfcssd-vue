<template>
    <div>
        <tableDisplay />
    </div>
</template>
<script setup>
import tableDisplay from '@/components/tableDisplay.vue';
import { provide } from 'vue';
import Cookies from "js-cookie";
provide('table', 'Withheldbill');
provide('id',JSON.parse(Cookies.get('admin')).usrPermission)
provide('idName','wbFinancialID')
provide('isOperation',false)
provide('isDisabled',true)
provide('viewMode','view')
</script>