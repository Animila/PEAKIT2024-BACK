import {Like} from "../domain/Like";

export interface ILikeRepo {
    getAllByStoriesId(storeId: number): Promise<(Like | null)[]>
    getAllByAccountId(accountId: number): Promise<(Like | null)[]>
    save(data: Like): Promise<Like | null>
    findById(id: number): Promise<Like | null>
}