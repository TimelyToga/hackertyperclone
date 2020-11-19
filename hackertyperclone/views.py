from django.http import HttpResponse
from django.template.loader import get_template
from django.template import RequestContext, loader
from django.shortcuts import redirect


def main_view(request):
    # Just redirect to my personal site
    return redirect("https://timothyblumberg.com/hacker_typer")