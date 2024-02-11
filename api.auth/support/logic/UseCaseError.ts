interface IUseCaseErrorError {
	message: string
}

interface IValidError {
	message: string
	type: string
}

/**
 * Абстрактный базовый класс для представления ошибок в контексте использования (Use Case).
 * Реализует интерфейс IUseCaseErrorError.
 */
export abstract class UseCaseError implements IUseCaseErrorError {
	/**
	 * Свойство для хранения текстового сообщения об ошибке.
	 */
	public readonly message: string
	public readonly errors?: IValidError[]

	/**
	 * Конструктор класса. Инициализирует сообщение об ошибке.
	 *
	 * @param {string} message - Текстовое сообщение об ошибке.
	 * @param {IValidError} errors - Дополнительная информация об ошибке (опционально)
	 */
	constructor(message: string, errors?: IValidError[]) {
		this.message = message
		this.errors = errors
	}
}
