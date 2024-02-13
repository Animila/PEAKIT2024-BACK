import {Storie as PersistanceStorie} from "@prisma/client";
import {Storie} from "../domain/Storie";

export class StoriesMap {
    public static toDomain(raw: PersistanceStorie): Storie | null {
        const storieOrError = Storie.create({
            background: raw.background,
            type: raw.type
        })
        if(storieOrError.isFailure) {
            console.log(storieOrError.errorValue())
            return null
        }
        if(storieOrError.isSuccess) {
            return storieOrError.getValue()!
        }
        return null
    }
    public static toPersistance(storie: Storie): any {
        return {
            id: storie.id.toValue(),
            background: storie.getBackground(),
            type: storie.getType()
        }
    }
}