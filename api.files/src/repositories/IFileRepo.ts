import {File} from "../domains/File";

export interface IFileRepo {
    save(file: File): Promise<File | null>
    getById(id: number): Promise<File | null>
    getByEntityIdAndType(entity_type: string, entity_id: number): Promise<(File | null)[]>
    delete(id: number): Promise<File | null>
}