<template>
    <div class="container">
        <el-form label-width="120px">
            <el-form-item v-for="index in column.length" :key="index" :label="column[index - 1].label">
                <el-input v-model="data[column[index - 1].prop]" disabled></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import request from '@/utils/request'
import { inject } from 'vue'
const id = ref(inject('id'));
const table = ref(inject('table'));
const commitQueryData = ref({})
const currentPage = ref(1)
const recordsPerPage = ref(10)
const column = ref(require('@/assets/json/' + table.value + '.json').column)
const data = ref([])
const loadData = async () => {
    console.log(column)
    commitQueryData.value["pageNum"] = currentPage.value
    commitQueryData.value["pageSize"] = recordsPerPage.value
    // const response=await request.post('/'+table.value+'/search'+table.value,commitQueryData.value)
    const response = await request.get('/' + table.value + '/get' + table.value + 'ById/' + id.value)
    console.log(response.data)
    data.value = response.data
}
onMounted(() => {
    loadData()
})


</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}
</style>