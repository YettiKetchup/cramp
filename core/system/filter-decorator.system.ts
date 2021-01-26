import { IEntity, IEntityStorage, ISystem, ISystemFilterDecorator } from "../../type-definitions/interfaces";
import { ComponentConstructor, ComponentFilter } from "../../type-definitions/types";



export default class FilterDecoratorSystem<TData, TEntity extends IEntity<any>> implements ISystemFilterDecorator<TData, TEntity> {
    
    private _subsystem: ISystem<any, TEntity> = null;
    private _storage: IEntityStorage<TEntity> = null;
    private _include: ComponentConstructor<any>[] = null;
    private _exclude: ComponentConstructor<any>[] = null;
    
    protected componentFilter: ComponentFilter = null;

    public get subsystem(): ISystem<any, TEntity> { return this._subsystem };
    public set subsystem(value: ISystem<any, TEntity>) { this._subsystem = value; }

    public get storage(): IEntityStorage<TEntity> { return this._storage; }
    public set storage(value: IEntityStorage<TEntity>) { this._storage = value; }

    public get include(): ComponentConstructor<any>[] { return this._include; }
    public set include(value: ComponentConstructor<any>[]) { this._include = value; }

    public get exclude(): ComponentConstructor<any>[] { return this._exclude; }
    public set exclude(value: ComponentConstructor<any>[]) { this._exclude = value; }
    
    public filter(): ComponentFilter {
        const include = !this.include ? this._subsystem.filter().include : [...this._subsystem.filter().include, ...this.include]
        let exclude = null;

        if(this._subsystem.filter().exclude) { exclude = this._subsystem.filter().exclude; }
        if(this.exclude) { exclude = this.exclude; }
        if(this.subsystem.filter().exclude && this.exclude) { exclude = [...this.subsystem.filter().exclude, ...this.exclude]; }

        return !exclude ? { include } : { include, exclude }
    }

    public execute(entities: TEntity[], data?: TData): void | Promise<any> {
        this._subsystem.execute(entities, data);
    };

}