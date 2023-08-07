import type {Directive, DirectiveBinding} from 'vue'

const countToDirective:Directive = {
    mounted(el:Element,binding:DirectiveBinding){
       if(el.textContent){
           const max = parseInt(el.textContent)
           const time = binding.value || 1000
           const timeSep = time / 30
           const numSep = max / 30
           let initNum = 0

           let upTimer = setInterval(()=>{
               if(initNum <= max){
               initNum = Math.round(initNum + numSep)
               }else{
                   initNum = max
                   clearInterval(upTimer)
               }
               el.textContent = initNum + ''
           },timeSep)
       }
    }
}


export default countToDirective
