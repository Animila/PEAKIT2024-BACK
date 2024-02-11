import { Entity } from './Entity'
import { DomainEvents } from './events/DomainEvents'
import { IDomainEvent } from './events/IDomainEvent'
import { UniqueEntityID } from './UniqueEntityID'

/**
 * Абстрактный класс AggregateRoot представляет базовый класс для агрегатов в домене, которые являются группировками объектов, которые рассматриваются как единое целое в контексте системы.
 * Они отслеживают изменения и генерируют события домена при их модификации.
 *
 * @abstract
 * @extends Entity<T>
 * @template T - Тип свойств агрегата.
 */
export abstract class AggregateRoot<T> extends Entity<T> {
	// Приватное поле для хранения доменных событий агрегата.
	private _domainEvents: IDomainEvent[] = []

	/**
	 * Получение уникального идентификатора агрегата.
	 *
	 * @readonly
	 * @type {UniqueEntityID}
	 */
	get id(): UniqueEntityID {
		return this._id
	}

	/**
	 * Получение списка доменных событий агрегата.
	 *
	 * @readonly
	 * @type {IDomainEvent[]}
	 */
	get domainEvents(): IDomainEvent[] {
		return this._domainEvents
	}

	/**
	 * Метод для добавления доменного события в список событий агрегата.
	 * Также помечает агрегат для последующей отправки его событий.
	 *
	 * @param {IDomainEvent} domainEvent - Доменное событие для добавления.
	 * @protected
	 */
	protected addDomainEvent(domainEvent: IDomainEvent): void {
		this._domainEvents.push(domainEvent)
		// Пометка этого агрегата для отправки его событий.
		DomainEvents.markAggregateForDispatch(this)
		// Логирование добавленного доменного события.
		this.logDomainEventAdded(domainEvent)
	}

	/**
	 * Метод для очистки списка доменных событий агрегата.
	 * Вызывается после отправки событий.
	 *
	 * @public
	 */
	public clearEvents(): void {
		this._domainEvents.splice(0, this._domainEvents.length)
	}

	/**
	 * Приватный метод для логирования добавленного доменного события.
	 * Выводит информацию о связи между агрегатом и доменным событием в консоль.
	 *
	 * @param {IDomainEvent} domainEvent - Доменное событие для логирования.
	 * @private
	 */
	private logDomainEventAdded(domainEvent: IDomainEvent): void {
		// Получение текущего агрегата.
		const thisClass = Reflect.getPrototypeOf(this)
		// Получение добавленного доменного события.
		const domainEventClass =
			Reflect.getPrototypeOf(domainEvent)

		console.info(
			`[Создано доменое событие]:`,
			`${thisClass?.constructor.name} ==> ${domainEventClass?.constructor.name}`
		)
	}
}
