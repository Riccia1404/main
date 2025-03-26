import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './quiz/quiz.component';
import { AuthGuard } from './guards/auth.guard';
import { PrincipalComponent } from './principal/principal.component';
import { CreadomandaComponent } from './creadomanda/creadomanda.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';



export const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent},
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'creadomanda', component: CreadomandaComponent, canActivate: [AuthGuard] },
  { path: 'loginpage', component: LoginpageComponent },
  { path: 'registerpage', component: RegisterpageComponent }

];

@NgModule({
  providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  imports: [RouterModule.forRoot(routes), HttpClientModule, CommonModule, MatFormFieldModule, FormsModule, MatSelectModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }