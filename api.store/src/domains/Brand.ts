import {AggregateRoot} from "../../support/domain/AggregateRoot";
import {UniqueEntityID} from "../../support/domain/UniqueEntityID";
import {Result} from "../../support/logic/Result";
import {Guard} from "../../support/logic/Guard";


interface IBrand {
    title: string
    description: string
}

export class Brand extends AggregateRoot<IBrand> {
    private constructor(props: IBrand, id?: UniqueEntityID) {
        super(props, id)
    }

    getTitle(): string {
        return this.props.title
    }
    getDescription(): string {
        return this.props.description
    }

    public static create(props: IBrand, id?: UniqueEntityID): Result<Brand> {
        const guardedProps = [
            { argument: props.title, argumentName: 'название' },
            { argument: props.description, argumentName: 'описание' },
        ]

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps)

        if (!guardResult.succeeded) {
            return Result.fail<Brand>(guardResult.message)
        }
        const user = new Brand(props, id)
        const idIsNotEmpty = !!id
        return Result.ok<Brand>(user)
    }
}
