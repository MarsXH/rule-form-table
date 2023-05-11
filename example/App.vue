<template>
  <div id="app">
    <div>
      <h1>点击保存对整个table校验</h1>
      <el-button type="text" @click="handleAdd" class="addFieldButton">
        新增
      </el-button>
      <rule-form-table
        ref="tableRef"
        showIndex
        :ruleForm="ruleForm"
        :rules="rules"
        :textMap="textMap"
        @submit="handleSave"
        @reset="handleReset"
        :row-class-name="tableRowClassName"
        border
      >
        <template v-slot:date="{ row }">
          <el-date-picker
            v-if="row.isRowEdit"
            type="date"
            placeholder="选择日期"
            v-model="row.date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
          <span v-else>{{ row.date }}</span>
        </template>
        <template v-slot:tableOperation="{ row, $index }">
          <el-button
            type="text"
            size="medium"
            @click="handleDelete($index, row)"
            style="color: #f56c6c"
          >
            删除
          </el-button>
        </template>
      </rule-form-table>
      <h1>点击保存对每一行table校验</h1>
      <el-button type="text" @click="handleSingleAdd" class="addFieldButton">
        新增
      </el-button>
      <rule-form-table
        ref="tableSingleRef"
        showIndex
        :ruleForm="ruleSingleForm"
        :rules="rules"
        :has-footer="false"
        border
      >
        <template v-slot:date="{ row }">
          <el-date-picker
            v-if="row.isRowEdit"
            type="date"
            placeholder="选择日期"
            v-model="row.date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
          <span v-else>{{ row.date }}</span>
        </template>
        <template v-slot:tableOperation="{ row, $index }">
          <el-button
            type="text"
            size="medium"
            @click="handleSingleSave($index, row)"
          >
            {{ row.isRowEdit ? '保存' : '编辑' }}
          </el-button>
          <el-button
            type="text"
            size="medium"
            @click="handleSingleDelete($index, row)"
            style="color: #f56c6c"
          >
            删除
          </el-button>
        </template>
      </rule-form-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RuleFormTable from '../src/index';
import { Message } from 'element-ui';

export default Vue.extend({
  name: 'app',
  components: {
    RuleFormTable,
  },
  data() {
    return {
      ruleForm: {
        tableHeader: [
          {
            label: '日期',
            field: 'date',
            fieldType: 'slot',
            isColEdit: true,
            width: 180,
          },
          {
            label: '姓名',
            field: 'name',
            isColEdit: true,
          },
          {
            label: '地址',
            field: 'address',
            isColEdit: false,
            width: 250,
          },
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            isRowEdit: true,
          },
          {
            date: '2016-05-04',
            name: '李小波',
            address: '上海市普陀区金沙江路 1517 弄',
            isRowEdit: true,
          },
          {
            date: '2016-05-01',
            name: '张小强',
            address: '上海市普陀区金沙江路 1519 弄',
            isRowEdit: true,
          },
          {
            date: '2016-05-03',
            name: '陈小杰',
            address: '上海市普陀区金沙江路 1516 弄',
            isRowEdit: true,
          },
        ],
      },
      ruleSingleForm: {
        tableHeader: [
          {
            label: '日期',
            field: 'date',
            fieldType: 'slot',
            isColEdit: true,
            width: 180,
          },
          {
            label: '姓名',
            field: 'name',
            isColEdit: true,
          },
          {
            label: '地址',
            field: 'address',
            isColEdit: false,
            width: 250,
          },
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            isRowEdit: false,
          },
          {
            date: '2016-05-04',
            name: '李小波',
            address: '上海市普陀区金沙江路 1517 弄',
            isRowEdit: true,
          },
          {
            date: '2016-05-01',
            name: '张小强',
            address: '上海市普陀区金沙江路 1519 弄',
            isRowEdit: true,
          },
          {
            date: '2016-05-03',
            name: '陈小杰',
            address: '上海市普陀区金沙江路 1516 弄',
            isRowEdit: true,
          },
        ],
      },
      rules: {},
      textMap: {
        cancel: { text: '重 置' },
        submit: { text: '保 存' },
      },
      isModify: true,
      isOnlyShow: false,
    };
  },
  created() {
    this.rules = this.getTableRules(this.isOnlyShow);
  },
  methods: {
    getTableRules(isOnlyShow: any) {
      return {
        date: [
          {
            required: !isOnlyShow,
            message: '请选择日期',
            trigger: 'blur',
          },
        ],
        name: [
          { required: !isOnlyShow, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur',
          },
        ],
      };
    },
    handleAdd() {
      const row = {
        isRowEdit: true,
        date: '',
        name: '',
        address: '',
      };
      this.ruleForm.tableData.push(row);
    },
    handleDelete(index: number, row: any) {
      this.ruleForm.tableData.splice(index, 1);
    },
    handleSave() {
      if (this.isModify == true) {
        Message({
          type: 'success',
          message: '保存成功',
        });
        for (let row of this.ruleForm.tableData) {
          this.$set(row, 'isRowEdit', false);
        }
        this.textMap.submit.text = '编辑';
        this.isModify = false;
      } else {
        for (let row of this.ruleForm.tableData) {
          this.$set(row, 'isRowEdit', true);
        }
        this.textMap.submit.text = '保存';
        this.isModify = true;
      }
    },
    handleReset() {
      console.log('重置');
    },
    handleSingleAdd() {
      const row = {
        isRowEdit: true,
        date: '',
        name: '',
        address: '',
      };
      this.ruleSingleForm.tableData.push(row);
    },
    handleSingleSave(index: number, row: any) {
      if (row.isRowEdit) {
        //保存
        //对单行数据进行验证
        const props = ['date', 'name', 'address'];
        const valid = (this.$refs.tableSingleRef as any).validSingleFormTable(
          index,
          props
        );
        if (valid) {
          this.$message({
            type: 'success',
            message: '保存成功',
          });
          row.isRowEdit = false;
          this.$set(this.ruleSingleForm.tableData, index, row);
        }
      } else {
        //编辑
        row.isRowEdit = true;
        this.$set(this.ruleSingleForm.tableData, index, row);
      }
    },
    handleSingleDelete(index: number, row: any) {
      this.ruleSingleForm.tableData.splice(index, 1);
      const props = ['date', 'name', 'address'];
      (this.$refs.tableSingleRef as any).resetSingleFormTable(index, props);
    },
    tableRowClassName({ row, rowIndex }: { row: any; rowIndex: any }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
  },
});
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 200px;
  margin-right: 200px;
}
::v-deep .el-table .warning-row {
  background: oldlace;
}

::v-deep .el-table .success-row {
  background: #f0f9eb;
}
</style>
