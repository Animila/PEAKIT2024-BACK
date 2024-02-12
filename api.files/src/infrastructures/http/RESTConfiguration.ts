import {FileController} from "../../useCases/FileController";
import {IFileService} from "../../useCases/IFileService";

export class RESTConfiguration {
    private fileService: IFileService
    constructor(fileService: IFileService) {
        this.fileService = fileService
    }
    public fileController(): FileController {
        return new FileController(this.fileService)
    }
}