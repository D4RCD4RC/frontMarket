
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { Product } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

  activatedRoute = inject(ActivatedRoute)
  productService = inject(ProductsService)

  productIdSlug = this.activatedRoute.snapshot.params['idSlug']

   productResource = rxResource<Product, { idSlug: string }>({
    // Usamos `params` en vez de `request`
    params: () => ({ idSlug: this.productIdSlug }),

    // Usamos `stream` en vez de `loader`
    stream: ({ params }) => this.productService.getProductByIdSlug(params.idSlug),

    // Valor inicial mientras carga
    // defaultValue: {
    //   id: '',
    //   name: '',
    //   price: 0,
      // …las demás props que tenga tu `Product`
    // }
  });

}
