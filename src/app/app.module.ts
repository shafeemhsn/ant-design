import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { HeaderComponent } from './header/header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { SportFilterComponent } from './sport-filter/sport-filter.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CoutPageComponent } from './cout-page/cout-page.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTableModule } from 'ng-zorro-antd/table';
import { StoreModule } from '@ngrx/store';
import { courtReducer } from './cout-page/state/court.reducer';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SportFilterComponent,
    SideNavComponent,
    CoutPageComponent,
    SignUpComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzDatePickerModule,
    NzSelectModule,
    NzTimePickerModule,
    NzCardModule,
    NzGridModule,
    NzAvatarModule,
    NzDropDownModule,
    NzDividerModule,
    NzTypographyModule,
    NzImageModule,
    NzTableModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzTabsModule,
    StoreModule.forRoot({ court: courtReducer }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
