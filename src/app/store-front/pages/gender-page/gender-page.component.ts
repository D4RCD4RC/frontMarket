import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  paginationService = inject(PaginationService)

  // convierte el parámetro de la ruta a un signal
  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  productsResource = rxResource<ProductsResponse, { gender: string, page: number }>({
    // ✅ usamos params, no request
    params: () => ({ gender: this.gender(), page: this.paginationService.currentPage()-1}),

    // ✅ usamos stream, no loader
    stream: ({ params }) =>
      this.productsService.getProducts({
        gender: params.gender,
        offset: params.page * 9,
      }),
  });
}

