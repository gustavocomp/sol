import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { FormatFileSizePipe } from './format-file-size.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations: [OrderByPipe, CapitalizePipe, FormatFileSizePipe],
  exports: [OrderByPipe, CapitalizePipe, FormatFileSizePipe],
})
export class PipesUteisModule {}
