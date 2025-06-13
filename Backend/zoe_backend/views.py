from django.http import HttpResponseRedirect

def redirect_to_frontend(request):
    return HttpResponseRedirect("http://localhost:3000/")