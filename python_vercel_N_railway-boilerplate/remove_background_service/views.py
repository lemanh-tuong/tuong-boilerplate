from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import render
from rembg import remove
from django.views.decorators.csrf import csrf_exempt
from .utils import autocrop_image
import io

# Create your views here.
def Demo(request):
  if request.method == 'POST' or request.method == 'PUT':
    try:
      image = request.FILES['image'].read()
      if image is not None:
        output = remove(image)
        return HttpResponse(output, content_type="image/jpeg")
      else:
        return HttpResponseBadRequest("Something went wrong!!!")
    except:
      return HttpResponseBadRequest("Something went wrong!!!")
  return render(request, 'demo.html')

@csrf_exempt
def Service(request):
  if request.method == 'POST' or request.method == 'PUT':
    try:
      image = request.FILES['image'].read()
      if image is not None:
        output = remove(image)
        return HttpResponse(output, content_type="image/jpeg")
      else:
        return HttpResponseBadRequest("Something went wrong!!!")
    except:
      return HttpResponseBadRequest("Something went wrong!!!")
      

# Create your views here.
def index(request):
  if request.method == 'POST':
    image = request.FILES['image'].read()
    output_rembg = remove(image, True, 240, 10, 15)
    output_crop = autocrop_image(output_rembg)
    output = io.BytesIO()
    output_crop.save(output, format="PNG")
    return HttpResponse(output.getvalue(), content_type="image/png")
  return render(request, 'index.html')
