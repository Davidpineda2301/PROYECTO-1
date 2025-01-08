from django.shortcuts import render, HttpResponse

htt = """
    <ul>
        <li><a href="/">Portafolio</a></li>
        <li><a href="/contact/">Contact</a></li>

    </ul>

"""

# Create your views here.
def home(request): 
    return HttpResponse(htt +""" "<h1>Mi app personal</h1>" """)

def contact(request):
    return HttpResponse(htt + """ "<h1>Desde contact</h1>" """)



def portafolio(request): 
    return HttpResponse(htt + """ "<h1>Hola desde portafolio</h1>""")