import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { FuseSharedModule } from '@fuse/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AccountService } from './account.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ClublistComponent } from './clublist/clublist.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



const routes: Routes = [
  {
      path     : 'profile',
      component: ProfileComponent
  },
  {
      path      : 'register',
      component : RegisterComponent
  },
  {
      path      : 'login',
      component : LoginComponent
  },
  {
      path      : 'home',
      component : HomeComponent
  },
  {
      path      : 'clublist',
      component : ClublistComponent
  }
];


@NgModule({
  declarations: [
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ClublistComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatTabsModule,
        MatCheckboxModule,

        
        NgxDatatableModule,

        FuseSharedModule,
  ],
  providers   : [
      AccountService
  ]
})
export class ClubModule { }
