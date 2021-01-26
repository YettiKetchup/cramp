import { IEntitiesCache, IEntity, IEntityStorage } from "../type-definitions/interfaces";
import EntitiesCache from "./entities.cache";



/**
 * Simple deleted Entities storage. 
 * Use it dor caching memory, if you want reuse some entity in a future.
 */
export default class EntitiesGlobalCache {

    private static readonly _cacheController: IEntitiesCache = new EntitiesCache();

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
    public static addToCache(key: string, entity: IEntity<any>, entityStorage: IEntityStorage<IEntity<any>>): void {
        this._cacheController.addToCache(key, entity, entityStorage);
    }

    /**
     * Return an Entity, make it active, and remove from cache.
     * @param key - the key under which the Entity is stored.
     */
    public static removeFromCache(key: string, entityStorage: IEntityStorage<IEntity<any>>): IEntity<any> {
        return this._cacheController.removeFromCache(key, entityStorage);
    }

    /**
     * Clear cache from all Entities.
     */
    public static clear(): void {
        this._cacheController.clear();
    }

}