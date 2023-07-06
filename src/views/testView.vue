<template>
    <el-table :data="tableData">
      <el-table-column v-for="column in columns" :key="column.prop" :label="column.label">
        <template #default="row">
          <div v-if="row.editable">
            <el-input v-if="column.type === 'input'" v-model="row[column.prop]" />
            <el-select v-else-if="column.type === 'select'" v-model="row[column.prop]">
              <el-option v-for="option in column.options" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </div>
          <div v-else>{{ row[column.prop] }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="[{}]">
      <el-table-column v-for="column in columns" :key="column.prop" :label="column.label">
        <template #default="row">
          <el-input v-if="column.type === 'input'" v-model="row[column.prop]" />
          <el-select v-else-if="column.type === 'select'" v-model="row[column.prop]">
            <el-option v-for="option in column.options" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </template>
      </el-table-column>
    </el-table>

    
  </template>
  
<script setup>
import { ref } from "vue";
const tableData = ref([
  {
    dno: 21,
    uid: 11,
    dname: "刘伟",
    dsex: "男",
    dage: 43,
    ddeptno: 20,
    tno: 104,
  },
  {
    dno: 73,
    uid: 13,
    dname: "邓英超",
    dsex: "女",
    dage: 43,
    ddeptno: 201,
    tno: 105,
  },
  {
    dno: 82,
    uid: 14,
    dname: "杨勋",
    dsex: "男",
    dage: 36,
    ddeptno: 101,
    tno: 104,
  },
  {
    dno: 140,
    uid: 10,
    dname: "郝亦柯",
    dsex: "男",
    dage: 28,
    ddeptno: 102,
    tno: 102,
  },
  {
    dno: 153,
    uid: 15,
    dname: "希何芊",
    dsex: "女",
    dage: 39,
    ddeptno: 201,
    tno: 104,
  },
  {
    dno: 368,
    uid: 12,
    dname: "罗晓",
    dsex: "女",
    dage: 27,
    ddeptno: 102,
    tno: 103,
  },
  {
    dno: 371,
    uid: 16,
    dname: "季仁",
    dsex: "男",
    dage: 30,
    ddeptno: 103,
    tno: 102,
  },
  {
    dno: 372,
    uid: 17,
    dname: "钟炎",
    dsex: "男",
    dage: 45,
    ddeptno: 101,
    tno: 105,
  },
]);
const columns = [
  { label: "编号", prop: "dno", type: "fixed" },
  { label: "姓名", prop: "dname", type: "input" },
  {
    label: "性别",
    prop: "dsex",
    type: "select",
    options: [
      { value: "男", label: "男" },
      { value: "女", label: "女" },
    ],
  },
  { label: "年龄", prop: "dage", type: "input" },
  { label: "部门编号", prop: "ddeptno", type: "input" },
  { label: "职位编号", prop: "tno", type: "input" },
];

</script>


<style scoped>
</style>
