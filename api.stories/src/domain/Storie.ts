import {AggregateRoot} from "../../support/domain/AggregateRoot";
import {UniqueEntityID} from "../../support/domain/UniqueEntityID";
import {Result} from "../../support/logic/Result";
import {Guard} from "../../support/logic/Guard";


interface IStories {
    type: string
    background: string
}

export class Storie extends AggregateRoot<IStories> {
    private constructor(props: IStories, id?: UniqueEntityID) {
        super(props, id)
    }

    getType(): string {
        return this.props.type
    }

    getBackground(): string {
        return this.props.background
    }

    public static create(props: IStories, id?: UniqueEntityID): Result<Storie> {
        const guardedProps = [
            { argument: props.type, argumentName: 'тип' },
            { argument: props.background, argumentName: 'задний фон' },

        ]

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps)

        if (!guardResult.succeeded) {
            return Result.fail<Storie>(guardResult.message)
        }
        const user = new Storie(props, id)
        const idIsNotEmpty = !!id
        return Result.ok<Storie>(user)
    }
}
