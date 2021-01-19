import { IComponent, IEntity, IEntityBehaviour, INodeEntity } from "../../type-definitions/interfaces";
import BaseEntity from "./base.entity";


/**
 * implementation of Entity, storing components and give access to them.
 * Use this class with game-engines such as CocosCreator, PlayCanvas, etc.
 */
export default class NodeEntity<TComponent extends IComponent, TNode extends Object> 
    extends BaseEntity<TComponent>
    implements INodeEntity<TComponent, TNode>,
    IEntityBehaviour<TComponent, IEntity<TComponent>>
{
    
    private _node: TNode;

    /**
     * Link to Node object. If you use some game engine such as CocosCreator or Playcanvas,
     * you need to pass Node to this property.
     */
    public get node(): TNode { return this._node; }
    public set node(value: TNode) { this._node = value; }

}