import { AggregateRoot } from '../AggregateRoot'
import { UniqueEntityID } from '../UniqueEntityID'
import { IDomainEvent } from './IDomainEvent'

/**
 * Класс DomainEvents предоставляет механизм для управления и распределения доменных событий в системе.
 */
export class DomainEvents {
	// Словарь для хранения обработчиков событий.
	private static handlersMap: Record<
		string,
		Array<(event: IDomainEvent) => void>
	> = {}
	// Список агрегатов, помеченных для отправки событий.
	private static markedAggregates: AggregateRoot<any>[] = []

	/**
	 * Метод markAggregateForDispatch добавляет агрегат в список для отправки доменных событий.
	 *
	 * @param {AggregateRoot<any>} aggregate - Агрегат, который нужно отправить.
	 */
	public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
		const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

		if (!aggregateFound) {
			this.markedAggregates.push(aggregate)
		}
	}

	/**
	 * Метод dispatchAggregateEvents отправляет доменные события для указанного агрегата.
	 *
	 * @param {AggregateRoot<any>} aggregate - Агрегат, для которого нужно отправить события.
	 */
	private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
		aggregate.domainEvents.forEach((event: IDomainEvent) =>
			this.dispatch(event)
		)
	}

	/**
	 * Метод removeAggregateFromMarkedDispatchList удаляет агрегат из списка помеченных для отправки.
	 *
	 * @param {AggregateRoot<any>} aggregate - Агрегат для удаления из списка.
	 */
	private static removeAggregateFromMarkedDispatchList(
		aggregate: AggregateRoot<any>
	): void {
		// @ts-ignore
		const index = this.markedAggregates.findIndex(a => a.equals(aggregate))
		this.markedAggregates.splice(index, 1)
	}

	/**
	 * Метод findMarkedAggregateByID ищет помеченный агрегат по его идентификатору.
	 *
	 * @param {UniqueEntityID} id - Уникальный идентификатор агрегата.
	 * @returns {AggregateRoot<any>|null} - Найденный агрегат или null, если не найден.
	 */
	private static findMarkedAggregateByID(
		id: UniqueEntityID
	): AggregateRoot<any> | null {
		let found: AggregateRoot<any> | null = null
		for (const aggregate of this.markedAggregates) {
			if (aggregate.id.equals(id)) {
				found = aggregate
			}
		}

		return found
	}

	/**
	 * Метод dispatchEventsForAggregate отправляет доменные события для агрегата с указанным идентификатором.
	 *
	 * @param {UniqueEntityID} id - Уникальный идентификатор агрегата.
	 */
	public static dispatchEventsForAggregate(id: UniqueEntityID): void {
		const aggregate = this.findMarkedAggregateByID(id)

		if (aggregate) {
			this.dispatchAggregateEvents(aggregate)
			aggregate.clearEvents()
			this.removeAggregateFromMarkedDispatchList(aggregate)
		}
	}

	/**
	 * Метод register регистрирует обработчик для указанного типа доменного события.
	 *
	 * @param {(event: IDomainEvent) => void} callback - Функция-обработчик события.
	 * @param {string} eventClassName - Имя класса доменного события.
	 */
	public static register(
		callback: (event: IDomainEvent) => void,
		eventClassName: string
	): void {
		if (!this.handlersMap.hasOwnProperty(eventClassName)) {
			this.handlersMap[eventClassName] = []
		}
		this.handlersMap[eventClassName].push(callback)
	}

	/**
	 * Метод clearHandlers очищает все зарегистрированные обработчики событий.
	 */
	public static clearHandlers(): void {
		this.handlersMap = {}
	}

	/**
	 * Метод clearMarkedAggregates очищает список агрегатов, помеченных для отправки доменных событий.
	 */
	public static clearMarkedAggregates(): void {
		this.markedAggregates = []
	}

	/**
	 * Приватный метод dispatch отправляет доменное событие обработчикам, зарегистрированным для этого типа события.
	 *
	 * @param {IDomainEvent} event - Доменное событие для отправки.
	 */
	private static dispatch(event: IDomainEvent): void {
		// @ts-ignore
		const eventClassName: string = event.constructor.name

		if (this.handlersMap.hasOwnProperty(eventClassName)) {
			const handlers: any[] = this.handlersMap[eventClassName]
			for (const handler of handlers) {
				handler(event)
			}
		}
	}
}
