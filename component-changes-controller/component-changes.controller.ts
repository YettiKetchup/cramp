import { ComponentEvent } from "../type-definitions/component-event.enum";
import { IEntity } from "../type-definitions/interfaces";
import { ComponentChangesWatcher, ComponentConstructor } from "../type-definitions/types";



type ComponentChanges<T, K extends keyof T> = { [P in K]: T[K] };

export default class ComponentChangesController {

    private static _notifiers: ComponentChangesWatcher[] = [];

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

    public static deattach<T extends Object, K extends keyof T>(
        entity: IEntity<any>, 
        componentConstructor: ComponentConstructor<T>, 
        changes?: ComponentChanges<T, K>
    ): T {

        const notifiers = this._getNotifiers(componentConstructor, ComponentEvent.ATTACH);
        if(!notifiers) return;

        const component = entity.remove(componentConstructor);
        if(!component) return;

        for(let key in changes) component[key.toString()] = changes[key];

        this._notify(notifiers, entity);
        return component;

    }

    public static change<T extends Object, K extends keyof T>(
        entity: IEntity<any>, 
        componentConstructor: ComponentConstructor<T>, 
        changes?: ComponentChanges<T, K>
    ): void {

        const notifiers = this._getNotifiers(componentConstructor, ComponentEvent.CHANGE);
        if(!notifiers) return;

        const component = entity.get(componentConstructor);
        if(!component) return;

        for(let key in changes) component[key.toString()] = changes[key];

        this._notify(notifiers, entity);

    }

    public static subscribe(condition: ComponentChangesWatcher): void {
        this._notifiers.push(condition);
    }

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