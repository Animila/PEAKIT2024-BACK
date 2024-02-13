import {Like as PersistanceLike} from "@prisma/client";
import {Like} from "../domain/Like";

export class LikeMap {
    public static toDomain(raw: PersistanceLike): Like | null {
        const likeOrError = Like.create({
            stories_id: raw.stories_id,
            account_id: raw.account_id
        })
        if(likeOrError.isFailure) {
            console.log(likeOrError.errorValue())
            return null
        }
        if(likeOrError.isSuccess) {
            return likeOrError.getValue()!
        }
        return null
    }
    public static toPersistance(like: Like): any {
        return {
            id: like.id.toValue(),
            stories_id: like.getStoriesId(),
            account_id: like.getAccountId()
        }
    }
}