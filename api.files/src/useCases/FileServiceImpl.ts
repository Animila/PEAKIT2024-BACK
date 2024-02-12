import {PathSharp} from "../infrastructures/local/PathSharp";
import {IFileService} from "./IFileService";
import {IFileRepo} from "../repositories/IFileRepo";
import {File} from "../domains/File";
import {FileMap} from "../mappers/FileMap";
import {th} from "date-fns/locale";

interface IFileLoad {
    name: string
    path: string
    entity_type: string
    entity_id: number
    filetype: string
}

export class FileServiceImpl implements  IFileService{
    private fileRepo: IFileRepo
    private localFile

    constructor(fileRepo: IFileRepo) {
        this.fileRepo = fileRepo
        this.localFile = new PathSharp(this.fileRepo)
    }

    async createFile(entity_id: number, entity_type: string, images: any): Promise<File> {
        try {
            const dataFile = await this.localFile.upload(images, entity_type, entity_id)
            console.log('23445',dataFile)
            const fileOrError = File.create({
                path: dataFile.path,
                typefile: dataFile.filetype,
                entity_type: dataFile.entity_type,
                entity_id: dataFile.entity_id,
                name: dataFile.name
            })

            if(fileOrError.isFailure) {
                console.log(fileOrError.errorValue())
                throw new Error(""+fileOrError.errorValue())

            }

            const savedFile = await this.fileRepo.save(fileOrError.getValue()!)
            if(!savedFile) throw new Error("Ошибка сохранения")
            return FileMap.toPersistance(savedFile)
        } catch (err: any) {
            throw new Error('' + err.message)
        }
    }

    async delete(id: number): Promise<File> {
        try {
            const deleted = await this.fileRepo.delete(id)
            if(!deleted) throw new Error('Файл не найден')
            await this.localFile.delete(deleted.getPath())
            return FileMap.toPersistance(deleted)
        } catch (err: any) {
            throw new Error('' + err.message)
        }
    }

    async getByIdAndType(entity_id: number, entity_type: string): Promise<File[]> {
        const files = await this.fileRepo.getByEntityIdAndType(entity_type, entity_id)
        return await Promise.all(files.map(async (item: any) => {
            if(item) return await FileMap.toPersistance(item)
            return null
        }))
    }

}