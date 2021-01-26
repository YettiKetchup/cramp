import { IEntity, IEntitiesCache, IEntityStorage } from "../type-definitions/interfaces";



/**
 * Simple deleted Entities storage. 
 * Use it dor caching memory, if you want reuse some entity in a future.
 */
export default class EntitiesCache implements IEntitiesCache {

    private readonly _cache: Map<string, IEntity<any>> = new Map();

    /**
     * Getter for cached Entities Storge. 
     * Returns a Map with key as string and IEntity as value.
     */
    public get cache(): Map<string, IEntity<any>> {
        return this._cache;
    }

    /**
     * Adds removed Entity to storage and make it unactive 
     * to prevent getting into filtration.
     * @param key - key of stored Entity. Use this key to get Entity from pool in a future.
     * @param entity - instance of removed Entity.
     */
    public addToCache(key: string, entity: IEntity<any>, entityStorage: IEntityStorage<IEntity<any>>): void {
        entityStorage.remove(entity);
        entity.isActive = false;
        this._cache.set(key, entity);
    }

    /**
     * Return an Entity, make it active, and remove from cache.
     * @param key - the key under which the Entity is stored.
     */
    public removeFromCache(key: string, entityStorage: IEntityStorage<IEntity<any>>): IEntity<any> {
        const entity: IEntity<any> = this._cache.get(key);

        if(!entity) return null;

        this._cache.delete(key);
        entityStorage.add(entity);
        entity.isActive = true;

        return entity;
    }

    /**
     * Clear cache from all Entities.
     */
    public clear(): void {
        this._cache.clear();
    }

}