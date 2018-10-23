这是一个个人博客，基于`antd`搭建，

主要适合在github写博客没有利用文件夹分类或者归档，没有使用issue，就像我的[blogs](https://github.com/stonehank/blogs)一样。

示例：[My-blog](https://stonehank.github.io)

特点：

1. 使用了`nodejieba`分词来进行标签分类。
2. 获取仓库中的资源(图片,视频)，并且保持与博客内容正确的相对路径。

项目构建流程如下：
1. 先启动`fetch-blog-serve`中的`serve-pull-blog.js`，这是一个能将你的`repertory`的blog内容和资源拉到本地，
并且以自定义扩展名(默认是.json)写入前端资源中。
2. 在写入之前会生成一个列表，包含每一篇blog的标题、日期、标签、摘要、sha值(唯一性判断)。
3. 之后每次写入都可以控制根据sha值判断是否需要更新。
4. 前端通过获取数据，对数据进行处理，分配给各个板块。
5. 其中渲染`.MD`使用了`markdown-it`和`highlight.js`(`react-markdown`使用时出现了一些格式偏差，就没有用了)。
6. UI组件都是使用`antd`。