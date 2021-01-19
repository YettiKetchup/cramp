import { IComponent, IEntity, IEntityComponentManipulationBehaviour } from "../../../type-definitions/interfaces";
import { ComponentConstructor } from "../../../type-definitions/types";



export default class BaseDeletingComponentBehaviour<TComponent extends IComponent, TEntity extends IEntity<TComponent>> 
    implements IEntityComponentManipulationBehaviour<TComponent, TEntity> {

    public execute<T extends TComponent>(entity: TEntity, componentConstructor: ComponentConstructor<T>): T {
        const component = entity.get<TComponent>(componentConstructor);
        if(!component) return null;

        const index: number = entity.components.indexOf(component);
        if(index === -1) return;

        entity.components.splice(index, 1);
        return component as T;
    }

}