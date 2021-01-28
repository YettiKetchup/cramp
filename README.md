# Cramp

![alt text](https://i.ibb.co/ynxqVp7/cramp.jpg)

Cramp - это небольшой игровой фреймворк имплементирующий архитектуру основанную на паттерне Entity-Component-System. Что обеспечивает максимальную гибкость за счет низкой связности всех частей приложения. Одна из основных идей Cramp - избавить разработчика от большей части архитектурных задач и сконцентрировать его внимание на разработке логики. Фреймворк дает возможность писать по-настоящему расширяемые и переносимые решения без риска сломать уже существующий код.

Сам фреймворк при детальном изучении может показаться излишне абстрактным - это сделано для возможности интеграции фреймворка в любой игровой движок. Более того, Cramp можно использовать на серверной части, в отрыве от игровых движков, исключительно для разработки геймплея. Да, некоторые вещи придется реализовывать самостоятельно, либо воспользоваться одним из уже готовых интеграционных решений. Однако, в самом фреймворке не так много сущностей, что делает процесс интеграции простым настолько, насколько это возможно. 

В Cramp нет утилит и модулей, позволяющих упростить работу с графикой, физикой, звуками и прочей логикой, касающейся восприятия игры. Cramp - это исключительно архитектурное решение, которое отлично подойдет для проектов, требования к которым постоянно меняются в процессе разработки.Автор считает, что изменения механик в процессе разработки - это благо и часть эволюции игры. Однако, при изменениях зачастую возникает множество проблем и багов на решение которых, зачастую, уходит значительная часть времени разработчиков, тестировщиков менеджеров, гейм-дизайнеров,. Cramp решает эти проблемы и дает разработчикам и гейм-дизайнерам возможность менять игровые процессы на лету.


# Содержание
1. [Для каких проектов и кому подойдет Cramp](https://github.com/YettiKetchup/cramp/tree/dev#%D0%B4%D0%BB%D1%8F-%D0%BA%D0%B0%D0%BA%D0%B8%D1%85-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BE%D0%B2-%D0%B8-%D0%BA%D0%BE%D0%BC%D1%83-%D0%BF%D0%BE%D0%B4%D0%BE%D0%B9%D0%B4%D0%B5%D1%82-cramp)

2. [Установка](https://github.com/YettiKetchup/cramp/tree/dev#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0)

3. [Интеграционные бойлерплейты](https://github.com/YettiKetchup/cramp/tree/dev#%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5-%D0%B1%D0%BE%D0%B9%D0%BB%D0%B5%D1%80%D0%BF%D0%BB%D0%B5%D0%B9%D1%82%D1%8B)

4. [Компоненты](https://github.com/YettiKetchup/cramp/tree/dev#%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B)

5. [Сущности](https://github.com/YettiKetchup/cramp/tree/dev#%D1%81%D1%83%D1%89%D0%BD%D0%BE%D1%81%D1%82%D0%B8)

6. [Системы](https://github.com/YettiKetchup/cramp/tree/dev#%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B)

7. [Системы-декораторы](https://github.com/YettiKetchup/cramp/tree/dev#%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B-%D0%B4%D0%B5%D0%BA%D0%BE%D1%80%D0%B0%D1%82%D0%BE%D1%80%D1%8B)

8. [Хранилища Сущностей](https://github.com/YettiKetchup/cramp/tree/dev#%D1%85%D1%80%D0%B0%D0%BD%D0%B8%D0%BB%D0%B8%D1%89%D0%B0-%D1%81%D1%83%D1%89%D0%BD%D0%BE%D1%81%D1%82%D0%B5%D0%B9)

9. [Контейнеры Систем](https://github.com/YettiKetchup/cramp/tree/dev#%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%B9%D0%BD%D0%B5%D1%80%D1%8B-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC)

10. [Реакция на изменения Компонентов](https://github.com/YettiKetchup/cramp/tree/dev#%D1%80%D0%B5%D0%B0%D0%BA%D1%86%D0%B8%D1%8F-%D0%BD%D0%B0-%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2)

11. [Модули](https://github.com/YettiKetchup/cramp/tree/dev#%D1%80%D0%B5%D0%B0%D0%BA%D1%86%D0%B8%D1%8F-%D0%BD%D0%B0-%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2)

12. [Так как же это все работает](https://github.com/YettiKetchup/cramp/tree/dev#%D1%82%D0%B0%D0%BA-%D0%BA%D0%B0%D0%BA-%D0%B6%D0%B5-%D1%8D%D1%82%D0%BE-%D0%B2%D1%81%D0%B5-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D0%B5%D1%82)


# Для каких проектов и кому подойдет Cramp

Для небольших и средних инди-проектов, гемблинга, браузерных игр. Для команд, которые любят эксперименты с игровой механикой в ходе разработки.
Фреймворк распространяется свободно и может быть использован кем угодно, где угодно, без каких-либо ограничений. Совсем.


# Установка

Просто скопируйте этот репозиторий в свой проект. Или воспользуйтесь одним из интеграционных бойлерплейтов. 


# Интеграционные бойлерплейты

CocosCreator 2x - https://github.com/YettiKetchup/cc-cramp-boilerplate

CocosCreator 3x - В процессе разработки...

PlayCanvas - В процессе разработки...

NodeJS (TypeScript) - В процессе разработки...


# Компоненты

Компонент в Cramp - это всего-навсего хранилище для данных. Совокупность компонентов формирует Сущность, логический игровой объект. В Компоненте, за некоторыми исключениями, не может быть какой-либо логики, только данные. Да, в экосистеме Cramp предусмотрены гибридные компоненты, которые хранят в себе и данные и логику, но эти компоненты используются исключительно для интеграции некоторой функциональности игрового движка и фреймворка. Например, в интеграционном бойлерплейте CocosCreator 2.x содержатся компоненты с функцилнальностью подписки и отписки событий указателя. В экосистеме Cramp предусмотрен интерфейс IComponent, однако его роль заключается в структуризации и он не хранит в себе описания свойств и методов. Более того, в целях простой интеграции интерфейс IComponent может быть заменен на другой, поскольку он наследует свое поведение от стандартного Object.


## Примеры создания Компонента

Обычный Компонент содержащий в себе данные.
```
class HealthComponent implements IComponent {
	public value: number = 100;
}
```

Возможен вариант при котором в Компоненте нет каких-либо данных, а сам он используется в качестве тега. Это полезно, когда мы хотим снизить
уровень асбтракции, определив поведение для конкретных игровых Сущностей. 
```
class PlayerComponent implements IComponent {

}
```

Позволительно использовать Консструкторы для передачи данных внутрь Компонента.
```
class HealthComponent implements IComponent {
	public value: number = 0;

	constructor(healthValue: number = 100) {
		this.value = healthValue;
	}

}
```

Также не запрещено использовать геттеры и сеттеры для преобразования данных.
```
class HealthComponent implements IComponent {
	private _value: number = 100;

	public get value(): number = {
		return this._value;
	}

	public set value(value: number) {
		if(value < 0>) value =0;
		this._value = value;
	}
}
```


## Хорошие практики

- Стараться держать в Компоненте минимальнй набор данных. Не стоит бояться дробить Компоненты на более мелкие. Более того, это необходимо, чтобы сохранить высокий уровень расширяемости игрового приложения. Например, в Компоненте HealthComponent мы могли бы хранить не только значение текущего здоровья, но и его максимальную величину. Зачастую, это оправдано, однако, если мы захотим добавить объекты у которых нет максимального значения здоровья, могут возникнуть трудности. В лучшем случае, будет выделятся лишняя память под неиспозуемые данные, что не очень хорошо с точки зрения оптимизации. В худшем, нам придется писать дополнительную логику, которая отодвигает порог максимального значения вплоть до бесконечности, что не имеет никакого смысла, когда можно использовать два разных Компонента. Коротко говоря: чем меньше и проще - тем лучше.


# Сущности

По сути, Сущность - это игровой объект с Компонентами вместо свойств и полным отсуствием логики. Вместо того, чтобы задавать Сущности свойства напрямую, мы добавляем в нее Компоненты у которых есть нужные нам свойства. Например, есть объект игрока с некоторым значением здоровья. В классическом ООП-подходе, нам пришлось бы создавать поле health и хранить в нем значение здоровья. Далее, чтобы наделить объект Игрока функциональностью потери и
восстановления Здоровья, нам пришлось бы создавать метод, отвечающий за данную функциональность. А если правильно подходить к проектированию данного функционала, нам бы пришлось имплементировать интерфейс IHealthable и определять это все в нем, впоследствии наделяя новые игровые объекты этим интерфейсом, что рано или поздно обязательно приведет к проблемам при расширении и изменении логики.

Вот так бы это выглядело:
```
interface IHealthable {
	health: number;
	changeHealth(value: number): void;
}

class Player implements IHealthable {

	public health: number = 100;

	public changeHealth(value: number): void {
		this.health -= 100;
	}

}
```

С первого раза все выглядит достаточно невинно. Однако, когда функциональность объекта игрока будет расширятся, мы неизбежно столкнемся с раздутием всего класса, что приведет к нарушениям базовых принципов проектирования, что в итоге вызовет огромное количество проблем при измененях. 
ECS-архитектура предлагает альтернативу - держать все части игрового объекта, а именно данные и логику, отдельно друг от друга. В ECS, в частности в реализации Cramp, для того, чтобы наделить игровой объект определенными свойствами, нам необходимо создать Компоненты, которые будут хранить необходимые данные. 


## Пример создания Сущности
```
// Пустой Компонент служащий для снижения уровня асбтракции
class PlayerComponent implements IComponent {

}

// Компонент наделяющий Сущность таким понятием как Здоровье и данными.
class HealthComponent implements IComponent {
	value: number = 100;
}

const player = new BaseEntity('0');
const components = [
	new PlayerComponent(), 
	new HealthComponent()
];
player.components.push(...components);
```

В Cramp по-умолчанию используется механизм кэширования Компонентов и первичного выделения памяти. Поэтому, необходимо создавать и добавить к Сущности все Компоненты заранее, после чего перенести в кэш все неиспользуемые Компоненты в момент инициализации. Это может показаться немного неудобным и избыточным, однако, пользователь фреймворка может пользоваться Абстрактными Фабриками, что сильно упростит процесс создания Сущностей. Да и процесс создания Сущностей и наделением их Компонентами сильно зависит от окружения. Например, в интеграционном бойлерплейте CocosCrerator 2.x процессы создания Сущностей и переноса в Кэш всех неиспользуемых Компонентов уже автоматизированы. От пользователя требуется только указать в игровом редакторе должен ли Компонент помещаться в Кэш сразу, или нет.

```
class PlayerFactory implements EntityFactory {
	create(id: string): IEntity<IComponent> {
		const player = new BaseEntity(id);

		const components = [new PlayerComponent(), new HealthComponent(100)];
		const cached = [new HitByEnemyComponent()]

		player.components.push(...components, ...cached);
		cached.forEach(c => player.remove(c.constructor.prototype.constructor));

		return player;
	}
}
```

Для интеграции с движками использующими древовидную структуру объектов существует отдельный класс NodeEntity, который предоставляет свойство node содержащее в себе ссылку на Ноду в игровой сцене. Таким образом, мы через Сущность фреймворка имеем доступ к API объекта игрового движка. Подобное реализовано в интеграционном бойлерплейте CocosCrerator 2.x.


## Пример API
```
// Создание Сущности
const entity = new BaseEntity('0');

// Добавление Компонентов к Сущности
entity.components.push(...components)

// Перемещение Компонента из Сущности в Кэш
entity.remove(HhelthComponent)

// Перемещение Компонента из Кэша в Сущность
entity.add(HealthComponent)
```


# Системы

Системы отвечают за логические манипуляции с данными Компонентов. Системы не работают с конкретными Сущностями напрямую, они получают извне все Сущности, которые соотвествуют параметрам фильтрации. Мы не можем в какой-либо Системе работать с конкретной Сущностью, например Player. Мы лишь можем запросить все Сущности, у которых есть Компонент PlayerComponent. Таким образом, наша логика и данные никак не связаны между собой и существуют обособленно друг от друга. Что обеспечивает невероятную гибкость и стойкость нашего игрового приложения. Мы можем наделять нашу Сущность другими Компонентами, что никак не повлияет на работу Систем, которые были созданы до этого. Если же мы лишим какую-нибудь Сущность определенных Компонентов, которые необходимы для работы Системы, то Система просто не запсутится и не будет работать. 


## Пример создания Системы

```
class IncreaseHealth extends BaseSystem<number, IEntity<IComponent>> {

	public filter(): ComponentFilter {
		return { 
			include: [HealthComponent, NeedHealComponent]
		 }
	}

	public execute(entities: IEntity<IComponent>[], value?: number): void {
		for(let i = 0; i < entities.length; i++) {
			const health: HealthComponent = entities[i].get(HealthComponent);
			health.value += value;
		}
	}

}
```

Что ж, стоит разобрать подробнее, что тут происходит. Сначала фреймворк вызовет метод filter(), который возвращает специальный объект фильтрации ComponentFilter. В нем мы указываем какие Сущности должны попасть в работу к данной Системе. У объекта ComponentFilter есть два поля: include - в котором мы указываем все Компоненты, наличие которых обязательно у Сущности, чтобы она попала в обработку; и необзяттельное поле exclude, в котором мы указываем каких Комопонентов быть не должно, чтобы Сущность попала в обработку. В данном примере мы указываем обязательное наличие двух компонентов: HealthComponent и NeedHealComponent. Если у Сущности будут и другие Компоненты, то нам и фреймворку это не важно, ведь мы не указали, что у Сущности при этом не должно быть каки-либо других Компонентов. Поэтому, Система получит все Сущности у которых есть HealComponent и NeedHealComponent в данный момент.

Важно: если указать в поле include пустой массив, фреймворк отдаст Системе все зарегестрированные Сущности. Это сделано для возможности декорации о которой будет рассказано в разделе "Контейнеры Систем".

Далее следует вызов метода execute, который принимает от Фреймворка массив со всеми Сущностями, которые соответствуют параметрам фильтрации в данный момент. Также, он может передавать определеныне данные извне, что используется на самом-деле крайне редко, но было показано в примере. И все, что нам остается сделать: провести манипуляции с каждой отдельной Сущностью.

И на этом все и строится: мы создаем Компоненты, которыми наделяем наши Сущности, а в Системах указываем Сущности с каким набором Компонентов нам нужны для работы. Подобный подход и обеспечивает нам невероятную гибкость и стойкость. Мы можем создать любое количество различных объектов с различным поведением и сутью, но сможем без проблем использовать для них одну и ту же логику. Одну только Систему из примера выше мы можем использовать не только для игрока и его противников, но также мы можем наделить функциональностью исцеления статичных персонажей, напарников, транспорт, разрушаемые объекты, предметы экипировки и многое-многое другое. При этом, у всех этих объектов разная суть и поведение. А если учесть, что Системы в фреймворке сущесвьтуют в единственном экземпляре, то мы получаем бонус в виде экономии памяти.


## Хрошие практики
- Каждая Система должна строго следовать принципу Single Responsibility! В противном случае, может пострадать расширяемость всего приложения.

- Для объекта фильтрации используйте защищенное поле componentFilter, что обеспечит его кеширование и объект не будет создаваться каждый вызов метода filter().
```
class IncreaseHealth extends BaseSystem<number, IEntity<IComponent>> {

	protected readonly componentFilter: ComponentFilter = {
		include: [HealthComponent, NeedHealComponent]
	}

	public filter(): ComponentFilter {
		return this.componentFilter;
	}

	public execute(entities: IEntity<IComponent>[], value?: number): void {
		for(let i = 0; i < entities.length; i++) {
			const health: HealthComponent = entities[i].get(HealthComponent);
			health.value += value;
		}
	}

}
```

- У каждой Системы есть ссылка на Хранилище Сущностей. Не стоит работать с ним напрямую, однако, его можно использовать для передачи различным инстурментам представленным в фреймворке, например, как Кэширование Сущностей.
```
class ObjectWasDead extends BaseSystem<number, IEntity<IComponent>> {
	protected readonly componentFilter: ComponentFilter = {
		include: [IsDeadComponent]
	}

	public filter(): ComponentFilter {
		return this.componentFilter;
	}

	public execute(entities: IEntity<IComponent>[], value?: number): void {
		for(let i = 0; i < entities.length; i++) {
			const entity: IEntity<IComponent> = entities[i];
			EntitiesGlobalCache.addToCache(entity.id, entity, this.storage);
		}
	}
}
```


# Системы-декораторы

Учитывая то, что для максимальной гибкости необходимо следовать принципу Open-Closed, в фреймворке Cramp есть возможность расширять функционал Систем не меняя исходный код путем декорирования. Системы-декораторы ничем не отличаются от базовых за исключением того, что в Системе-декораторе необходимо использовать фильтр дочерней Системы и принудительно вызывать метод execute(). В дальнейшем, API Систем-декораторов возможно, изменится, однако, изменения не затронут базовый класс Системы. Декорация Систем происходит в Контейнере, о чем будет рассказано подробнее в разделе "Контейнеры Систем".


## Пример Системы-декоратора

```
class LogDecorator extends BaseSystem<any, IEntity<IComponent>>{
	
	public filter(): ComponentFilter {
		return this.subsystem.filter();
	}

	public execute(entities: IEntity<IComponent>[], data?: any): void {
		for(let i = 0; i < entities.length; i++) {
			console.log(`Log from System-decorator!`);
			this.subsystem.execute([entities[i]], data);
		}
	}

}
```

В примере видно как мы можем изменить функциональность любой Сситемы используя Систему-декоратор. Вызывать метод execute() у дочерней Системы можно в любой момент в рамках метода execute() самого декоратора. Также нет нужды использовать поле componentFilter в декораторах, зачастую достаточно просто переопределить метод filter() вовзращая объект фильтрации дочерней Системы. Также, стоит помнить, что Системы-декорации необходимо использовать только для расширения функционала. Для расширения объекта фильтрации в фреймворке существуют другие, более простые механизмы о которых будет рассказано в разделе "Контейнеры Систем".


# Хранилища Сущностей

Для удобного хранения и доступа к Сущностям в Cramp реализованы Хранилища, которые достаточно просты в использовании. Для того, чтобы пользоваться Хранилищами, достаточно просто создать экземпляр, заполнить его Сущностями и передать в Контейнер. 


## Пример использования

```
const entityStorage: IEntityStorage<IEntity<IComponent>> = new EntityStorage();

const player = new Entity('0');
const enemy = new Enemy('1');

entityStorage.add(player, enemy);
```

Однако, хорошей практикой будет создавать Хранилища через специальную фабрику, реалиованную в классе статическом классе GlobalEntitiesStorage. Это класс хранит в себе созданные Хранилища и предоставляет к ним доступ из любого места проекта. 

```
// Создаем Хранилище через фабрику реализованную в методе create класса GlobalEntitiesStorage.
const entityStorage: IEntityStorage<IEntity<IComponent> = GlobalEntitiesStorage.create('Game');

// Получаем доступ к ранее созданному Хранилищу с id Game
const entityStorage: IEntityStorage<IEntity<IComponent> = GlobalEntitiesStorage.get('Game')

// Удаляем ранее созданное Хранилище с id Game
GlobalEntitiesStorage.remove('Game')
```

Это сделано для того, чтобы мы могли разгрузить фильтрацию и разделить наши игровые объекты. К примеру, мы можем создать отдельное Хранилище для игровых объектов, для интерфейса и статических декораций. Таким образом, фильтру, который предостовляет Системам работающим с объектами интерфейса Сущности интерфейса, не придется пробегать и проверять Сущности декораций и самой игры на соответсвие с фильтром. Это положительно сказывается на производительности, особенно в играх с большим количеством объектов.

Однако, для случаев, когда нам все же необходимо в рамках одного Контейнера Систем работать как с игровыми объектами, так и с синтерфейсом, предусмотрен вариант комбинирования.

```
// Комбинируем два Хранилища, получая новое, содержащее все Сущности из обеих
const entityStorage = GlobalEntitiesStorage.combine(
  'Ui_Game_Combined',
  ['Game', 'UI']
);

// В дальнейшем, нам не нужно будет комбинировать Хранилища заново, мы можем получить к ним доступ так же, как и к обычному Хранилищу
const entityStorage = GlobalEntitiesStorage.get('Ui_Game_Combined');
```


## Хорошие практики

- Не стоит бояться создавать как можно больше Хранилищ Сущностей, наоборот, это необходимо, чтобы оптимизировать производительностьь во время работы. К Хранилищам всегда можно быстро и удобно получить доступ из любого места, если это необходимо. Также их можно Комбинировать, расширяя диапазон обрабатываемых Сущностей.


# Контейнеры Систем

В Контейнерах происходит последовательный вызов и декорирование Систем. По сути, Контейнер - это сценарий по которому и происходит вся работа. Для наглядности, стоит разобрать пример.

```
const entityStorage: IEntityStorage<IEntity<IComponent> = GlobalEntitiesStorage.create('Game');
const container = new SystemsContainer(entityStorage);

container.add(HitByEnemySystem)
container.add(DecreaseHealthSystem)
container.add(RunHittedAnimationSystem)

container.execute();
```

После того, как Контейнер был создан, нам необходимо наполнить его Системами, которые будут отработаны при вызове метода execute() контейнера. Все Системы выполняются последовательно, одна за другой. Под каждое внутриигровое событие, будь то нажатие клавиши или ответ от сервера, необходимо создавать новый Контейнер, содержащий в себе уникальный набор Систем. Все Системы существуют в единственном экземпляре, поэтому каждую отдельную Систему можно использовать в множестве Контейнеров одновременно. А с инструментами декорации логики и фильтрации одна Система может обладать уникальным поведением в каждом отдельно взятом контейнере. 

Однако, как и в случае с Хранилищами, Контейнеры удобнее всего создавать через Фабрику, реализация которой доступна в фреймворке Cramp. Это интерфейс класса, содержащий в себе метод create() возвращающий экземпляр Контейнера с предустановленными Системами.

```
class OnCharacterHitContainer implements ISystemContainerFactory {

	create(entityStorage: IEntityStorage<IEntity<IComponent>>): ISystemsContainer {
		const container: ISystemContainer = new SystemsContainer(entityStorage);

		container.add(HitByEnemySystem)
		container.add(DecreaseHealthSystem)
		container.add(RunHittedAnimationSystem)

		return container;
	}
}

const entityStorage: IEntityStorage<IEntity<IComponent> = GlobalEntitiesStorage.create('Game');
const onCharacterHitContainer = new OnCharacterHitContainer().create(entityStorage);

...

// Когда что-то происходит
onCharacterHitContainer.execute()
```

Важно: Запсук Контейнера не должен происходить внутри Системы, это происходит где-то снаружи. Тем более, что для обработки внутриигровых событий предусмотрены механизмы реакции о которых будет рассказано в разделе "Реакция на изменение Компонентов".


## Декорации Систем в Контейнере

Функционал Контейнеров не ограничивается одним лишь последовательным запуском Систем. В них возможно декорировать функционал и фильтрацию любой Системы.
Количество декораторов никак не ограничено. Для примера вспомним наш LogDecoratorSystem.

```
class OnCharacterHitContainer implements ISystemContainerFactory {

	create(entityStorage: IEntityStorage<IEntity<IComponent>>): ISystemsContainer {
		const container: ISystemContainer = new SystemsContainer(entityStorage);

		container
			.add(HitByEnemySystem)
			.decorate(LogDecoratorSystem)

		return container;
	}
}
```
Вот так и работает механизм декораций Систем. Все происходит извне, никак не затрагивая оригинальную Систему.
Все декораторы устанавливаются через метод decorate() и выполняются последовательно в порядке добавления. 

```
class OnCharacterHitContainer implements ISystemContainerFactory {

	create(entityStorage: IEntityStorage<IEntity<IComponent>>): ISystemsContainer {
		const container: ISystemContainer = new SystemsContainer(entityStorage);

		container
			.add(HitByEnemySystem)
			.decorate(DecoratorOne, DecoratorTwo, DecoratorThee)

		return container;
	}
}
```
В данном примере Контенйер выполнит HitByEnemySystem в таком порядке: DecoratorOne > DecoratorTwo > DecoratorThree > HitByEnemySystem. Декорируемая Система всегда будет выполнятся последней. Системы-декораторы также сущесвтуют в единственном экземпляре, поэтому их можно использовать в любом количестве без риска выделить лишнюю память.

Также, мы можем декорировать не только функциональность Системы создавая Системы-декораторы, но и расширять возможности фильтра, сужая диапазон искомых Сущностей.

```
class MovementSystem extends BaseSystem<undefined, IEntity<ICOmponent>> {
	protected readonly componentFilter: ComponentFilter = {
		include: [PositionComponent, SpeedComponent]
	}

	public execute(entities: IEntity<IComponent>[]): void {
		for(let i = 0; i < entities.length; i++) {
			const position: PositionComponent = entities[i].get(PositionComponent);
			const speed: SpeedComponent = entities[i].get(SpeedComponent);

			position.x += speed.x;
			position.y += speed.y;
		}
	}
}
```
Допустим, у нас есть Система, которая приводит в движение все Сущности у которых есть Компоненты PositionComponent и SpeedComponent.
Таких Сущностей может быть разное множество, от игрока до декораций. И нам бы хотелось, чтобы по событию нажатия клавиши движения Сущность игрока начинала двигатся используя эту Систему. Но что произойдет, если мы запустим эту Систему при нажатии клавиши? Верно, она получит все Сущности отвечающие условию фильтра и приведет их в движение, чего бы нам не хотелось, поскольку задача стоит двигать только игрока по нажатию клавиши. Менять исходный код Системы - не вариант, это нарушит принцип Open-Closed. Можно было бы написать декоратор и переопределить фильтр - вот это верное решение. Однако, фреймворк предостовляет более простой механизм, который реализовывает именно эту механику расширения. 

```
const playerMovementContainer = new SystemsContainer(entityStorage);

playerMovementContainer
	.add(MovementSystem)
	.include(PlayerComponent)
```
Вот и все. Используя лишь один метод exclude и передав в него новый Компонент, мы ограничили тип Сущностей, которые попадут в работу к этой Системе в этом Контейнере. Метод include() добавляет в массив include вовзаращаемого объекта фильтрации новый Компонент, что меняет условие, но при этом никак не нарушает работоспособность Системы. Более того, сам объект фильтрации не подвегается никаким изменениям, поэтму MovementSystem использованная в других Контейнерах не будет модифицирована, все происходит в рамках конкретного Контейнера. Аналогично методу include() сущесвтует метод exclude(), который делает ровно тоже самое, но с полем exclude у объекта фильтрации.


## Отложенный запуск выполнения Систем

Мы можем всегда приостановить выполнение Систем в контейнере на какое-то время используя метод sleep(time). Это бывает полезным при работе, например, с анимациями.

```
container.add(HitByEnemySystem).sleep(1000) // Приостановить выполнение последующих Систем на 1000мс
container.add(DecreaseHealthSystem)
container.add(RunHittedAnimationSystem)
```


# Реакция на изменение Компонентов

Зачастую необходимо отслеживать события, которые происходят с Компонентами внутри Сущностей. Будь то удаление, добавление самого Компонента или изменение данных в нем. Для этого предоставляется специальный сатический класс ComponentChangesController, через который будут прослушиваться и инициироваться данные события.

```
// ...Где-то в Системе
execute(entities: IEntity[]): void {
	for(let i = 0; i < entities.length; i++) {
		// Изменение данных у Компонента
		ComponentChangesController.change(entities[i], HealthComponent, {value: 20});

		// Добавление Компонента
		ComponentChangesController.attach(entities[i], ManaComponent);
		
		// Удаление Компонента
		ComponentChangesController.deattach(entities[i], ManaComponent);
  }
}
```
Для того, чтобы сообщить всем подписчикам о том, что что-то изменилось, все манипуляции с Сущностями и Компонентами должны происходить через методы статического класса ComponentChangesController, которые принимают Сущность и Компонент с которыми проводятся манипуляции, а также объект изменений данных. Который, к слову, является типобезопасным и будет принимать только те поля и значения, которые указаны в самом Компоненте.

Для прослушки события необходимо использовать метод подписки у статического класса ComponentChangesController в котором мы указываем за каким именно типом события, в каких сущностях и за манипуляциями с каким именно Компонентом мы должны следить:
```
ComponentChangesController.subscribe({
in: [PlayerComponent, HealthComponent],
on: ComponentEvent.Attach,
component: HasDamageComponent,
	execute: () => damageContainer.execute()
})
```
Данный блок кода можно читать как: Когда к одной из Сущностей с Компонентами PlayerComponent и HealthComponent добавится Компонент HasDamageComponent запусти работу Контейнера HasDamageContainer. То есть, как только мы в одной из Систем, использующих в своей работе Сущность с набором Компонентов PlayerComponent и HealthComponent, вызовем метод attach() у ComponentChangesController и передадим туда HasDamageComponent, сработает событие и обработчик его подхватит.

Таким образом, мы можем запускать работу Контейнеров. 

# Модули

Во избежание бардака из огромной кучи Компонентов, Систем, Контейнеров и прочего, фреймворк предоставляет небольшое структурное решение. Пользоваться им или нет - решать пользователю, однако, простое решение поможет поддерживать порядок в коде и упростит переносимость функционала из проекта в проект. 

Для начала стоит определится со структурой папок, обычно выглядит модуль следующим образом:
```
MovementModule
|--components
|----speed.component.ts
|----position.component.ts
|--systems
|----movement.system.ts
|--containers
|----move.container.ts
|--movement.module.ts
```

Также, необзательным, но возможным есть создание точки входа в модуль. Это небольшой класс наследующий интерфейс ICrampModule, у которого есть всего два метода init() и execute(). Иногда бывает удобно создавать точку входа, создавать в ней контейнеры и подвязывать их на внутренние игровые события.
```
class MovementModule imlements ICrampModule<any> {

	private _entityStorage: IEntityStorage<IEntity<IComponent>> = null;
	private _moveContainer: ISystemsContainer<any> = null;

	constructor(entityStorage: IEntityStorage<IEntity<IComponent>>) { 
		this._entityStorage = entityStorage;
	}

	init() {
		this._moveContainer = new SystemsContainer(this._entityStorage);
	}

	execute(data: any): void {
		this._moveContainer.execute(data);
	}

}

const movementModule = new MovementModule();
movementModule.init();

...

movementModule.execute(data);
```

Модули могут без пробелм использовать части других Модулей. Однако, стоит это учитывать при переносе Модулей в другие проекты. Механизм внедрения зависимостей будет реализован с последующими обновлениями.

# Так как же это все работает

Порядок выполнения достаточно простой и последовательный и един для всех кейсов:

- Инциируется некоторое событие. Это может быть как ответ от сервера, нажатие клавиши клавиатуры, тач-событие, так и реакция на изменения в Компонентах.

- Запускается Контейнер, который последовательно начинает выполнять все установленные в нем Системы с учетом всех декораторов.

- Как только Контейнер начал выполнять Систему, он передает ее фильтр Хранилищу Сущностей, получает все найденные Сущности и выполняет Систему.

- Идет выполнение самой Системы, если условия фильтрации были удовлетворены. Однако, Система в любом случае выполнится хотя бы раз!

- Как только Система закончила свое выполнение, Контейнер переходит к выполнению другой Системы и так до конца.

- Как только все Системы в Контейнеры выполнены, Контейнер завершает свою работу, сбрасывая свое состояние до изначального, что позволяет использовать его еще раз.

## Простой пример

Для наглядности ниже приведен пример создания приложения в одном файле. В примере будет создано два объекта, которые будут двигатся с разной скоростью по нажатию на клавиши управления.

Создание классов Компонентов:
```
class SpeedComponent implements IComponent {
	x: number = 0;
	y: number = 0;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

class PositionComponent implements IComponent {
	x: number = 0;
	y: number = 0;
}
```

Создание класса Системы, которая будет запрашивать все Сущности с Компонентами SpeedComponent и PositionComponent, и в случае успеха приводить объекты в движение:
```
type MovementDelta = {
	x: number,
	y: number
}

class MovementSystem extends BaseSystem<MovementDelta, IEntity<IComponent>> {

	protected readonly componentFilter: ComponentFilter = {
		include: [SpeedComponent, PositionComponent]
	}

	public execute(entities: IEntity<IComponent>, delta: MovementDelta): void {
		for(let i = 0; i < entities.length; i++) {
			const speed: SpeedComponent = entities[i].get(SpeedComponent);
			const position: PositionComponent = entities[i].get(PositionComponent);

			position.x += speed.x * delta.x;
			position.y += speed.y * delta.y;
		}
	}

}
```

Теперь инициализируем приложение:
```
// Создадим Хранилище
const entityStorage: IEntityStorage<IEntity<IComponent>> = GlobalEntitiesStorage.create('Game');

// Создадим Сущности машин инаделим их нужными Компонентами
const carOne = new Entity('car_1');
carOne.components.push([new SpeedComponent(1, 0), new PositionComponent()]);

const carTwo = new Entity('car_2');
carTwo.components.push([new SpeedComponent(2, 0), new PositionComponent()]);

// Добавим Сущности в Контейнер
entityStorage.add(carOne, carTwo);

//Создадим Контейнер, передадим в него Хранилище с Сущностями и установим Систему для выполнения.
const carMovedContainer: ISystemsContainer<MovementDelta> = new SystemsContainer(entityStorage)
carMovedContainer.add(MovementSystem)

// Повесим обработчик событий на нажатие клавиш и создадим объект дельты направления движения,
// который будем передавать Системе через Контейнер

document.addEventListener('keydown', event => {
	const movementDelta: MovementDelta = {x: 0, y: 0}

	if(event.key === 'ArrowLeft') movementDelta.x = 1;
	if(event.key === 'ArrowRight') movementDelta.x = -1;

	carMovedContainer.execute(movementDelta);
}, false);
```

Вот и все. Создание более крупных и сложных приложений нчием не отличается от того, что было показано в примере. Разумеется, необходимо пользоваться Фабриками, не забывать про разделения Хранилищь, кэшировании, принципах проектирования, однако все это достаточн оподробно расписано в документации выше. 