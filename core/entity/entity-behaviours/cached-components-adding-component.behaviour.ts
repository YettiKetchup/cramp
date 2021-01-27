import { IComponent, IComponentsCache, IEntity, IEntityComponentManipulationBehaviour } from "../../../type-definitions/interfaces";
import { ComponentConstructor } from "../../../type-definitions/types";



export default class CachedComponentsAddingComponentBehaviour<TComponent extends IComponent, TEntity extends IEntity<TComponent>> 
    implements IEntityComponentManipulationBehaviour<TComponent, TEntity> {

    constructor(private _cache: IComponentsCache<TComponent>) { }

    public execute<T extends TComponent>(entity: TEntity, componentConstructor: ComponentConstructor<T>): T {
      const component: T = this._cache.removeFromCache(componentConstructor); 

      entity.components.push(component);
      return component as T;

    }

}