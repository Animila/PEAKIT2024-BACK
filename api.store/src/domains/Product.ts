import {AggregateRoot} from "../../support/domain/AggregateRoot";
import {UniqueEntityID} from "../../support/domain/UniqueEntityID";
import {Result} from "../../support/logic/Result";
import {Guard} from "../../support/logic/Guard";


interface IProduct {
    title: string
    about: string
    description: string
    price: string
    code: string
    content: string
    type: string
    brand_id: number
    priceM: number
    created_at: Date
}

export class Product extends AggregateRoot<IProduct> {
    private constructor(props: IProduct, id?: UniqueEntityID) {
        super(props, id)
    }

    getTitle(): string {
        return this.props.title
    }

    getAbout(): string {
        return this.props.about
    }

    getDescription(): string {
        return this.props.description
    }

    getPrice(): string {
        return this.props.price
    }

    getCodeProduct(): string {
        return this.props.code
    }

    getContentProduct(): string {
        return this.props.content
    }

    getTypeProduct(): string {
        return this.props.type
    }

    getPriceMEd(): number {
        return this.props.priceM
    }

    getBrandId(): number {
        return this.props.brand_id
    }

    getDateCreate(): Date {
        return this.props.created_at
    }

    public static create(props: IProduct, id?: UniqueEntityID): Result<Product> {
        const guardedProps = [
            { argument: props.title, argumentName: 'название' },
            { argument: props.about, argumentName: 'о товаре' },
            { argument: props.description, argumentName: 'описание' },
            { argument: props.price, argumentName: 'цена' },
            { argument: props.code, argumentName: 'код товара' },
            { argument: props.content, argumentName: 'состав' },
            { argument: props.priceM, argumentName: 'цены в М. Ед' },
            { argument: props.type, argumentName: 'формы выпуска' },
        ]

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps)

        if (!guardResult.succeeded) {
            return Result.fail<Product>(guardResult.message)
        }
        const user = new Product(props, id)
        const idIsNotEmpty = !!id
        return Result.ok<Product>(user)
    }
}
