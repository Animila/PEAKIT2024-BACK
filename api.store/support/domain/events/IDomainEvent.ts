import { UniqueEntityID } from '../UniqueEntityID'

/**
 * Интерфейс IDomainEvent представляет собой доменное событие в системе.
 *
 * @interface
 */
export interface IDomainEvent {
	/**
	 * Дата и время возникновения доменного события.
	 *
	 * @type {Date}
	 */
	dateTimeOccurred: Date

	/**
	 * Метод getAggregateId возвращает уникальный идентификатор агрегата, связанного с доменным событием.
	 *
	 * @abstract
	 * @returns {UniqueEntityID} - Уникальный идентификатор агрегата.
	 */
	getAggregateId(): UniqueEntityID
}
