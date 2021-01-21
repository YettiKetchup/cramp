# Cramp

![alt text](https://i.ibb.co/FDqDk98/cramp-logo-small.png)
![alt text](https://i.ibb.co/WzcNHcP/ds-logo-small.png)

Cramp - это небольшой игровой фреймворк имплементирующий архитектуру основанную на паттерне Entity-Component-System. Что обеспечивает максимальную гибкость за счет низкой связности всех частей приложения. Одна из основных идей Cramp - избавить разработчика от большей части архитектурных задач и сконцентрировать его внимание на разработке логики. Фреймворк дает возможность писать по-настоящему расширяемые и переносимые решения без риска сломать уже существующий код.

Сам фреймворк при детальном изучении может показаться излишне абстрактным - это сделано для возможности интеграции фреймворка в любой игровой движок. Более того, Cramp можно использовать на серверной части, в отрыве от игровых движков, исключительно для разработки геймплея. Да, некоторые вещи придется реализовывать самостоятельно, либо воспользоваться одним из уже готовых интеграционных решений. Однако, в самом фреймворке не так много сущностей, что делает процесс интеграции простым настолько, насколько это возможно. 

В Cramp нет утилит и модулей, позволяющих упростить работу с графикой, физикой, звуками и прочей логикой, касающейся восприятия игры. Cramp - это исключительно архитектурное решение, которое отлично подойдет для проектов, требования к которым постоянно меняются в процессе разработки.Автор считает, что изменения механик в процессе разработки - это благо и часть эволюции игры. Однако, при изменениях зачастую возникает множество проблем и багов на решение которых, зачастую, уходит значительная часть времени разработчиков, тестировщиков менеджеров, гейм-дизайнеров,. Cramp решает эти проблемы и дает разработчикам и гейм-дизайнерам возможность менять игровые процессы на лету.

# Установка

Просто скопируйте этот репозиторий в свой проект. Или воспользуйтесь одним из интеграционных бойлерплейтов. 

# Integration boilerplates

CocosCreator 2x - https://github.com/YettiKetchup/cc-cramp-boilerplate

CocosCreator 3x - В процессе разработки...

PlayCanvas - В процессе разработки...

NodeJS (TypeScript) - В процессе разработки...

# Требования к коду

Для того, чтобы Cramp раскрылся в полной силе и приносил удовольствие от работы с ним, необходимо придерживаться трех простых правил:

- Компонент должен содержать минимальный набор данных. Если Компонент задумывается как хранилище для значений жизни игрока, то разработчик не может добавить туда скорость передвижения или еще что-либо.


- Система должна делать что-то одно. Если Система занимается перемещением игрока, тов ней не может быть реализована механика отправки данных на сервер.


- Существующие Системы и Компоненты не могут быть изменены. Если нужны дополнительные данные в Компоненте - лучше написать еще один. Если нужна дополнительная логика для Системы, то проще будет написать Систему-Декоратор.

А если вкратце, то Системы и Компоненты в Cramp - это небольшие кирпичики, которые прекрасно стыкуются друг с другом, но при этом никак не связаны между собой, что обеспечивает разработчику возможность менять любую часть приложения на любом этапе. Главное: следовать идее о том, что Компоненты хранят в себе минимально возможное количество данных, а логика в Системах делает что-то одно.

# Компоненты

Компонент в Cramp - это всего-навсего хранилище для данных. В Компоненте, за некоторыми исключениями, не может быть какой-либо логики, только данные. Да, в экосистеме Cramp предусмотрены гибридные компоненты, которые хранят в себе и данные и логику, но эти компоненты используются исключительно для интеграции игрового движка и фреймворка.

Пример компонентов:

```
class HealthComponent {
	public value: number = 100;
}

class MaxHealthComponent {
	public value: number = 100;
}
```

Но существует и такой вариант, что Компонент может оставаться пустым и служить чем-то в роли тега для Сущности. Например, чтобы определить Сущность игрока, нам не нужно создавать поле isPlayer в компоненте PlayerComponent. Мы можем оставить его пустым.

Неправильно:
```
class PlayerComponent {
	public isPlayer:boolean = true; 
}
```

Правильно:
```
class PlayerComponent {

}
```

# Сущности

Сущность в Cramp - это всего-навсего объект, наделяемый свойствами Компонентов. 
По сути, Сущность - это игровой объект, собираемый из небольших кирпичиков-компонентов. У Сущности есть интерфейс, позволяющий добавлять, удалять и получать хранимые в ней Компоненты. В реализации фреймворка на данный момент нет кеширования Компонентов, однако, данный функционал вынесен в интеграционыые бойлерплейты. Например, в интеграции с CocosCreator Компоненты при изъятии из Сущности не удаляются и продолжают существовать в памяти. И при добавлении обратно новый инстанс не будет создан, будет взять уще существующий в памяти. 

Пример создания Кущности:
```
const player = new BaseEntity(id);
player.add(PlayerComponent);
player.add(HealthComponent);
```

Пример удаления Компонента из Сущности:
```
const component = player.remove(InvicibleComponent)
```

Пример получения Компонента из Сущности:
```
const health = player.get(HealthComponent);
health.value -= 10;
```

Для интеграции с движками у которых реализована иерархическая структура объектов на сцене, в Cramp предусмотрена дополнительная Сущность с дополнительным свойством node, которое ссылается на ноду игрового мира. Таким образом, мы через Сущность можем получить доступ к игровому объекту для дальнейших изменений.

Пример:
```
const playerObject = entity.node;
playerObject.position.x = 10;
```
