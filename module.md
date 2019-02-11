# module

- `require.main` 获取主模块 `require.main === module` 该值为ture则说明是主模块。`node www.js` www.js就是主模块。可以通过require.main.filename获取主模块的文件名

- 模块搜索步骤

```
require(X) from module at path Y
1. 如果 X 是核心模块,
   a. 返回核心模块
   b. 停止
2. 如果 X 以 '/'开头 # 即指按照绝对路径搜索，一般很少以绝对路径引入模块
   a. 那么 Y 设置为文件系统跟路径
3. 如果 X 以 './' or '/' or '../' 开头 # 即以相对路径查找模块
   a. LOAD_AS_FILE(Y + X) # 以文件的形式加载
   b. LOAD_AS_DIRECTORY(Y + X) # 以目录的形式加载
4. LOAD_NODE_MODULES(X, dirname(Y)) # 从NODE_MODELES目录中加载
5. THROW "not found" # 如果还未找到，则抛出异常

LOAD_AS_FILE(X)
1. If X is a file, load X as JavaScript text.  STOP
2. If X.js is a file, load X.js as JavaScript text.  STOP
3. If X.json is a file, parse X.json to a JavaScript Object.  STOP
4. If X.node is a file, load X.node as binary addon.  STOP

LOAD_AS_DIRECTORY(X)
1. If X/package.json is a file,
   a. Parse X/package.json, and look for "main" field.
   b. let M = X + (json main field)
   c. LOAD_AS_FILE(M)
   d. LOAD_INDEX(M)
2. LOAD_INDEX(X)
```

建议：**加载文件作为模块时，建议给文件带上文件名扩展名**

- `缓存` 一个模块无论require多少次，实际上只会加载一次，后续的加载只会使用缓存。但是在大小写不敏感的操作系统，require('./A.js')和require('./a.js'), 虽然指向的文件都是同一个，但是会加载多次。所以建议文件名尽量都小写，并以中划线分割单词。
- `循环依赖` 循环依赖可能会导致某个模块只加载一部分，官网给了简单的示例，但是仅仅只是说了要小心对对循环依赖，并没有说如何解决循环依赖。