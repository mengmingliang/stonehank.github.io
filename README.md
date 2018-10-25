这是一个个人博客，基于`antd`搭建，

主要适合在github写博客没有利用文件夹分类或者归档，没有使用issue，就像我的[blogs](https://github.com/stonehank/blogs)一样。

示例：[My-blog](https://stonehank.github.io)

特点：

1. 使用了`nodejieba`分词来进行标签分类。
2. 获取仓库中的资源(图片,视频)，并且保持与博客内容正确的相对路径。
3. Search组件
    0. 匹配高亮，显示上下文
        
        一旦发现匹配内容，加上高亮标签，显示上下文，更加容易理解
        
    1. 优先`精确匹配`
    
        例如： search: `a`,content:`abcde a xza a `
        
        匹配第6个a，即 `de a xz`
    2. 不匹配标签，不匹配属性
    
        因为是md文件，要么在md转换前搜索，要么在md转换成html后搜索
        
        * 在转换前搜索
        
            优点：
            1. 不会匹配到HTML标签
            2. 不用考虑属性，例如`src`,`href`等
            3. 整体内容较少，搜索速度更快
            
            缺点：
            1. 搜索\`\*\#等`md语法`时会误匹配
            2. 无法对搜索匹配内容添加高亮标签，如果添加内容容易对其格式造成影响
        
        考虑再三，还是决定在转换后搜索，这里匹配不会匹配标签内部内容。
        
        例如：search:`abc`,content:`<a data-abc="abc" id="abc" class="abcabcabc">abc</a>`
        
        匹配的是`c">abc</a`
    3. 搜索排序
        
        按照以下顺序：
        
        1. `title`存在精确匹配 && `content`存在精确匹配
        2. `title`存在精确匹配
        3. `content`存在精确匹配
        4. `title`存在匹配 && `content`存在匹配
        5. `title`存在匹配
        6. `content`存在匹配
    
    4. 匹配次数
        
        为了提升匹配效率，简化匹配结果，每篇文章只匹配第一个符合要求的。

项目构建流程如下：
1. 先启动`fetch-blog-serve`中的`serve-pull-blog.js`，这是一个能将你的`repertory`的blog内容和资源拉到本地，
并且以自定义扩展名(默认是.json)写入前端资源中。
2. 在写入之前会生成一个列表，包含每一篇blog的标题、日期、标签、摘要、sha值(唯一性判断)。
3. 之后每次写入都可以控制根据sha值判断是否需要更新。
4. 前端通过获取数据，对数据进行处理，分配给各个板块。
5. 其中渲染`.MD`使用了`markdown-it`和`highlight.js`(`react-markdown`使用时出现了一些格式偏差，就没有用了)。
6. UI组件都是使用`antd`。