from django.conf.urls import url, include
from rest_framework import routers
from shoppingcartapp import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet)
router.register(r'product', views.ProductViewSet)
router.register(r'ownproduct', views.OwnProductViewSet)
router.register(r'comment', views.CommentViewSet)
# router.register(r'profilepic', views.ProfilePictureViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair')
]