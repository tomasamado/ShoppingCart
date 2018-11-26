import { NgModule } from '@angular/core';
import { ProductComponent } from './product-component/product-component';
import { CommentsComponent } from './comments/comments';
@NgModule({
	declarations: [ProductComponent,
    CommentsComponent],
	imports: [],
	exports: [ProductComponent,
    CommentsComponent]
})
export class ComponentsModule {}
