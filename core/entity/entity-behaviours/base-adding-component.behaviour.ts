import { CrampErrorCode, CrampErrorMessage } from "../../../type-definitions/errors";
import { IComponent, IEntity, IEntityComponentManipulationBehaviour } from "../../../type-definitions/interfaces";
import { ComponentConstructor } from "../../../type-definitions/types";



export default class BaseAddingComponentBehaviour<TComponent extends IComponent, TEntity extends IEntity<TComponent>> 
    implements IEntityComponentManipulationBehaviour<TComponent, TEntity> {

    public execute<T extends TComponent>(entity: TEntity, componentConstructor: ComponentConstructor<T>): T {
            if(entity.get<TComponent>(componentConstructor)) {
                throw new Error(`${CrampErrorCode} - ${CrampErrorMessage.get(CrampErrorCode.COMPONENT_EXIST)}: ${entity.uuid}`);
            }

            const component = new componentConstructor();
            entity.components.push(component);
            return component as T;
    }

}