<template>
  <div class="table-wrapper">
    <section class="header">
      <el-button type="primary" @click="addRow">添加商品</el-button>
    </section>

    <el-table :data="tableData" :border="true" :fit="true">
      <el-table-column type="selection" align="center"/>
      <el-table-column type="index" align="center" label="序号" width="80px"/>
      <el-table-column align="center" label="店铺" prop="store"/>
      <el-table-column align="center" label="日期" prop="date"/>
      <el-table-column align="center" label="商品" prop="name"/>
      <el-table-column align="center" label="价格">
        <template #default="scope">
          <span>{{ scope.row.price }} 元</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="销售额">
        <el-table-column align="center" label="当日" sortable sort-by="sales.s_today.revenue">
          <template #default="scope">
            <span style="margin-right: 0.5em">{{ scope.row.sales.s_today.revenue }}&nbsp;元</span>
            <span v-if="scope.row.sales.s_today.revenue - scope.row.sales.s_lastWeek.revenue >0"
                  style="color: orangered">↑</span>
            <span v-else style="color: yellowgreen">↓</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="同比上周" sortable sort-by="sales.s_lastWeek.revenue" prop="sales.s_lastWeek.revenue">
          <template #default="scope">
            <span>{{ scope.row.sales.s_lastWeek.revenue }}&nbsp;元</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template #default="scope">
          <el-tag v-for="tag in scope.row.state" style="margin-right: 0.5em" :type="getTagType(tag)">{{ TagEnum[tag] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        <template #default="scope">
          <el-button @click="editRow(scope.row)" size="small">编辑</el-button>

          <el-popover trigger="click" :visible="scope.row.deleteRowTipVisible" placement="top" :width="160">
            <p>你确定要删除本条商品信息吗?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="scope.row.deleteRowTipVisible = false">取消</el-button>
              <el-button size="small" type="primary" @click="confirmDelete(scope.row)"
              >确认</el-button
              >
            </div>
            <template #reference>
              <el-button @click="deleteRow(scope.row)" size="small" type="danger">删除</el-button>
            </template>
          </el-popover>


        </template>
      </el-table-column>
    </el-table>
    <div class="center-center-flex">
      <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="sizes, prev, pager, next,total"
          :total="pagination.total"
          @size-change = "getGoodsList"
          @current-change="getGoodsList"
      />
    </div>
<!--    弹窗-->
    <section class="operation-dialog-wrapper">
      <el-dialog
          v-model="updateDialogVisible"
          :title="updateData.title"
          width="50%"
      >
        <div class="operation_form">
          <el-form
              :model="updateData"
              :rules="updateRules"
              ref="updateFormRef"
              label-width="100px">
            <el-form-item label="店铺名称" prop="store">
              <el-input v-model="updateData.store"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="updateData.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="updateData.price"></el-input>
            </el-form-item>
            <el-form-item label="上架状态" prop="isOnSale">
              <el-radio-group
                  @change="clearChecked" v-model="updateData.isOnSale" class="ml-4">
                <el-radio :label="1" size="large">上架</el-radio>
                <el-radio :label="0" size="large">下架</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="销售状态" prop="state">
              <el-checkbox-group v-if="updateData.isOnSale" v-model="updateData.state">
                <el-checkbox label="正常" size="large"/>
                <el-checkbox label="预售" size="large"/>
                <el-checkbox label="爆款" size="large"/>
              </el-checkbox-group>
              <el-checkbox-group v-show="!updateData.isOnSale" v-model="updateData.state">
                <el-checkbox label="缺货" size="large"/>
                <el-checkbox label="下架" size="large"/>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="updateDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitUpdateForm(updateFormRef)">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, toRaw, onMounted} from 'vue'
import {type FormInstance, type FormRules, ElMessage} from 'element-plus'
import type{Goods} from '@/api/test/type/table'
import {getGoodList as getGoodListApi} from '@/api/test/index'
import {TagEnum} from '@/enum/table'

// 表格数据
const tableData = ref<Goods[]>([])
const pagination = ref({
  pageSize:10,
  total:100,
  currentPage:1
})

const getTagType = (tag)=>{
  switch (tag){
    case 0:
      return 'success';
    case 3:
      return 'danger';
    case 4:
      return 'warning';
  }
}
// 查询
const getGoodsList = ()=>{
  getGoodListApi({pageSize:pagination.value.pageSize,currentPage:pagination.value.currentPage}).then(res=>{
    tableData.value = res.data.data
    pagination.value.total = res.data.total
  })
}
onMounted(()=>{
  getGoodsList()
})


// 增删改
const updateFormRef = ref<FormInstance>()
const updateDialogVisible = ref<boolean>(false)
const updateData = reactive({
  title:'修改',
  store: '',
  name: '',
  isOnSale: 1,
  price: 0,
  state: [],
})
const updateRules = reactive<FormRules<typeof updateData>>({
  store: [{required: true, message: '必须填写店铺名称', trigger: 'blur'}],
  name: [{required: true, message: '必须填写商品名称', trigger: 'blur'}],
  price: [{required: true, message: '必须填写商品价格', trigger: 'blur'}, {
    type: "number",
    min: 0,
    message: '填写正确的价格',
    trigger: 'blur'
  }],
  state: [{required: true, type: 'array', message: '请选择销售状态'}]
})

const resetUpdateForm = async (formEl: FormInstance | undefined) => {
  if (formEl) {
    formEl.resetFields()
  }
}
// 提交表单
const submitUpdateForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl?.validate((valid, fields) => {
    if (valid) {
      console.log('ok')
      updateDialogVisible.value = false
      resetUpdateForm(formEl)
    }
    // else{
    //   console.log('验证未通过')
    // }
  })
}
// 清除多选框
const clearChecked = () => {
  updateData.state = []
}
// 增加
const addRow = ()=>{
  resetUpdateForm(updateFormRef.value)
  updateDialogVisible.value = true
  updateData.title = '增加'
}

// 修改
const editRow = (row:Goods)=>{
  const rawRow = toRaw(row)
  updateDialogVisible.value = true
  updateData.title = '修改'
  Object.assign(updateData,rawRow)
}

// 删除
const deleteRowTipVisible = ref<boolean>(false)
const deleteRow = (row)=>{
  row.deleteRowTipVisible = true

}
const confirmDelete = (row) =>{
  console.log('删除')
  row.deleteRowTipVisible = false
}

</script>


<style lang="less" scoped>
.header{
  padding: 10px;
}

.table-wrapper {
  position: absolute;
  width: 100%;
}

.operation-dialog-wrapper {
  width: 500px;
}
</style>
