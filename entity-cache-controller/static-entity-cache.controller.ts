import { IEntity, IEntityCacheController } from "../type-definitions/interfaces";
import EntityCacheController from "./entity-cache.controller";



/**
 * Simple deleted Entities storage. 
 * Use it dor caching memory, if you want reuse some entity in a future.
 */
export default class StaticEntityCacheController {

    private static readonly _cache: Map<string, IEntity<any>> = new Map();
    private static readonly _cacheController: IEntityCacheController = new EntityCacheController();

    /**
     * Getter for cached Entities Storge. 
     * Returns a Map with key as string and IEntity as value.
     */
    public static get cache(): Map<string, IEntity<any>> {
        return this._cacheController.cache;
    }

    /**
     * Adds removed Entity to storage and make it unactive 
     * to prevent getting into filtration.
     * @param key - key of stored Entity. Use this key to get Entity from pool in a future.
     * @param entity - instance of removed Entity.
     */
    public static add(key: string, entity: IEntity<any>): void {
        this._cacheController.add(key, entity);
    }

    /**
     * Return an Entity, make it active, and remove from cache.
     * @param key - the key under which the Entity is stored.
     */
    public static get(key: string): IEntity<any> {
        return this._cacheController.get(key);
    }

    /**
     * Clear cache from all Entities.
     */
    public static clear(): void {
        this._cacheController.clear();
    }

}