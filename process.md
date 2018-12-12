<!-- TOC -->

- [1. Process](#1-process)
  - [1.1. Process Events](#11-process-events)
  - [process.abort() 中断Node.js进程](#processabort-中断nodejs进程)
  - [process.allowedNodeEnvironmentFlags 被允许的环境标志](#processallowednodeenvironmentflags-被允许的环境标志)
  - [process.arch 当前系统CPU架构](#processarch-当前系统cpu架构)

<!-- /TOC -->

# 1. Process

process是一个全局的对象，不需要require。process提供控制和获取当前Node.js进程信息的能力。

## 1.1. Process Events

process对象实际上是一个EventEmitter的一个实例。

下面列举了process对象上可以监听的事件。

- `beforeExit` 当eventloop是空的时候触发，直接调用process.exit()并不会触发此事件
- `disconnect` 当IPC通道关闭时触发
- `exit` 当调用 process.exit()后会触发
- `message` 当消息被子进程收到是触发，消息可能会和原始消息不同
- `multipleResolves` 当Promise被多次resolve时触发
- `rejectionHandled` 当Promise被rejected并且错误被catch()捕获是触发
- `uncaughtException` 当发生未捕获的异常时触发。当发生未捕获异常时，程序已经进入了无法预测的状态，**最好的方式是重启服务**
- `unhandledRejection` 当Promise被rejected并且没有使用catch()去捕获是触发。**最好给每一个Promise增加.catch()方法去处理错误**
- `warning` 当Node.js发出警告时触发
- `SIGINT` 信号事件。还有SIGTERM类似的

## process.abort() 中断Node.js进程
## process.allowedNodeEnvironmentFlags 被允许的环境标志
## process.arch 当前系统CPU架构