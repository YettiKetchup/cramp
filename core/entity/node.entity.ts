import { IComponent, IEntity, IEntityBehaviour, INodeEntity } from "../../type-definitions/interfaces";
import BaseEntity from "./base.entity";



export default class NodeEntity<TComponent extends IComponent, TNode extends Object> 
    extends BaseEntity<TComponent>
    implements INodeEntity<TComponent, TNode>,
    IEntityBehaviour<TComponent, IEntity<TComponent>>
{
    
    private _node: TNode;

    public get node(): TNode { return this._node; }
    public set node(value: TNode) { this._node = value; }

}