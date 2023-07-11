<template>
    <div>
        <tableDisplay />
    </div>
</template>
<script setup>
import tableDisplay from '@/components/tableDisplay.vue';
import {provide} from 'vue';
provide('table','Account')
provide('isOperation',false)
provide('isDisabled',true)
provide('viewMode','view')
</script>