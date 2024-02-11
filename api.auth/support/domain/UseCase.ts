/**
 * Интерфейс для представления шаблона Use Case в системе.
 *
 * @template IRequest - Тип данных для входного запроса.
 * @template IResponse - Тип данных для выходного ответа.
 */
export interface IUseCase<IRequest, IResponse> {
	execute(request?: IRequest): Promise<IResponse> | IResponse
}
