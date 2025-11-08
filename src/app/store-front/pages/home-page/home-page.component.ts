import { PaginationService } from './../../../shared/components/pagination/pagination.service';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from './../../../products/services/products.service';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  productsService = inject(ProductsService);

  paginationService = inject(PaginationService);

  // ActivatedRoute = inject(ActivatedRoute);

  // currentPage = toSignal(
  //   this.ActivatedRoute.queryParamMap.pipe(
  //     map(params=>(params.get('page') ? +params.get('page')!:1)),
  //     map((page)=>(isNaN(page)? 1 : page))
  //   ),
  //   {
  //     initialValue: 1,
  //   }
  // )


  productsResource = rxResource<ProductsResponse, {page: number}>({
    // No pasás parámetros dinámicos → devolvés un objeto vacío
    params: () => ({ page: this.paginationService.currentPage() - 1}),

    // stream: debe devolver el observable
    stream: ({params}) => this.productsService.getProducts({
      offset: params.page * 9,
    }),
  });
}
