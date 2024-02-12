/**
 * Интерфейс IHandle представляет собой объект, способный обрабатывать доменные события.
 *
 * @interface
 * @template IDomainEvent - Тип доменного события, который обрабатывается объектом.
 */
export interface IHandle<IDomainEvent> {
	/**
	 * Метод setupSubscriptions используется для настройки подписок на доменные события.
	 * Объект, реализующий этот интерфейс, должен подписываться на необходимые события при вызове этого метода.
	 *
	 * @abstract
	 * @memberof IHandle
	 */
	setupSubscriptions(): void
}
