import { ComponentEvent } from "../type-definitions/component-event.enum";
import { IEntity } from "../type-definitions/interfaces";
import { ComponentChangesWatcher, ComponentConstructor } from "../type-definitions/types";



type ComponentChanges<T, K extends keyof T> = { [P in K]: T[K] };

/**
 * Implements a simple reactivity. If you need handle component changes such as adding, deleting, 
 * changing data - use this class. 
 */
export default class ComponentChangesController {

    private static _notifiers: ComponentChangesWatcher[] = [];

    /**
     * Attach new component to Entity and notify all subscribers.
     * @param entity - entity to which a new component is added
     * @param componentConstructor - contructor of attached component
     * @param changes - optional: passing data to attached component. Type-safe.
     * @returns - instance of attached component.
     * @example ComponentChangesController.attach(entity, HealthComponent, {value: 100});
     */
    public static attach<T extends Object, K extends keyof T>(
        entity: IEntity<any>, 
        componentConstructor: ComponentConstructor<T>, 
        changes?: ComponentChanges<T, K>
    ): T {

        const notifiers = this._getNotifiers(componentConstructor, ComponentEvent.ATTACH);
        if(!notifiers) return;

        const component = entity.add(componentConstructor);
        if(!component) return;

        for(let key in changes) component[key.toString()] = changes[key];

        this._notify(notifiers, entity);
        return component;
        
    }

    /**
     * Removing existing component from Entity and notify all subscribers.
     * @param entity - the entity from which the component is being removed.
     * @param componentConstructor - contructor of removing component
     * @param changes - optional: passing data to removed component. Type-safe.
     * @returns - instance of removed component.
     * @example ComponentChangesController.deattach(entity, HealthComponent, {value: 100});
     */
    public static deattach<T extends Object, K extends keyof T>(
        entity: IEntity<any>, 
        componentConstructor: ComponentConstructor<T>, 
        changes?: ComponentChanges<T, K>
    ): T {

        const notifiers = this._getNotifiers(componentConstructor, ComponentEvent.DEATTACH);
        if(!notifiers) return;

        const component = entity.remove(componentConstructor);
        if(!component) return;

        for(let key in changes) component[key.toString()] = changes[key];

        this._notify(notifiers, entity);
        return component;

    }

    /**
     * Changing data in existing component and notify all subscribers.
     * @param entity - the entity from which the component data is being changed.
     * @param componentConstructor - contructor of changing component
     * @param changes - passing data to changed component. Type-safe.
     * @returns - instance of changed component.
     * @example ComponentChangesController.change(entity, HealthComponent, {value: 100});
     */
    public static change<T extends Object, K extends keyof T>(
        entity: IEntity<any>, 
        componentConstructor: ComponentConstructor<T>, 
        changes: ComponentChanges<T, K>
    ): void {

        const notifiers = this._getNotifiers(componentConstructor, ComponentEvent.CHANGE);
        if(!notifiers) return;

        const component = entity.get(componentConstructor);
        if(!component) return;

        for(let key in changes) component[key.toString()] = changes[key];

        this._notify(notifiers, entity);

    }

    /**
     * Subscribe for component changes such as adding, deleting, changing data.
     * @param condition - condition object. You can specify which component to watch in certain entities.
     * @example ComponentChangesController.subscribe({ 
     *  component: HealthComponent,
     *  in: [PlayerComponent],
     *  on: ComponentEvent.CHANGE,
     *  execute: () => {}
     * })
     */
    public static subscribe(condition: ComponentChangesWatcher): void {
        this._notifiers.push(condition);
    }

    /**
     * Unsubscribe for component changes such as adding, deleting, changing data.
     * @param condition - condition object. You can specify which component to watch in certain entities.
     * @example ComponentChangesController.unsubscribe({ 
     *  component: HealthComponent,
     *  in: [PlayerComponent],
     *  on: ComponentEvent.CHANGE,
     *  execute: () => {}
     * })
     */
    public static unsubscribe(condition: ComponentChangesWatcher): void {
        const index = this._notifiers.indexOf(condition);
        if(index === -1) return;
        this._notifiers.splice(index, 1);
    }

    private static _getNotifiers(componentConstructor: ComponentConstructor<any>, type: ComponentEvent): ComponentChangesWatcher[] {
        return this._notifiers.filter(n => n.on === type && n.component === componentConstructor);
    }

    private static _entityHasComponents(entity: IEntity<any>, filter: ComponentConstructor<any>[]): boolean {
        for(let i = 0; i < filter.length; i++) {
            if(!entity.get(filter[i])) return false;
        }

        return true;
    }

    private static _notify(notifiers: ComponentChangesWatcher[], entity: IEntity<any>): void {
        for(let i = 0; i < notifiers.length; i++) {
            if(!this._entityHasComponents(entity, notifiers[i].in)) continue;
            notifiers[i].execute();
        }
    }

}