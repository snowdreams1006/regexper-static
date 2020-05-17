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

To start a development server, run:

    $ yarn start

This will build the site into the ./build directory, start a local start on port 8080, and begin watching the source files for modifications. The site will automatically be rebuilt when files are changed. Also, if you browser has the LiveReload extension, then the page will be reloaded.

These other gulp tasks are available:

    $ gulp docs # Build documentation into the ./docs directory
    $ gulp build # Build the site into the ./build directory
    $ yarn test # Run JSCS lint and Karma tests

## 许可证

详情请参考 [LICENSE.txt](./LICENSE.txt)
