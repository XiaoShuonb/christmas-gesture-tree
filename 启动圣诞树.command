#!/bin/zsh
cd -- "${0:A:h}"
python3 - <<'PY'
import http.server
import webbrowser

handler = lambda *args, **kwargs: http.server.SimpleHTTPRequestHandler(*args, directory='dist', **kwargs)
try:
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 8768), handler)
except OSError as error:
    print('启动失败，请确认 8768 端口未被占用：', error)
    input('按回车关闭窗口…')
    raise SystemExit(1)
print('圣诞树已启动：http://127.0.0.1:8768')
print('保持此窗口打开；按 Ctrl+C 停止服务。')
webbrowser.open('http://127.0.0.1:8768')
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
PY
