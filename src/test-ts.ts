// ts强类型
// 类型注解
let var1: string
// eslint-disable-next-line prefer-const
var1 = 'haha'
// var1 = 1

// 类型推论
const var2 = true
// var2 = 1

// 原始类型：string/number/boolean/undefined/null/symbol
let var3:string | undefined

// 类型数组
let arr: string[]
// eslint-disable-next-line prefer-const
// arr = ['tom', 1]

// 任意类型
let varAny: any
varAny = 'xxx'
varAny = 3

// any用于数组
let arrAny: any[]
// arrAny = [1, true, 'free']
// arrAny[1] = 100

// 函数类型约束    (形参约束)：返回值约束
function greet (person: string): string {
  return 'hello' + person
}
// greet(1)

// void类型：没有返回值的声明
function warn ():void {

}

// object对象，不是原始类型的就是对象类型
function fn1 (o: object) {

}

// 正确的写法
function fn2 (o: {prop: number}) {

}
fn2({ prop: 0 })
// fn2({ prop: 'tom' })

// 类型别名 type：自定义类型
type Prop = {prop: number}
function fn3 (o: Prop) {} // 等同于fn2

// type和接口interface的区别，基本完全相同
interface Prop2 {
  prop: number
}

// 类型断言
const someValue: any = 'this is a string'
/* 强制认定类型为字符串 */
const strLen = (someValue as string).length

// 联合类型，相当于或语句
let union: string | number
union = '1'
union = 1

// 交叉类型,对类型进行扩展
type First = {first: number}
type Second = {second: number}
// 扩展新的type
type FirstAndSecond = First & Second
function fn4 (): FirstAndSecond {
  return { first: 1, second: 2 }
}

// 函数
// 1.设置了就是必填参数
// 2.默认值msg = 'abc'
// 3.msg?: string表示可选参数,可选参数?
function greeting (person: string, msg1 = 'abc', msg2?: string): string {
  return ''
}
greeting('tom')

// 函数重载，场景主要源码和框架，函数用参数个数，类型或者返回值类型区分同名函数
// 先声明，再实现
// 同名声明有多个
// 重载是生命一个函数，但是有多种用法
function watch (cb1: () => void): void
function watch (cb1: () => void, cb2: (v1:any, v2:any) => void): void
// 实现
function watch (cb1: () => void, cb2?: (v1:any, v2:any) => void) {
  if (cb1 && cb2) {
    console.log('执行重载2')
  } else {
    console.log('执行重载1')
  }
}

// 类：
// class Parent {
//   private _foo = 'foo'// 私有属性，不能在类的外部访问
//   protected bar = 'bar'// 保护属性，可以在子类中访问

//   // 参数属性：构造函数
//   constructor(public tua = 'tua') {}

//   // 方法也有装饰器
//   private someMethod () {}
//   // 存取器：属性方式访问、可添加额外逻辑，控制读写性
//   get foo () {
//     return this._foo
//   }
//   set foo (val) {
//     this._foo = val
//   }
// }
// class Child extends Parent {
//   say () {
//     this.bar
//   }
// }
// const p = new Parent()
// const c = new Child()

// 接口
interface Person {
  fistName: string
  lastName: String
}
// greeting函数通过Person接口约束参数解构
function greeting2 (person: Person) {
  return 'hello' + person.fistName + ' ' + person.lastName
}
greeting2({ fistName: 'Jane', lastName: 'User' })// 正确
// greeting2({ firstName: 'Jane' }) // 错误
