import { ComponentConstructor, ComponentFilter, SystemConstructor } from "./types";



export interface ICachedObject {
    inCache: boolean;
}

export interface IComponent extends Object {
    
}

export interface ICachedComponent extends IComponent, ICachedObject {

}

export interface IEntityComponentManipulationBehaviour<TComponent extends IComponent, TEntity extends IEntity<TComponent>> {
    execute<T extends TComponent>(entity: TEntity, componentConstructor: ComponentConstructor<T>): T;
}

export interface IEntityBehaviour<TComponent extends IComponent, TEntity extends IEntity<TComponent>> {
    componentGettingBehaviour: IEntityComponentManipulationBehaviour<TComponent, TEntity>;
    componentAddingBehaviour: IEntityComponentManipulationBehaviour<TComponent, TEntity>;
    componentDeletingBehaviour: IEntityComponentManipulationBehaviour<TComponent, TEntity>;
}

export interface IEntityController<TComponent extends IComponent> {
    get<T extends TComponent>(componentConstructor: ComponentConstructor<T>): T;
    add<T extends TComponent>(componentConstructor: ComponentConstructor<T>): T;
    remove<T extends TComponent>(componentConstructor: ComponentConstructor<T>): T;
}

export interface IEntity<TComponent extends IComponent> extends IEntityController<TComponent> {
    uuid: string;
    components: TComponent[];
    isActive: boolean;
}

export interface INodeEntity<TComponent extends IComponent, TNode extends Object> extends IEntity<TComponent> {
    node: TNode;
}

export interface IEntityFactory<TComponent extends IComponent, TEntity extends IEntity<TComponent>, TData> {
    create(id: string, data?: TData): TEntity;
}

export interface ISystem<TData, TEntity extends IEntity<any>> {
    subsystem: ISystem<any, TEntity>;
    storage: IEntityStorage<TEntity>;

    filter(): ComponentFilter;
    execute(entities: TEntity[], data?: TData): void | Promise<any>;
}

export interface ISystemFilterDecorator<TData, TEntity extends IEntity<any>> extends ISystem<TData, TEntity> {
    include: ComponentConstructor<any>[],
    exclude: ComponentConstructor<any>[]
}

export interface IEntityStorage<TEntity extends IEntity<any>> {
    entities: TEntity[];

    add(...entity: TEntity[]): void;
    remove(entity: TEntity): TEntity;
    getById(id: string): TEntity;
    getByComponents(components: ComponentFilter): TEntity[];
}

export interface ISystemsContainer<TData> {
    add(systemConstructor: SystemConstructor): ISystemsContainer<TData>;
    decorate(...systemConstructors: SystemConstructor[]): ISystemsContainer<TData>;
    sleep(time: number): ISystemsContainer<TData>;
    include(...componentsConstructor: ComponentConstructor<any>[]): ISystemsContainer<TData>;
    exclude(...componentsConstructor: ComponentConstructor<any>[]): ISystemsContainer<TData>;
    execute(data?: TData): void;
}

export interface ISystemContainerFactory {
    create(entityStorage: IEntityStorage<IEntity<any>>): ISystemsContainer<any>;
}

export interface ICrampModule<TData> {
    init(): void;
    execute(data?: TData): void;
    destroy(): void;
}

export interface IComponentsCache<TComponent extends IComponent> {
    components: TComponent[];
    addToCache(component: TComponent): void;
    removeFromCache<KComponent extends TComponent>(componentConstructor: ComponentConstructor<KComponent>): KComponent; 
    clear(): void;
}

export interface IEntitiesCache {
    cache: Map<string, IEntity<any>>;
    addToCache(key: string, entity: IEntity<any>, entityStorage: IEntityStorage<IEntity<any>>): void;
    removeFromCache(key: string, entityStorage: IEntityStorage<IEntity<any>>): IEntity<any>;
    clear(): void;
}