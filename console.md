# console

console分为两种，
- 全局的console，不需要require，标准输出到process.stdout，错误输出到process.stderr
- Console类，可以用require引入，也可以直接从全局的console中获取。相比全局的console，你可以自定义自己console实例，将标准输出和标准错误重定向到其他流中。

```
const { Console } = require('console');
```

```
const { Console } = console;
```

- `new Console(stdout[, stderr][, ignoreErrors])` 获取新的console实例
- `new Console(options)` 获取新的console实例
- `console.assert(value[, ...message])` 断言
- `console.clear()` 清空输出
- `console.count([label])` 计数器
- `console.countReset([label])` 重置计数器
- `console.debug(data[, ...args])` console.debug实际上是console.log的别名
- `console.dir(obj[, options])` 类似目录的形式展示对象属性
- `console.dirxml(...data)` console.dirxml实际上也是去调用console.log
- `console.error([data][, ...args])` 将数据输出到标准错误流
- `console.group([...label])` 向右缩进2个空输出
- `console.groupCollapsed()` 是console.group的别名
- `console.info([data][, ...args])` 是console.log的别名
- `console.log([data][, ...args])` 
- `console.table(tabularData[, properties])` 以表格的形式展示数据
- `console.time([label])` 开始计时
- `console.timeEnd([label])` 结束计时
- `console.timeLog([label][, ...data])` 类似timeEnd，不过可以将一些数据同时输出
- `console.trace([message][, ...args])` 打印出调用栈
- `console.warn([data][, ...args])` 是console.error的别名

# 调试模式专用方法

- console.markTimeline([label])
- console.profile([label])
- console.profileEnd([label])
- console.timeStamp([label])
- console.timeline([label])
- console.timelineEnd([label])

# 重点注意事项

console的相关方法，有可能是同步输出，也有可能是异步输出。具体原因参见Process模块的`1.10. Process IO 输出输出相关`。