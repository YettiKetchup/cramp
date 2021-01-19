import { IEntity, ISystem } from "../../type-definitions/interfaces";
import { ComponentFilter } from "../../type-definitions/types";



export default abstract class BaseSystem<TData, TEntity extends IEntity<any>> implements ISystem<TData, TEntity> {
    
    private _subsystem: ISystem<any, TEntity> = null;
    protected componentFilter: ComponentFilter = { include: [] };

    public get subsystem(): ISystem<any, TEntity> { return this._subsystem };
    public set subsystem(value: ISystem<any, TEntity>) { this._subsystem = value; }
    
    public filter(): ComponentFilter {
        return this.componentFilter;
    }

    public abstract execute(entities: TEntity[], data?: TData): void | Promise<any>;

}