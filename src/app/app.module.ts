import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NumberFormatPipe } from './pipes/exact-num.pipe';
import { InformalNumberTruncatePipe } from './pipes/informal-num.pipe';
import { TranslateService } from './services/translate.service';
import { ChartDirective } from './charts/directive/chartjs.directive';
import { PlotTestPieDoughtnutComponent } from './test/plot-test-pie-doughtnut.component';
import { PlotTestLabelGroupBarComponent } from './test/plot-test-label-group-bar.component';
import { PlotTestBarLineComponent } from './test/plot-test-barline.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    PlotTestBarLineComponent,
    PlotTestPieDoughtnutComponent,
    PlotTestLabelGroupBarComponent,
    ChartDirective,
  ],
  providers: [
    NumberFormatPipe,
    InformalNumberTruncatePipe,
    TranslateService,
    ChartDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
