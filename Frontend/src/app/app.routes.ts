import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { MapComponent } from './map/map.component';
import { PersonalareaComponent } from './personalarea/personalarea.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './services/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';



export const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent },
  { path: 'map', component: MapComponent },
  { path: 'personalarea', component: PersonalareaComponent },
  { path: 'loginpage', component: LoginpageComponent },
  { path: 'registerpage', component: RegisterpageComponent }
  
];

@NgModule({
  providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  imports: [RouterModule.forRoot(routes), HttpClientModule, CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }