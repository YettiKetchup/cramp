import ComponentsCache from "../../cache/components.cache";
import { IComponent, IComponentsCache, IEntity, IEntityBehaviour, IEntityComponentManipulationBehaviour } from "../../type-definitions/interfaces";
import { ComponentConstructor } from "../../type-definitions/types";
import BaseAddingComponentBehaviour from "./entity-behaviours/base-adding-component.behaviour";
import BaseDeletingComponentBehaviour from "./entity-behaviours/base-deleting-component.behaviour";
import BaseGettingComponentBehaviour from "./entity-behaviours/base-getting-component.behaviour";
import CachedComponentsAddingComponentBehaviour from "./entity-behaviours/cached-components-adding-component.behaviour";
import CachedComponentsDeletingComponentBehaviour from "./entity-behaviours/cached-components-deleting-component.behaviour";


/**
 * Base implementation of Entity, storing components and give access to them.
 * You can use it raw.
 */
export default class BaseEntity<TComponent extends IComponent> 
    implements IEntity<TComponent>, 
    IEntityBehaviour<TComponent, IEntity<TComponent>> 
{
    
    private _uuid: string = '';
    private _components: TComponent[] = [];
    private _isActive: boolean = true;

    private _componentsCache: IComponentsCache<TComponent> = null;

    private _componentGettingBehaviour: IEntityComponentManipulationBehaviour<TComponent, IEntity<TComponent>> 
        = new BaseGettingComponentBehaviour();

    private _componentAddingBehaviour: IEntityComponentManipulationBehaviour<TComponent, IEntity<TComponent>> 
        = null;

    private _componentDeletingBehaviour: IEntityComponentManipulationBehaviour<TComponent, IEntity<TComponent>> 
        = null;

    public get uuid(): string { return this._uuid; }
    public get components(): TComponent[] { return this._components; }
    public get isActive(): boolean { return this._isActive; }
    public set isActive(value: boolean) { this._isActive = value; }
 
    /**
     * You can override get() method by passing new instance of class 
     * who implements IEntityComponentManipulationBehaviour interface.
     */
    public get componentGettingBehaviour(): IEntityComponentManipulationBehaviour<TComponent, IEntity<TComponent>> { 
        return this._componentGettingBehaviour; 
    }

    public set componentGettingBehaviour(value: IEntityComponentManipulationBehaviour<TComponent, IEntity<TComponent>>) { 
        this._componentGettingBehaviour = value; 
    }

    /**
     * You can override add() method by passing new instance of class 
     * who implements IEntityComponentManipulationBehaviour interface.
     */
    public get componentAddingBehaviour(): IEntityComponentManipulationBehaviour<TComponent, IEntity<TComponent>> { 
        return this._componentAddingBehaviour; 
    }

    public set componentAddingBehaviour(value: IEntityComponentManipulationBehaviour<TComponent, IEntity<TComponent>>) { 
        this._componentAddingBehaviour = value; 
    }

    /**
     * You can override remove() method by passing new instance of class 
     * who implements IEntityComponentManipulationBehaviour interface.
     */
    public get componentDeletingBehaviour(): IEntityComponentManipulationBehaviour<TComponent, IEntity<TComponent>> { 
        return this._componentDeletingBehaviour; 
    }
    
    public set componentDeletingBehaviour(value: IEntityComponentManipulationBehaviour<TComponent, IEntity<TComponent>>) { 
        this._componentDeletingBehaviour = value; 
    }

    constructor(uuid: string, isCached: boolean = true) {
        this._uuid = uuid;

        if(isCached) {
            this._componentsCache = new ComponentsCache();
            this._componentAddingBehaviour = new CachedComponentsAddingComponentBehaviour(this._componentsCache);
            this._componentDeletingBehaviour = new CachedComponentsDeletingComponentBehaviour(this._componentsCache);
        }

        else {
            this._componentAddingBehaviour = new BaseAddingComponentBehaviour();
            this._componentDeletingBehaviour = new BaseDeletingComponentBehaviour();
        }
    }

    /**
     * Returns existing Component from Entity components array. 
     * If component doesen't exist - returns undefined.
     * Override method behaviour: create new class who implements IEntityComponentManipulationBehaviour interface
     * and pass them to componentGettingBehaviour property.
     * 
     * @param componentConstructor - constructor of finding component.
     * @returns <T extends TComponent> - return an instance of component.
     * @example const healthComponent = entity.get(HealthComponent);
     */
    get<T extends TComponent>(componentConstructor: ComponentConstructor<T>): T {
        return this._componentGettingBehaviour.execute(this as IEntity<TComponent>, componentConstructor) as T;
    }

    /**
     * Create and adding Component to Entity components array.
     * If component already exist throwing CrampErrorCode.COMPONENT_EXIST error.
     * Override method behaviour: create new class who implements IEntityComponentManipulationBehaviour interface
     * and pass them to componentAddingBehaviour property.
     * 
     * @param componentConstructor - constructor of adding component.
     * @returns <T extends TComponent> - return an instance of component.
     * @example const healthComponent = entity.add(HealthComponent);
     */
    add<T extends TComponent>(componentConstructor: ComponentConstructor<T>): T {
        return this._componentAddingBehaviour.execute(this as IEntity<any>, componentConstructor) as T;
    }

    /**
     * Removing existing component from Entity components array;
     * If component doesen't exist returns null;
     * Override method behaviour: create new class who implements IEntityComponentManipulationBehaviour interface
     * and pass them to componentDeletingBehaviour property.
     * 
     * @param componentConstructor - constructor of removing component.
     * @returns <T extends TComponent> - return an instance of component.
     * @example const healthComponent = entity.remove(HealthComponent);
     */
    remove<T extends TComponent>(componentConstructor: ComponentConstructor<T>): T {
        return this._componentDeletingBehaviour.execute(this as IEntity<any>, componentConstructor) as T;
    }

}
