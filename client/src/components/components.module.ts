import { NgModule } from '@angular/core';
import { ProductComponent } from './product-component/product-component';
import { CommentComponent } from './comments/comment-component';
@NgModule({
	declarations: [ProductComponent,
    CommentComponent],
	imports: [],
	exports: [ProductComponent,
    CommentComponent]
})
export class ComponentsModule {}
