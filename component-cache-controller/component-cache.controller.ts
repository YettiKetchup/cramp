import { IEntity } from "../type-definitions/interfaces";
import { ComponentConstructor } from "../type-definitions/types";



export default class ComponentCacheController<TComponent extends Object> {

    private _components: TComponent[] = [];

    public get components(): TComponent[] { return this._components; }

    /**
     * Remove Component from Entity and adds it to Cache.
     * @param entity - the entity from which the component is removed
     * @param componentConstructor - the constructor of the component to be removed 
     */
    public addToCache(entity: IEntity<TComponent>, componentConstructor: ComponentConstructor<TComponent>): TComponent {
        const component: TComponent = entity.remove(componentConstructor);
        this._components.push(component);

        return component;
    }

    /**
     * Remove Component from Cache and adds it to Entity.
     * @param entity - the Entity to which the Component is added
     * @param componentConstructor - the constructor of the component to be added
     */
    public removeFromCache<KComponent extends TComponent>(entity: IEntity<TComponent>, componentConstructor: ComponentConstructor<KComponent>): KComponent {
        const component: KComponent = this._components.find(c => c instanceof componentConstructor) as KComponent;
        const index: number = this._components.indexOf(component);

        this._components.splice(index, 1);

        entity.add(componentConstructor);

        return component;
    }

    /**
     * Clear all cache
     */
    public clear(): void {
        this._components.length = 0;
    }

}