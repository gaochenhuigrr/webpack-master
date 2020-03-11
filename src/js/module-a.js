import { addition, subtraction } from 'utils/calc'
console.log(addition(1, 6))
console.log(subtraction(8, 2))

// import { division } from 'utils/calc'
// console.log('division: ', division)
// Error: export default导出的要用一个变量接收,不能通过解构接

import defaultExport from 'utils/calc'
console.log(defaultExport.division(1, 6))
console.log(defaultExport)

export * from 'utils/calc'

// 转发default
export { defaultExport }