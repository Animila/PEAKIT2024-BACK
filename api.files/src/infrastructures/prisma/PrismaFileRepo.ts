import {IFileRepo} from "../../repositories/IFileRepo";
import {FileMap} from "../../mappers/FileMap";
import {File} from "../../domains/File";
import {PrismaClient} from "@prisma/client";

export class PrismaFileRepo implements IFileRepo {
    prisma = new PrismaClient()
    async delete(id: number): Promise<File | null> {
        const file = await this.prisma.file.delete({
            where: { id }
        })
        if(!file) return null
        return FileMap.toDomain(file)
    }

    async getByEntityIdAndType(entity_type: string, entity_id: number): Promise<(File | null)[]> {
        const files = await this.prisma.file.findMany({
            where: {
                entity_type,
                entity_id
            }
        })
        const domainFiles = files.map((item: any) => {
            return FileMap.toDomain(item)
        })
        return domainFiles
    }

    async getById(id: number): Promise<File | null> {
       const file = await this.prisma.file.findUnique({
           where: {id}
       })
        if(!file) return null
        return FileMap.toDomain(file)
    }

    async save(file: File): Promise<File | null> {
        const data = await FileMap.toPersistance(file)
        const result = await this.prisma.file.upsert({
            where: {id: data.id},
            create: data,
            update: data
        })
        if(!result) return null
        return FileMap.toDomain(result)
    }

}