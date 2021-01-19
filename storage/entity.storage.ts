import { IEntity, IEntityStorage } from "../type-definitions/interfaces";
import { ComponentFilter } from "../type-definitions/types";



export default class EntityStorage<TEntity extends IEntity<any>> implements IEntityStorage<TEntity> {

    private _entities: TEntity[] = [];

    public get entities(): TEntity[] { return this._entities; }

    public add(...entity: TEntity[]): void {
        entity.forEach(e => this._entities.push(e));
    }

    public remove(entity: TEntity): TEntity {
        const index: number = this._entities.indexOf(entity);
        if(index === -1) return;

        this._entities.splice(index, 1);
        return entity;
    }

    public getById(id: string): TEntity {
        return this._entities.find(entity => entity.uuid === id);
    }

    public getByComponents(components: ComponentFilter): TEntity[] {
        let result: TEntity[] = [];
        let index = 0;
        let entity = this._entities[index];

        while (entity) {
            if(this._getByComponentsCondition(entity, components)) {
                result.push(entity);
            }

            index += 1;
            entity = this._entities[index];
        }

        return result;
    }

    private _getByComponentsCondition(entity: TEntity, components: ComponentFilter): boolean {
        return (
            entity
            && entity.isActive
            && components.include.every(component => entity.get(component))
            && (!components.exclude || !components.exclude.every(component => entity.get(component)))
        )
    }

}