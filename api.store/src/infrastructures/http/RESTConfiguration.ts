import {IBrandService} from "../../useCases/Brand/IBrandService";
import {BrandController} from "../../useCases/Brand/BrandController";
import {IProductService} from "../../useCases/Product/IProductService";
import {ProductController} from "../../useCases/Product/ProductController";

export class RESTConfiguration {
	private brandService: IBrandService;
	private productService: IProductService;
	constructor(brandService: IBrandService, productService: IProductService) {
		this.brandService = brandService
		this.productService = productService
	}

	public brandController(): BrandController {
		return new BrandController(this.brandService)
	}

	public productController(): ProductController {
		return new ProductController(this.productService)
	}
}
