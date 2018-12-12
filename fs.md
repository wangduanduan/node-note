<!-- TOC -->

- [1. File System](#1-file-system)
  - [1.1. 文件路径](#11-文件路径)
  - [1.2. 文件描述符](#12-文件描述符)
  - [1.3. 线程池使用](#13-线程池使用)
  - [1.4. Class: fs.Dirent 判断文件类型](#14-class-fsdirent-判断文件类型)
  - [1.5. Class: fs.FSWatcher 文件变动监控](#15-class-fsfswatcher-文件变动监控)
  - [1.6. Class: fs.ReadStream 可读流](#16-class-fsreadstream-可读流)
  - [1.7. Class: fs.Stats 获取文件信息](#17-class-fsstats-获取文件信息)
  - [1.8. Class: fs.WriteStream 可写流](#18-class-fswritestream-可写流)
- [2. 常用方法](#2-常用方法)
- [3. 参考](#3-参考)

<!-- /TOC -->

# 1. File System
- 所有文件操作提供`同步`和`异步`的两种方式，本笔记只记录异步的API
- 异步方式其最后一个参数是回调函数。回调函数的第一个参数往往是错误对象，如果没有发生参数，那么第一个参数可能是`null`或者`undefinded`。
- 同步函数可以使用`try catch `捕获异常
- 多个异步函数在同一层次执行，是`无法保证顺序`的。最好将一个函数放在另一个函数的回调函数中去执行。这种回调的嵌套层次一旦过深，就会造成`回调地狱`
- 一般情况下，`非常不建议使用同步`的fs方法，因为同步的方法会阻断其他事情，直到fs方法完成。

## 1.1. 文件路径
- filepaths目前支持4中
    - `string`
    - `Buffer`
    - `URL Object`
    - 以`file:`开头的协议
- string 路径会被解释为utf-8格式，可以使用相对路径和绝对路径，相对路径是当前工作路径，可以从`process.cwd()`获取当前工作路径。

## 1.2. 文件描述符
- 操作系统会限制文件描述符的数量
- 忘记关闭文件可能导致`内存泄露`或者`程序崩溃`
- 任何文件描述符都支持写操作
- 如果文件描述符的类型是文件，那么它不会自动关闭
- 写操作会从文件的开头，而不会覆盖之后的内容。举例：文件内容是`Hello World`, 如果在写入'Aloha'，那么文件的内容是`Aloha World` ,而不是'Aloha'.

## 1.3. 线程池使用

fs所有的api，除了那些同步的api和fs.FSWatcher(), 基本上都使用libuv的线程池。在有些应用程序上，这个可能导致非常糟糕的性能表现。libuv的线程池有固定的大小，默认只有4个，可以通过设置环境变量`UV_THREADPOOL_SIZE`去增加libuv的线程的数量。

## 1.4. Class: fs.Dirent 判断文件类型
- 当`fs.readdir()`或者`fs.readdirSync()`被调用，并且参数`withFileTypes`是`true`, 那么返回结果就是`fs.Dirent objects`, 而不是`strings` or `Buffers`
- dirent方法
    - dirent.isBlockDevice()
    - dirent.isCharacterDevice()
    - dirent.isDirectory()
    - dirent.isFIFO()
    - dirent.isFile()
    - dirent.isSocket()
    - dirent.isSymbolicLink()
    - dirent.name

## 1.5. Class: fs.FSWatcher 文件变动监控
来自 `fs.watch()`

- Event
    - `change`
    - `close`
    - `error`
- watcher.close()

注意：某些系统可能不会返回filename。如果encoding参数是buffer，那么文件名是以buffer的形式返回，默认文件名是utf-8格式的字符串。

```js
fs.watch('./tmp', { encoding: 'buffer' }, (eventType, filename) => {
  if (filename) {
    console.log(filename);
    // Prints: <Buffer ...>
  }
});
```

## 1.6. Class: fs.ReadStream 可读流

来自`fs.createReadStream()`
- Event
    - `close`
    - `open`
    - `ready` 第一次触发是在open事件之后
- readStream.bytesRead
- readStream.path
- readStream.pending

## 1.7. Class: fs.Stats 获取文件信息

来自  `fs.stat()`, `fs.lstat()` and `fs.fstat()` 以及他们的同步版本。

- stats.isBlockDevice()
- stats.isCharacterDevice()
- stats.isDirectory()
- stats.isFIFO()
- stats.isFile()
- stats.isSocket()
- stats.isSymbolicLink()

```js
Stats {
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atimeMs: 1318289051000.1,
  mtimeMs: 1318289051000.1,
  ctimeMs: 1318289051000.1,
  birthtimeMs: 1318289051000.1,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
```

## 1.8. Class: fs.WriteStream 可写流
- Event
    - close
    - open
    - ready
- writeStream.bytesWritten
- writeStream.path
- writeStream.pending


# 2. 常用方法


- **测试**
    - `访问权限测试` fs.access(path[, mode], callback) 测试是否可以访问某个路径。不建议fs.open(), fs.readFile() or fs.writeFile()调用前，调用fs.access去检查
   - `测试路径是否存在` fs.exists(path, callback)， 不建议fs.open(), fs.readFile() or fs.writeFile()调用前，调用fs.exists去检测文件是否存在
- **流操作**
    - `创建可读流` fs.createReadStream(path[, options])
    - `创建可写流` fs.createWriteStream(path[, options])

- **文件夹操作**
    - `创建文件夹` fs.mkdir(path[, options], callback)
    - `删除目录` fs.rmdir(path, callback)
    - `创建临时文件夹` fs.mkdtemp(prefix[, options], callback)
    - `读取文件夹` fs.readdir(path[, options], callback)

- **文件操作**
    - `打开文件` fs.open(path[, flags[, mode]], callback)
    - `读取文件` fs.read(fd, buffer, offset, length, position, callback)
    - `读取文件` fs.readFile(path[, options], callback)
    - `重命名文件` fs.rename(oldPath, newPath, callback)
    - `读取文件信息` fs.stat(path[, options], callback)
    - `删除文件` fs.unlink(path, callback)
    - `停止监控文件` fs.unwatchFile(filename[, listener])
    - `修改时间` fs.utimes(path, atime, mtime, callback)
    - `监控文件变化` fs.watch(filename[, options][, listener])
    - `关闭文件` fs.close(fd, callback)
    - `追加文件` fs.appendFile(path, data[, options], callback)
    - `改变文件模式` fs.chmod(path, mode, callback)
    - `改变文件所属` fs.chown(path, uid, gid, callback)
    - `复制文件` fs.copyFile(fs.copyFile(src, dest[, flags], callback))
    - `写文件` fs.write(fd, buffer[, offset[, length[, position]]], callback)
    - `写文件` fs.write(fd, string[, position[, encoding]], callback)
    - `写文件` fs.writeFile(file, data[, options], callback)
    
- **其他**
    - `fs常量` fs.constants
- **注意事项**
    - `fs.watch`并不是百分百跨平台。例如它的`recursive`参数仅支持macOS和windows。fs.watch的底层通知机制在不同平台上的实现是不同的，如果底层不支持某个特性，那么fs.watch也是不能支持的。另外回调函数中的filename参数，也是不保证一定存在。
    - `fs.watch()`比`fs.watchFile()`更高效，可能的话，尽量使用前者。


# 3. 参考
- [Node.js fs](https://nodejs.org/api/fs.html)