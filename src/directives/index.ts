import type{App} from 'vue'
import permissionDirective from './permission'
import countToDirective from './countTo'

export const initDirective = (app:App)=>{
    console.log('init directive')
    app.directive('permission',permissionDirective)
    app.directive('countTo',countToDirective)
}


