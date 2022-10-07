// 引入该目录下所有的组件
import OnePic from "./one/index.js";
// import CurrentDateTime from "./currentDateTime/index.js";
// import CurrentDateTimeWeek from "./currentDateTimeWeek/index.js";

const components = [
  OnePic
]

const MyModule = {}
MyModule.install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  MyModule.install(window.Vue)
}

export default MyModule