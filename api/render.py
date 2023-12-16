import ast
import json
from http.server import BaseHTTPRequestHandler

from jinja2 import Template, TemplateError

from api._utils.exceptions import ContentLengthMissingError, ContextValueError
from api._utils.render import render

ERROR_TYPE_TEMPLATE = 'template'
ERROR_TYPE_CONTEXT = 'context'
ERROR_TYPE_OTHER = 'other'


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        if self.headers.get('Content-Type') != 'application/json':
            self._response_as_error(400, 'Content-Type is only allowed `application/json`')
            return

        try:
            req_body = self._read_body()
            req_data = json.loads(req_body)

            template_text = req_data['template']
            context_text = req_data['context']
        except ContentLengthMissingError as e:
            self._response_as_error(411, str(e))
            return
        except KeyError as e:
            self._response_as_error(400, '{} is missing'.format(e))
            return
        except Exception as e:
            self._response_as_error(400, str(e))
            return

        try:
            rendered = render(template_text, context_text)
        except ContextValueError as e:
            self._response_as_error(400, str(e), ERROR_TYPE_CONTEXT)
            return
        except TemplateError as e:
            self._response_as_error(400, str(e), ERROR_TYPE_TEMPLATE)
            return

        res_json = json.dumps({
            'rendered': rendered,
        })

        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()

        self.wfile.write(res_json.encode('utf-8'))

        return

    def _response_as_error(self, status, error_message, error_type=ERROR_TYPE_OTHER):
        self.send_response(status)
        self.send_header('Content-type','application/json')
        self.end_headers()

        res = json.dumps({
            'message': error_message,
            'type': error_type,
        })

        self.wfile.write(res.encode('utf-8'))


    def _read_body(self):
        content_length = self.headers.get('Content-Length')
        if not content_length:
            raise ContentLengthMissingError('Content-Length header is missing')

        return self.rfile.read(int(content_length)).decode('utf-8')
