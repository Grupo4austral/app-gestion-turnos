import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';
import { LayoutStateService } from './core/services/layout-state.service';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [LayoutStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }