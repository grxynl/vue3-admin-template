import type {Directive, DirectiveBinding} from 'vue'
import {usePermission} from '@/hooks/usePermission'
import {useUserStore} from '@/store/user'
import type{DebuggerEventExtraInfo} from 'vue'

/**
 *
 * @example v-permission="[0,'Editor']" or v-permission="'Editor'" or v-permission="0"
 * */
const permissionDirective:Directive = {
    mounted(el:Element,binding:DirectiveBinding){
        const userStore = useUserStore()
        const {hasPermission} = usePermission()

        userStore.$subscribe((mutation, state)=>{

            if((mutation.events as DebuggerEventExtraInfo).key !== 'roles'){
                return
            }
            if(binding && hasPermission(binding.value)){
                return
            }else{
                el.parentNode?.removeChild(el)
            }
        })
        if(binding && hasPermission(binding.value)){
            return
        }else{
            el.parentNode?.removeChild(el)
        }
    }
}

export default permissionDirective
