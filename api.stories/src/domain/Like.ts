import {AggregateRoot} from "../../support/domain/AggregateRoot";
import {UniqueEntityID} from "../../support/domain/UniqueEntityID";
import {Result} from "../../support/logic/Result";
import {Guard} from "../../support/logic/Guard";


interface ILike {
    stories_id: number
    account_id: number
}

export class Like extends AggregateRoot<ILike> {
    private constructor(props: ILike, id?: UniqueEntityID) {
        super(props, id)
    }

    getStoriesId(): number {
        return this.props.stories_id
    }

    getAccountId(): number {
        return this.props.account_id
    }

    public static create(props: ILike, id?: UniqueEntityID): Result<Like> {
        const guardedProps = [
            { argument: props.stories_id, argumentName: 'id сториес' },
            { argument: props.account_id, argumentName: 'id аккаунта' },

        ]

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps)

        if (!guardResult.succeeded) {
            return Result.fail<Like>(guardResult.message)
        }
        const user = new Like(props, id)
        const idIsNotEmpty = !!id
        return Result.ok<Like>(user)
    }
}
