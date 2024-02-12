import * as express from 'express'

/**
 * Абстрактный базовый класс для контроллеров Express.
 * Определяет общие методы и структуру для обработки HTTP-запросов.
 */
export abstract class BaseController {
	protected request!: express.Request
	protected response!: express.Response

	/**
	 * Абстрактный метод, который должен быть реализован в подклассе.
	 * Выполняет логику контроллера.
	 */
	protected abstract executeImpl(): Promise<void | any>

	/**
	 * Метод для выполнения HTTP-запроса.
	 * Инициализирует свойства request и response и вызывает executeImpl.
	 *
	 * @param {express.Request} request - Объект запроса Express.
	 * @param {express.Response} response - Объект ответа Express.
	 */
	public execute(request: express.Request, response: express.Response): void {
		this.request = request
		this.response = response

		this.executeImpl()
	}

	/**
	 * Статический метод для возврата JSON-ответа с указанным кодом состояния и сообщением.
	 *
	 * @param {express.Response} response - Объект ответа Express.
	 * @param {number} code - Код состояния HTTP.
	 * @param {string} message - Сообщение в JSON-формате.
	 * @returns {express.Response} - Объект ответа Express.
	 */
	public static jsonResponse(
		response: express.Response,
		code: number,
		message: string
	): express.Response {
		return response.status(code).json({ message })
	}

	/**
	 * Метод для возврата успешного ответа с данными в формате JSON.
	 *
	 * @template T - Тип данных для сериализации в JSON.
	 * @param {T} dto - Объект данных для включения в ответ.
	 * @returns {express.Response} - Объект ответа Express.
	 */
	public ok<T>(dto?: T): express.Response {
		if (dto) {
			return this.response.status(200).json(dto)
		}

		return this.response.sendStatus(200)
	}

	/**
	 * Метод для возврата ответа с кодом состояния 201 (Created).
	 *
	 * @returns {express.Response} - Объект ответа Express.
	 */
	public created(): express.Response {
		return this.response.sendStatus(201)
	}

	public clientError(message?: string): express.Response {
		return BaseController.jsonResponse(
			this.response,
			400,
			message || 'Плохой запрос'
		)
	}

	public unauthorized(message?: string): express.Response {
		return BaseController.jsonResponse(
			this.response,
			401,
			message || 'Не авторизован'
		)
	}

	public forbidden(message?: string): express.Response {
		return BaseController.jsonResponse(
			this.response,
			403,
			message || 'Доступ запрещен'
		)
	}

	public notFound(message?: string): express.Response {
		return BaseController.jsonResponse(
			this.response,
			404,
			message || 'Не найден'
		)
	}

	public conflict(message?: string): express.Response {
		return BaseController.jsonResponse(
			this.response,
			409,
			message || 'Конфликт'
		)
	}

	public tooMany(message?: string): express.Response {
		return BaseController.jsonResponse(
			this.response,
			429,
			message || 'Слишком много запросов'
		)
	}
	/**
	 * Метод для логирования ошибки и возврата ответа с кодом 500 (Internal Server Error) в формате JSON.
	 *
	 * @param {Error | string} error - Объект ошибки или строка с сообщением об ошибке.
	 * @returns {express.Response} - Объект ответа Express.
	 */
	public fail(error: Error | string): express.Response {
		console.log(error)

		return this.response.status(500).json({
			message: error.toString(),
		})
	}
}
