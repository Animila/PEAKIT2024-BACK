import { Result } from './Result'
import { UseCaseError } from './UseCaseError'

/**
 * Класс представляет результат операции, в котором произошла непредвиденная ошибка.
 * Унаследован от класса Result<UseCaseError>.
 */
export class UnexpectedError extends Result<UseCaseError> {
	/**
	 * Конструктор класса.
	 * @param {any} err - Объект ошибки, вызвавший непредвиденную ошибку.
	 */
	public constructor(err: any) {
		super(false, {
			message: `Произошла ошибка в работе программы.`,
			error: err,
		} as UseCaseError)

		console.log(`Произошла ошибка в работе программы`)
		console.error(err)
	}

	/**
	 * Статический метод создает экземпляр UnexpectedError с указанным объектом ошибки.
	 * @param {any} err - Объект ошибки, вызвавший непредвиденную ошибку.
	 * @returns {UnexpectedError} - Экземпляр UnexpectedError.
	 */
	public static create(err: any): UnexpectedError {
		return new UnexpectedError(err)
	}
}
