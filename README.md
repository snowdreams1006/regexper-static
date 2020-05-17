# JavaScript 正则表达式可视化

> 感谢[http://regexper.com/](http://regexper.com/)开源项目

## 在线体验

- 推荐: [https://regex.snowdreams1006.cn/](https://regex.snowdreams1006.cn/)

> 备用: [https://snowdreams1006.gitee.io/regexper-static/](https://snowdreams1006.gitee.io/regexper-static/)

## 如何贡献

I greatly appreciate any contributions that you may have for the site. Feel free to fork the project and work on any of the reported issues, or let me know about any improvements you think would be beneficial.

When sending pull requests, please keep them focused on a single issue. I would rather deal with a dozen pull requests for a dozen issues with one change each over one pull request fixing a dozen issues. Also, I appreciate tests to be included with feature development, but for minor changes I will probably not put up much of a fuss if they're missing.

### 开发文档

`nodejs` 是项目基本环境,请确保已安装并配置 `nodejs` 开发环境.

开始项目之前,请安装必要环境依赖:

```bash
yarn install
```

开启开发模式,请运行:

```bash
yarn start
```

运行结果将在 `./build` 目录下生成网站,监听本地 `8080` 端口,开启热加载模式.如果浏览器已安装热加载插件,页面会重新加载.

除此之外,还有一些其他 `gulp` 任务:

```bash
# Build documentation into the ./docs directory
gulp docs 

# Build the site into the ./build directory
gulp build 

# Run JSCS lint and Karma tests
yarn test 
```  

## 许可证

详情请参考 [LICENSE.txt](./LICENSE.txt)
