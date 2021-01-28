import { ComponentEvent } from "./component-event.enum";
import { IComponent, IEntity, ISystem } from "./interfaces";



export type ComponentConstructor<T extends IComponent> = new (...args: any[]) => T;
export type SystemConstructor = new () => ISystem<any, IEntity<any>>;

export type ComponentFilter = {
  include: ComponentConstructor<any>[],
  exclude?: ComponentConstructor<any>[]
}

export type ComponentChangesWatcher = {
  component: ComponentConstructor<any>,
  on: ComponentEvent,
  in: ComponentConstructor<any>[],
  execute: () => void
}