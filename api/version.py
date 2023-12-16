import json
import sys
from http.server import BaseHTTPRequestHandler

import jinja2


class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        pyVer = sys.version_info
        jinjaVer = jinja2.__version__.split('.')

        res_body = json.dumps({
            'python_version': {
                'major': str(pyVer.major),
                'minor': str(pyVer.minor),
                'patch': str(pyVer.micro),
            },
            'jinja_version': {
                'major': jinjaVer[0],
                'minor': jinjaVer[1],
                'patch': jinjaVer[2],
            },
        })

        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()

        self.wfile.write(res_body.encode('utf-8'))

        return
