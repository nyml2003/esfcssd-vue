import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin:false,
    user:{
      uid:'',
      username:'',
      role:'',
    },
    Pno:'',
    isDataExist:false,
    columns: new Map([
      ["Pno", "患者编号"],
      ["Pname", "患者姓名"],
      ["Pid", "身份证号"],
      ["Pino", "社会保险号"],
      ["Pmno", "医疗卡识别号"],
      ["Psex", "性别"],
      ["Pbd", "出生日期"],
      ["Padd", "地址"],
      ["单位电话", "单位电话"],
      ["家庭电话", "家庭电话"],
      ["手机", "手机"],
      ["Dno", "医生编号"],
      ["Dname", "医生姓名"],
      ["Dsex", "性别"],
      ["Dage", "年龄"],
      ["Ddeptno", "所属部门编号"],
      ["Tno", "职称编号"],
      ["DeptNo", "部门编号"],
      ["DeptName", "部门名称"],
      ["ParentDeptNo", "上级部门编号"],
      ["Manager", "部门负责人编号"],
      ["Sno", "工资类型"],
      ["Ttype", "职称类型"],
      ["Ttrade", "所属行业"],
      ["Slevel", "工资级别"],
      ["Snumber", "工资数额"],
      ["GMno", "主单编号"],
      ["GMdate", "入库时间"],
      ["GMname", "主单名称"],
      ["GSno", "子单编号"],
      ["Mno", "药品编号"],
      ["GSnumber", "数量"],
      ["GSunit", "单位"],
      ["GSbatch", "批号"],
      ["GSprice", "单价"],
      ["GSexpdate", "有效期"],
      ["Mname", "药品名称"],
      ["Mprice", "药品价格"],
      ["Mtype", "药品类型"],
      ["Munit", "药品单位"],
      ["DGno", "诊断编号"],
      ["Symptom", "症状"],
      ["Diagnosis", "诊断结论"],
      ["DGtime", "诊断时间"],
      ["Rfee", "就诊费"],
      ["RMno", "处方编号"],
      ["RMage", "患者年龄"],
      ["RMtime", "处方时间"],
      ["RDno", "处方药品编号"],
      ["RDprice", "药品价格"],
      ["RDnumber", "药品数量"],
      ["RDunit", "药品单位"],
      ["RFno", "挂号单编号"],
      ["RFdept", "挂号部门"],
      ["RFdoctor", "挂号医生"],
      ["RFpatient", "挂号患者"],
      ["RFcashier", "挂号收费员"],
      ["RFtime", "挂号时间"],
      ["RFvisittime", "就诊时间"],
      ["RFfee", "挂号费用"],
      ["RFnotes", "备注"],
      ["Fno", "收费单编号"],
      ["Fnumber", "收费单号"],
      ["Fdate", "日期"],
      ["Rno", "处方编号"],
      ["Cno", "收费员编号"],
      ["Pno", "患者编号"],
      ["FRecipefee", "处方费用"],
      ["Fdiscount", "折扣"],
      ["Fsum", "实收金额"],
      ["Ptel","手机号码"],
      ["uid","uid"],
      ['username','用户名'],
    ]),
    rawTableParanms: {
      patient: {
        name: "患者信息",
        dataColumns: ["Pno","Pname","Pid","Pino","Pmno","Psex","Pbd","Padd","Ptel"],
        table: "`cs2305.patient`",
        pk: "Pno",
        dateCol: ["Pbd"],
        datetimeCol: [],
      },
      dept: {
        name: "部门信息",
        dataColumns: ["DeptNo", "DeptName", "ParentDeptNo", "Manager"],
        table: "`cs2305.dept`",
        pk: "DeptNo",
        dateCol: [],
        datetimeCol: []
      },
      doctor:{
        name: "医生信息",
        dataColumns: ["Dno", "Dname", "Dsex", "Dage", "Ddeptno", "Tno"],
        table: "`cs2305.doctor`",
        pk: "Dno",
        dateCol: [],
        datetimeCol: [],
      },
      title:{
        name: "职称信息",
        dataColumns: ["Tno", "Sno", "Ttype", "Ttrade"],
        table: "`cs2305.title`",
        pk: "Tno",
        dateCol: [],
        datetimeCol: [],
      },
      salary:{
        name: "工资信息",
        dataColumns: ["Sno", "Slevel", "Snumber"],
        table: "`cs2305.Salary`",
        pk: "Sno",
        dateCol: [],
        datetimeCol: [],
      },
      godown_entry: {
        name: "入库主单",
        dataColumns: ["GMno", "GMdate", "GMname"],
        table: "`cs2305.godown_entry`",
        pk: "GMno",
        dateCol: [],
        datetimeCol:["GMdate"]
      },
      godown_slave: {
        name: "入库子单",
        dataColumns: ["GMno","Mno","GSnumber","GSunit", "GSbatch", "GSprice", "GSexpdate"],
        table: "`cs2305.godown_slave`",
        pk: "GMno",
        dateCol: ["GSexpdate"],
        datetimeCol: [],
      },
      medicine: {
        name: "药品信息",
        dataColumns: ["Mno", "Mname", "Munit", "Mprice", "Mtype"],
        table: "`cs2305.medicine`",
        pk: "Mno",
        dateCol: [],
        datetimeCol: []
      },
      diagnosis: {
        name: "诊断信息",
        dataColumns: [ "Pno", "Dno", "Symptom","Diagnosis","DGtime","Rfee"],
        table: "`cs2305.diagnosis`",
        pk: "Pno",
        dateCol: [],
        datetimeCol: ["DGtime"]
      },
      Recipe_Master:{
        name: "处方",
        dataColumns: ["RMno","DeptNo","Dno","Pno","RMage","RMtime"],
        table: "`cs2305.Recipe_Master`",
        pk: "RMno",
        dateCol: [],
        datetimeCol: ["RMtime"]
      },
      Recipe_Detail:{
        name: "处方药品",
        dataColumns:["RDno","RMno","Mno","RDprice","RDnumber","RDunit"],
        table: "`cs2305.Recipe_Detail`",
        pk: "RDno",
        dateCol: [],
        datetimeCol: []
      },
      Register_Form:{
        name: "挂号单",
        dataColumns:["RFno","RFdept","RFdoctor","RFpatient","RFcashier","RFtime","RFvisittime","RFfee","RFnotes"],
        table: "`cs2305.Register_Form`",
        pk: "RFno",
        dateCol: [],
        datetimeCol: ["RFtime","RFvisittime"]
      },
      Fee:{
        name: "收费单",
        dataColumns:["Fno","Fnumber","Fdate","DGno","RMno","Cno","Pno","FRecipefee","Fdiscount","Fsum"],
        table: "`cs2305.Fee`",
        pk: "Fno",
        dateCol: [],
        datetimeCol: ["Fdate"]
      }
    },
    rawViewParanms: {
      patient:{
        name: "患者信息",
        dataColumns:["Pno","Pname","Pid","Pino","Pmno","Psex","Pbd","Padd","Ptel"],
        view: "patient_info",
        dateCol: ["Pbd"],
        datetimeCol: [],
      },
      doctor:{
        name: "医生信息",
        dataColumns:[ "Dname", "Dsex", "Dage","DeptName","Ttype","Ttrade","Slevel","Snumber"],
        view: "doctor_info",
        dateCol: [],
        datetimeCol: [],
      }, 
    },
    RegisterFormView:{
        name: "挂号单",
        dataColumns:["RFno","DeptName","Dname","Pname","RFcashier","RFtime","RFvisittime","RFfee","RFnotes"],
        view: "RegisterFormView",
        dateCol: [],
        datetimeCol: ["RFtime","RFvisittime"]
      }  
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user
      state.isLogin = true
    },
    logout(state) {
      state.isLogin=false
      state.user={
        uid:'',
        username:'',
        role:''
      }
    },
    setPno(state,pno){
      state.Pno=pno
    },
    setDataExisit(state,isDataExist){
      state.isDataExist=isDataExist
    }
  },
  actions: {},
  modules: {},
});
