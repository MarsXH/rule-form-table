<template>
  <div class="ruleFormContanier">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="table-body">
      <el-table
        :data="ruleForm.tableData"
        style="width: 100%"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <!-- 多选 -->
        <el-table-column
          v-if="showSelection"
          type="selection"
          width="60"
          align="center"
          :reserve-selection="reserveSelection"
          :selectable="selectable"
        ></el-table-column>
        <!-- 序号 -->
        <el-table-column
          v-if="showIndex"
          type="index"
          width="60"
          align="center"
          :label="tableIndexLabel"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column
          v-for="(item, index) in ruleForm.tableHeader"
          :prop="item.field"
          :label="item.label"
          :key="index"
          :label-class-name="
            rules[item.field] && isRequired(rules[item.field])
              ? 'isValidate'
              : ''
          "
          :width="item.width"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + item.field"
              :rules="rules[item.field]"
            >
              <template v-if="item.fieldType === 'slot'">
                <slot
                  :name="item.field"
                  :row="scope.row"
                  :$index="scope.$index"
                  :column="scope.column"
                  :store="scope.store"
                ></slot>
              </template>
              <span v-else>
                <el-input
                  v-if="item.isColEdit && scope.row.isRowEdit"
                  v-model="scope.row[item.field]"
                  clearable
                ></el-input>
                <span v-else>{{ scope.row[item.field] }}</span>
              </span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          v-if="showOperation"
          prop="tableOperation"
          label="操作"
        >
          <template slot-scope="scope">
            <slot
              name="tableOperation"
              :row="scope.row"
              :$index="scope.$index"
              :column="scope.column"
              :store="scope.store"
            ></slot>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div v-if="hasFooter" :class="['table-footer', placement]">
      <el-button @click="resetFormTable()">
        {{ textMap.cancel.text }}
      </el-button>
      <el-button type="primary" @click="validFormTable()">
        {{ textMap.submit.text }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ruleFormTable',
  components: {},
  props: {
    showSelection: { type: Boolean, default: false },
    showIndex: { type: Boolean, default: false },
    indexMethod: { type: Object, default: () => {} },
    tableIndexLabel: { type: String, default: '序号' },
    showOperation: { type: Boolean, default: true },
    ruleForm: {
      type: Object,
      default: {
        tableHeader: [],
        tableData: [],
      },
    },
    rules: { type: Object, default: {} },
    textMap: {
      type: Object,
      default: () => ({
        cancel: { text: '重 置' },
        submit: { text: '确 定' },
      }),
    },
    placement: { type: String, default: 'right' },
    hasFooter: { type: Boolean, default: true },
  },
  data() {
    return {};
  },

  methods: {
    isRequired(rules) {
      const find = rules.find((item) => {
        return item.required === true;
      });
      if (find) {
        return true;
      } else {
        return false;
      }
    },
    validFormTable() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit');
        }
      });
    },

    validSingleFormTable(index, props) {
      let flag = true;
      props.forEach((item) => {
        this.$refs.ruleForm.validateField(
          'tableData.' + index + '.' + item,
          (val) => {
            if (val) {
              return (flag = false);
            }
          }
        );
      });
      return flag;
    },

    resetFormTable() {
      this.$refs.ruleForm.resetFields();
      this.$emit('reset');
    },

    resetSingleFormTable(index, props) {
      props.forEach((item) => {
        this.$refs.ruleForm.clearValidate('tableData.' + index + '.' + item);
      });
    },
  },
};
</script>

<style scoped lang="less">
.ruleFormContanier {
  ::v-deep .isValidate {
    .cell::before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }
  ::v-deep .el-table__body td {
    padding: 0px;
  }
  .el-form-item {
    margin: 15px 0;
  }

  .table-footer {
    height: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
    &.right {
      padding-right: 25px;
      justify-content: flex-end;
    }
    &.center {
      justify-content: center;
    }
    &.left {
      padding-left: 25px;
      justify-content: flex-start;
    }
  }
}
</style>
