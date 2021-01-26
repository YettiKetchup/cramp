import FilterDecoratorSystem from "../core/system/filter-decorator.system";
import { IEntity, IEntityStorage, ISystem, ISystemsContainer } from "../type-definitions/interfaces";
import { ComponentConstructor, SystemConstructor } from "../type-definitions/types";
import { sleep } from "../utils/sleep.utility";



type TSystem = ISystem<any, IEntity<any>>;

type SystemQueueItem = {
    system: TSystem,
    decorators: TSystem[],
    sleepTime: number,
    include?: ComponentConstructor<any>[],
    exclude?: ComponentConstructor<any>[]
}

export default class SystemsContainer<TData> implements ISystemsContainer<TData> {

    private static _globalSystemPool: TSystem[] = [];
    private _queue: SystemQueueItem[] = [];
    private _queueIndex: number = -1;
    private _executionIndex: number = 0;

    constructor(private _entityStorage: IEntityStorage<IEntity<any>>) { }

    public static getSystemFromGlobalPool(systemConstructor: SystemConstructor): TSystem {
        let system = this._globalSystemPool.find(system => system.constructor === systemConstructor);
        if(!system) {
            system = new systemConstructor();
            this._globalSystemPool.push(system);
        }
        return system;
    }

    public add(systemConstructor: SystemConstructor): ISystemsContainer<TData> {
        const system: TSystem = SystemsContainer.getSystemFromGlobalPool(systemConstructor);
        const decorators: TSystem[] = [];
        const sleepTime = 0;
        const include: ComponentConstructor<any>[] = [];
        const exclude: ComponentConstructor<any>[] = [];

        this._queueIndex += 1;
        this._queue[this._queueIndex] = { system, decorators, sleepTime, include, exclude };

        return this;
    }

    public decorate(...systemConstructors: SystemConstructor[]): ISystemsContainer<TData> {
        for(let i = 0; i < systemConstructors.length; i++) {
            const decorator = SystemsContainer.getSystemFromGlobalPool(systemConstructors[i]);
            this._queue[this._queueIndex].decorators.push(decorator);
        }

        return this;
    }

    public sleep(time: number): ISystemsContainer<TData> {
        this._queue[this._queueIndex].sleepTime = time;
        return this;
    }

    public include(...componentsConstructor: ComponentConstructor<any>[]): ISystemsContainer<TData> {
        this._queue[this._queueIndex].include.push(...componentsConstructor);
        return this;
    }

    public exclude(...componentsConstructor: ComponentConstructor<any>[]): ISystemsContainer<TData> {
        this._queue[this._queueIndex].exclude.push(...componentsConstructor);
        return this;
    }

    public execute(data?: TData): void {
        if(this._executionIndex >= this._queue.length) {
            this._executionIndex = 0;
            return;
        }

        this._runQueue(this._executionIndex, data);

        if(this._queue[this._executionIndex].sleepTime) {
            sleep(this._queue[this._executionIndex].sleepTime).then(() => {
                this._exec(data);
            });
        }
        else {
            this._exec(data);
        }
    }

    private _exec(data?: any): void {
        this._executionIndex += 1;
        this.execute(data);
    }

    private _runQueue(index: number, data?: any): void {
        this._setupFilterDecorator(this._queue[index]);

        const executedSystem = this._setupDecorators(this._queue[index]);
        const entities: IEntity<any>[] = this._entityStorage.getByComponents(executedSystem.filter());

        executedSystem.storage = this._entityStorage;
        executedSystem.execute(entities, data);
    }

    private _setupDecorators(queueItem: SystemQueueItem): ISystem<any, IEntity<any>> {
        for(let i = 0; i < queueItem.decorators.length; i++) {
            queueItem.decorators[i].subsystem = queueItem.decorators[i+1]
                ? queueItem.decorators[i+1]
                : queueItem.system;
        }

        return queueItem.decorators.length ? queueItem.decorators[0] : queueItem.system;
    }

    private _setupFilterDecorator(queueItem: SystemQueueItem): void {
        if(queueItem.include.length || queueItem.exclude.length) {
            const filterDecorator = SystemsContainer.getSystemFromGlobalPool(FilterDecoratorSystem) as FilterDecoratorSystem<any, IEntity<any>>;
            filterDecorator.include = queueItem.include.length ? queueItem.include : null
            filterDecorator.exclude = queueItem.exclude.length ? queueItem.exclude : null

            queueItem.decorators.unshift(filterDecorator);
        }
    }

}