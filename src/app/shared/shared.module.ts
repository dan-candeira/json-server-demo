import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [ComponentsModule],
  exports: [ComponentsModule],
})
export class SharedModule {}
