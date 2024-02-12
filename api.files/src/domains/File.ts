import {AggregateRoot} from "../../support/domain/AggregateRoot";
import {UniqueEntityID} from "../../support/domain/UniqueEntityID";
import {Result} from "../../support/logic/Result";
import {Guard} from "../../support/logic/Guard";


interface IFile {
    name: string
    path: string
    entity_type: string
    entity_id: number
    typefile: string
}

export class File extends AggregateRoot<IFile> {
    private constructor(props: IFile, id?: UniqueEntityID) {
        super(props, id)
    }

    getName(): string {
        return this.props.name
    }
    getPath(): string {
        return this.props.path
    }
    getEntityType(): string {
        return this.props.entity_type
    }
    getEntityId(): number {
        return this.props.entity_id
    }
    getFileType(): string {
        return this.props.typefile
    }


    public static create(props: IFile, id?: UniqueEntityID): Result<File> {
        const guardedProps = [
            { argument: props.name, argumentName: 'название' },
            { argument: props.path, argumentName: 'путь' },
            { argument: props.typefile, argumentName: 'тип файла' },
            { argument: props.entity_type, argumentName: 'описание' },
            { argument: props.entity_id, argumentName: 'описание' },
        ]

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps)

        if (!guardResult.succeeded) {
            return Result.fail<File>(guardResult.message)
        }
        const user = new File(props, id)
        const idIsNotEmpty = !!id
        return Result.ok<File>(user)
    }
}
