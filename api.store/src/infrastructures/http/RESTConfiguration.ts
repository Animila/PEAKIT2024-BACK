import {IBrandService} from "../../useCases/Brand/IBrandService";
import {BrandController} from "../../useCases/Brand/BrandController";

export class RESTConfiguration {
	private brandService: IBrandService;
	constructor(brandService: IBrandService) {
		this.brandService = brandService
	}

	public brandController(): BrandController {
		return new BrandController(this.brandService)
	}
}
