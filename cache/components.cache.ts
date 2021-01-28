import { CrampErrorCode, CrampErrorMessage } from "../type-definitions/errors";
import { IComponent, IComponentsCache, IEntity } from "../type-definitions/interfaces";
import { ComponentConstructor } from "../type-definitions/types";



export default class ComponentsCache<TComponent extends IComponent> implements IComponentsCache<TComponent> {

    private _components: TComponent[] = [];

    public get components(): TComponent[] { return this._components; }

    /**
     * Add Component instance to Cache.
     * @param component - instance of Component.
     */
    public addToCache(component: TComponent): void {
        this._components.push(component);
    }

    /**
     * Remove Component from Cache and returned it.
     * @param componentConstructor - the constructor of the component to be added.
     * @returns instance of Component
     */
    public removeFromCache<KComponent extends TComponent>(componentConstructor: ComponentConstructor<KComponent>): KComponent {
        const component: KComponent = this._components.find(c => c instanceof componentConstructor) as KComponent;

        if(!component) throw new Error(CrampErrorMessage.get(CrampErrorCode.COMPONENT_NOT_FOUND_IN_CACHE));

        const index: number = this._components.indexOf(component);
        this._components.splice(index, 1);

        return component;
    }

    /**
     * Clear all cache
     */
    public clear(): void {
        this._components.length = 0;
    }

}