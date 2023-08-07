<template>
  <div class="permission-wrapper">
    <el-card>
      <template #header> 当前权限为
      <span v-for="role in currentRoles">{{ RolesEnum[role] }}&nbsp;</span>
        <el-checkbox-group v-model="currentRoles" size="large">
          <el-checkbox-button
              v-for="role in mulRolesChoose"
              :key="role.label"
              :label="role.label"
              @change="setRoles(currentRoles)"
          >
            {{ role.title }}
          </el-checkbox-button>
        </el-checkbox-group>
      </template>
        <div v-permission="0" >
          本元素需要Administrator权限
        </div>
      <div v-permission="1" >
        本元素需要Editor权限
      </div>
      <div  v-permission="2" >
        本元素需要visitor权限
      </div>
    </el-card>
    <NoPermission/>
    <Tips/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {RolesEnum} from '@/enum/rolesEnum'
import {useUserStore} from '@/store/user'
import Tips from './components/Tips.vue'
import NoPermission from './components/NoPermission.vue'

const userStore = useUserStore()


const {roles:currentRoles} = storeToRefs(userStore)
const {setRoles} = userStore

type RolesChoose = {
  title:string,
  label:number
}
const mulRolesChoose = ref<RolesChoose[]>([])
onMounted(()=>{
  for(const [k,v] of Object.entries(RolesEnum)){
    if(Number.isInteger(v)){
      mulRolesChoose.value.push({
        title:k,
        label:v as number
      })
    }
  }
})





</script>

<style lang="less" scoped>
</style>