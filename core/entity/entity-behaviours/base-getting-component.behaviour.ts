import { IComponent, IEntity, IEntityComponentManipulationBehaviour } from "../../../type-definitions/interfaces";
import { ComponentConstructor } from "../../../type-definitions/types";



export default class BaseGettingComponentBehaviour<TComponent extends IComponent, TEntity extends IEntity<TComponent>> 
    implements IEntityComponentManipulationBehaviour<TComponent, TEntity> {

    public execute<T extends TComponent>(entity: TEntity, componentConstructor: ComponentConstructor<T>): T {
        return entity.components.find(c => c instanceof componentConstructor) as T;
    }
}