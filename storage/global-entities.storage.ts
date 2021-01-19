import { IEntity, IEntityStorage } from "../type-definitions/interfaces";
import CombinedEntitiesStorage from "./combined-entities.storage";
import EntityStorage from "./entity.storage";



type EntityStorageType = IEntityStorage<IEntity<any>>;

export default class GlobalEntitiesStorage {

    private static _storages: Map<string, EntityStorageType> = new Map();

    public static get(key: string): EntityStorageType {
        return  this._storages.get(key);
    }

    public static create(key: string): EntityStorageType {
        const storage = new EntityStorage();
        this._storages.set(key, storage);
        return storage;
    }

    public static remove(entity: IEntity<any>, storage?: EntityStorageType): void {
        if(!storage) {
            const storages = Array.from(this._storages).map(item => item[1]);
            storage = storages.find(store => !!store.getById(entity.uuid));
        }

        storage.remove(entity);
    }

    public static combine(key: string, storageKeys: string[]): EntityStorageType {
        if(this._storages.has(key)) return this._storages.get(key);

        const storages: EntityStorageType[] = storageKeys.map(storageKey => { return this.get(storageKey) });
        const combinedStorage: EntityStorageType = new CombinedEntitiesStorage(storages)

        this._storages.set(key, combinedStorage);
        return combinedStorage;
    }

}