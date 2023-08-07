import "virtual:svg-icons-register"
import {App} from "vue";
import svgIcon from '@/components/svgIcon/index.vue'

export const useSvg=(app:App)=>{
    app.component('svgIcon',svgIcon)
}