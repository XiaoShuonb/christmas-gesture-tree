# 星愿 · 手势粒子圣诞树

根据视频独立实现的网页版本：金色粒子树、旋转、飘雪、散开聚拢、照片卡片和摄像头手势控制。

## 在线体验与源码

- 在线体验：https://xiaoshuonb.github.io/christmas-gesture-tree/
- GitHub 源码：https://github.com/XiaoShuonb/christmas-gesture-tree
- GitHub Pages 由 `.github/workflows/pages.yml` 自动部署；推送 `main` 分支的页面修改会触发部署。

## 运行

macOS 双击 `启动圣诞树.command`，或在此目录执行：

```sh
python3 -m http.server 8768 --bind 127.0.0.1 --directory dist
```

在浏览器打开 http://127.0.0.1:8768 。终端按 Ctrl+C 停止服务。建议使用 Chrome、Edge 或 Safari。摄像头需要 localhost 或 HTTPS 安全环境。

## 操作

- 点击画面或“散开星光”切换粒子形态；拖动旋转；滚轮缩放；空格切换。
- “放入照片”选择最多 16 张图片；散开后点击照片可放大，Esc 关闭。
- 点击“开启手势”并允许摄像头：张开手散开，握拳聚拢，拇指食指捏合查看照片。连续稳定识别 2 帧生效，捏合需要松开后才能再次触发。
- 手掌左右位置影响旋转。切到后台、离开页面或点击“关闭手势”会释放摄像头。
- 自动演示每 6 秒切换一次；手动切换或有效手势会结束自动演示。

照片与摄像头帧只在当前浏览器内处理，不上传、不持久保存；刷新页面后恢复示例冬日插画。

### 摄像头无法开启

页面必须通过 HTTPS 或 localhost 打开。若提示“系统已阻止浏览器使用摄像头”，请在 macOS 打开“系统设置 → 隐私与安全性 → 相机”，为 Chrome、Safari 或当前浏览器开启权限，然后完全退出浏览器并重新打开。若只对本站关闭了权限，请点地址栏左侧的网站设置，将“摄像头”改为允许并刷新页面。内置浏览器没有摄像头权限时，请复制在线地址到 Chrome 或 Safari 打开。

## 文件

`dist/` 可直接部署为静态网站，无需构建。动画使用 Canvas 2D 做三维投影，手势使用 MediaPipe Hand Landmarker 0.10.32；模型及 WASM 随项目附带，页面运行时无需访问外部 CDN。

MediaPipe 文档：https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js
SDK 来源：https://www.npmjs.com/package/@mediapipe/tasks-vision/v/0.10.32
SDK 与模型遵循各自的上游许可，见 `dist/vendor/`。

## GitHub Pages 部署

此仓库使用 GitHub Actions 将 `dist/` 发布到 GitHub Pages，不需要安装 Node.js 或运行构建。首次使用需在仓库 Settings → Pages → Build and deployment 中将 Source 设置为 GitHub Actions。之后推送代码即可自动更新，也可在 Actions 页面手动运行 Deploy GitHub Pages。手势模型使用相对路径，支持 GitHub Pages 的项目子目录。

## 验证范围

已检查 JavaScript 语法、静态资源以及桌面浏览器的动画和形态切换。真实摄像头手势识别需要在有摄像头的设备上授权后验收。
