// @ts-ignore
import {File as PersistanceFile} from "@prisma/client";
import {File} from "../domains/File";
import {UniqueEntityID} from "../../support/domain/UniqueEntityID";

export class FileMap {
    public static toDomain(raw: PersistanceFile): File | null {
        const fileOrError = File.create({
            name: raw.name,
            entity_id: raw.entity_id,
            entity_type: raw.entity_type,
            typefile: raw.typefile,
            path: raw.path
        }, new UniqueEntityID(raw.id))

        if(fileOrError.isFailure) {
            console.log(fileOrError.error)
            return null
        }
        if (fileOrError.isSuccess) {
            return fileOrError.getValue()!
        }

        return null
    }

    public static async toPersistance(file: File): Promise<any> {
        return {
            id: file.id.toValue(),
            name: file.getName(),
            entity_id: file.getEntityId(),
            entity_type: file.getEntityType(),
            typefile: file.getFileType(),
            path: file.getPath()
        }
    }
}