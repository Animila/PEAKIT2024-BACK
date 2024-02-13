import {AggregateRoot} from "../../support/domain/AggregateRoot";
import {UniqueEntityID} from "../../support/domain/UniqueEntityID";
import {Result} from "../../support/logic/Result";
import {Guard} from "../../support/logic/Guard";


interface ISlide {
    stories_id: number
    order: number
}

export class Slide extends AggregateRoot<ISlide> {
    private constructor(props: ISlide, id?: UniqueEntityID) {
        super(props, id)
    }

    getStoriesId(): number {
        return this.props.stories_id
    }

    getOrder(): number {
        return this.props.order
    }

    public static create(props: ISlide, id?: UniqueEntityID): Result<Slide> {
        const guardedProps = [
            { argument: props.stories_id, argumentName: 'id сториес' },
            { argument: props.order, argumentName: 'очередь' },

        ]

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps)

        if (!guardResult.succeeded) {
            return Result.fail<Slide>(guardResult.message)
        }
        const user = new Slide(props, id)
        const idIsNotEmpty = !!id
        return Result.ok<Slide>(user)
    }
}
