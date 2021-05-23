import { IEntity, IEntityStorage } from "../type-definitions/interfaces";
import { ComponentFilter } from "../type-definitions/types";



export default class CombinedEntitiesStorage<TEntity extends IEntity<any>> implements IEntityStorage<TEntity>{

    public get entities(): TEntity[] {
        const e: TEntity[] = [];

        for(let i = 0; i < this._storages.length; i++) {
            e.push(...this._storages[i].entities)
        }

        return e;
    }

    constructor(private _storages: IEntityStorage<TEntity>[]) {}

    /**
     * NOT IMPLEMENTED! 
     * If you want add new entity to storage, add to concrette storage, not to combined!
     */
    add(...entity: TEntity[]): void {}

    /**
     * 
     * @param entity - The Entity to remove.
     * @returns - Deleted Entity.
     * 
     * Remove Entity from original storage. 
     */
    remove(entity: TEntity): TEntity {
        for(let i = 0; i < this._storages.length; i++) {
            const e = this._storages[i].getById(entity.uuid);
            if(e) {
                this._storages[i].remove(e);
                break;
            }
        }
        
        return entity;
    }

    getById(id: string): TEntity {
        return this.entities.find(entity => entity.uuid === id);
    }

    // TODO: DRY is broken! This logic implementation watch in entity.storage.ts 
    getByComponents(components: ComponentFilter): TEntity[] {
        let result: TEntity[] = [];
        let index = 0;
        let entity = this.entities[index];

        while (entity) {
            if(
                entity
                && entity.isActive
                && components.include.every(component => entity.get(component))
                && (!components.exclude || !components.exclude.every(component => entity.get(component)))
            ) {
                result.push(entity);
            }

            index += 1;
            entity = this.entities[index];
        }

        return result;
    }

}