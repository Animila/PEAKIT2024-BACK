import {File} from "../domains/File";

export interface IFileService {
    getByIdAndType(entity_id: number, entity_type: string): Promise<File[]>
    createFile(entity_id: number, entity_type: string, image: any): Promise<File>
    delete(id: number): Promise<File>

}