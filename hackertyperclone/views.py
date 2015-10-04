from django.http import HttpResponse
from django.template.loader import get_template
from django.template import RequestContext, loader


def main_view(request):
    template = get_template('main.html')
    html = template.render(request)
    return HttpResponse(html)