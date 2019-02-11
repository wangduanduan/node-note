<!-- TOC -->

- [1. 简介](#1-简介)
- [2. 方法简介](#2-方法简介)
- [3. 总结](#3-总结)
- [4. 参考](#4-参考)

<!-- /TOC -->

# 1. 简介

`Stability: 2 - Stable`

```js
const os = require('os')
```

# 2. 方法简介
- 系统换行符 `os.EOL` windows是'\n\r', posix是'\n'
- 系统架构 `os.arch()` 
- 系统常量 `os.constants`
- 系统CPU信息 `os.cpus()`
- 系统字节序 `os.endianness()` 'BE'大端 'LE'小端
- 空闲内存信息 `os.freemem()`
- 获取进程优先权 `os.getPriority([pid])`
- 获取用户home目录 `os.homedir()`
- 获取hostname信息 `os.hostname()`
- 获取系统负载信息 `os.loadavg()` 1分钟，5分钟，15分钟。windows平台一直是[0,0,0]
- 获取网络接口信息 `os.networkInterfaces()`
- 获取平台信息 `os.platform()`
- os.release()
- 设置进程优先级 `os.setPriority([pid, ]priority)`
- 获取系统暂时目录 `os.tmpdir()`
- 获取总内存 `os.totalmem()`
- 获取操作系统名 `os.type()`
- 获取系统运行时间 `os.uptime()`
- 获取用户信息 `os.userInfo([options])`
- 系统常量 `os.constants`
- 信号常量 `os.constants.signals`, 信号往往以`SIG`开头。常见的有`SIGHUP`，`SIGINT`(按ctrl+c)。[更多](https://nodejs.org/api/os.html#os_signal_constants)
- 错误常量 `os.constants.errno` 错误常量往往以`E`开头 常见的有`EADDRINUSE`(端口已经被占用) `ECONNABORTED`(连接中断) `ECONNREFUSED`(连接被拒绝) `ECONNRESET`(链接被重置) [更多](https://nodejs.org/api/os.html#os_error_constants)
- windows系统的错误常量，以`WASE`开头， 如`WSAEMFILE` [更多](https://nodejs.org/api/os.html#os_windows_specific_error_constants)
- 优先级常量 `os.constants.priority` 如`PRIORITY_LOW`


# 3. 总结

一般情况下，我们很少会使用到os模块。但是关于os模块的常量，还是稍微了解一下的。比如说关于系统报错，都是大写`E`开头的关键词，如ECONNRESET，EADDRINUSE 当你遇到此类关键词时，你要知道在Node.js的os模块有关于这些常量的解释。

# 4. 参考
- [Node.js OS](https://nodejs.org/api/os.html)