import { IComponent, IComponentsCache, IEntity, IEntityComponentManipulationBehaviour } from "../../../type-definitions/interfaces";
import { ComponentConstructor } from "../../../type-definitions/types";



export default class CachedComponentsDeletingComponentBehaviour<TComponent extends IComponent, TEntity extends IEntity<TComponent>> 
    implements IEntityComponentManipulationBehaviour<TComponent, TEntity> {

    constructor(private _cache: IComponentsCache<TComponent>) { }

    public execute<T extends TComponent>(entity: TEntity, componentConstructor: ComponentConstructor<T>): T {
      const component: T = entity.get(componentConstructor);
      if(!component) return null;

      const index: number = entity.components.indexOf(component);
      if(index === -1) return;

      entity.components.splice(index, 1);

      this._cache.addToCache(component);

      return component;
    }

}