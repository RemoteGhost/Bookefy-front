import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookComponent } from './components/book/book.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { DefinitionComponent } from './components/definition/definition.component';
import { NotesComponent } from './components/notes/notes.component'
import { MatFormFieldModule } from "@angular/material/form-field";
import { JwtInterceptor } from "./components/helpers/jwt.interceptor";
import { ErrorInterceptor } from "./components/helpers/error.interceptor";
import { AngularMaterialModule } from "./angular-material.module";
import { MatInputModule } from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BookComponent,
    DefinitionComponent,
    NotesComponent,
    AboutUsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        MatInputModule,
        MatButtonModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    BookComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
