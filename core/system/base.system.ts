import { IEntity, IEntityStorage, ISystem } from "../../type-definitions/interfaces";
import { ComponentFilter } from "../../type-definitions/types";


/**
 * Base implementation of System. Can request Entities by ComponentFilter, store subsustems and request
 * Entities by ComponentFilter.
 */
export default abstract class BaseSystem<TData, TEntity extends IEntity<any>> implements ISystem<TData, TEntity> {
    
    private _subsystem: ISystem<any, TEntity> = null;
    private _storage: IEntityStorage<TEntity> = null;
    protected readonly componentFilter: ComponentFilter = { include: [] };

    /**
     * Child Systems if you want use System as decorator.
     */
    public get subsystem(): ISystem<any, TEntity> { return this._subsystem };
    public set subsystem(value: ISystem<any, TEntity>) { this._subsystem = value; }


    /**
     * Acces to EntityStorage used by SystemsContainer
     */
    public get storage(): IEntityStorage<TEntity> { return this._storage; }
    public set storage(value: IEntityStorage<TEntity>) { this._storage = value; }
    
    /**
     * Request a Entities by ComponentFilter;
     */
    public filter(): ComponentFilter {
        return this.componentFilter;
    }

    /**
     * All logic of your System must be invoking in this method. Passing Entities and some data. 
     * @param entities - Array of Entities filtering by ComponentFilter.
     * @param data - oprional: some data transmitted from above.
     */
    public abstract execute(entities: TEntity[], data?: TData): void | Promise<any>;

}