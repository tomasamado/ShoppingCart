import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from '../components/product-component/product-component';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ViewProductPage } from '../pages/view-product/view-product';
import { ProfilePage } from '../pages/profile/profile';
import { NewProductPage } from '../pages/new-product/new-product';
import { MyProductsPage } from '../pages/my-products/my-products';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera } from '@ionic-native/camera';
import { UserProvider } from '../providers/user/user';
import { IonicStorageModule } from '@ionic/storage';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { ProductProvider } from '../providers/product/product';
import { CommentProvider } from '../providers/comment/comment';
import { CartPage } from '../pages/cart/cart';
import { CommentsComponent } from '../components/comments/comments';
import { TokenProvider } from '../providers/token/token';
import { CommentsPage } from '../pages/comments/comments';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProductComponent,
    ViewProductPage,
    ProfilePage,
    NewProductPage,
    MyProductsPage,
    EditProductPage,
    CartPage,
    CommentsComponent,
    CommentsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProductComponent,
    ViewProductPage,
    ProfilePage,
    NewProductPage,
    MyProductsPage,
    EditProductPage,
    CartPage,
    CommentsComponent,
    CommentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    PhotoLibrary,
    UserProvider,
    ProductProvider,
    CommentProvider,
    TokenProvider
  ],
  exports:[CommentsComponent]
})
export class AppModule {}
