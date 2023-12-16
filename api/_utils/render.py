import ast

from jinja2 import Template

from .exceptions import ContextValueError


def _cast_dict(context_text):
    context = {}

    if context_text:
        context = dict(ast.literal_eval(context_text))
        if not isinstance(context, dict):
            raise ValueError()

    return context


def render(template_text, context_text):
    try:
        context = _cast_dict(context_text)
    except (SyntaxError, ValueError):
        raise ContextValueError('Context is not dict syntax.')

    template = Template(template_text)

    return template.render(context)
