<template>
    <div>
        <tableDisplay />
    </div>
</template>
<script setup>
import tableDisplay from '@/components/tableDisplay.vue';
import { provide } from 'vue';
import Cookies from "js-cookie";
provide('table', 'Staffapplicationrecord');
provide('id',JSON.parse(Cookies.get('admin')).usrPermission)
provide('idName','sarCompanyID')
provide('pkid','sarID')
provide('isOperation',false)
provide('isDisabled',true)
provide('viewMode','view')
</script>
