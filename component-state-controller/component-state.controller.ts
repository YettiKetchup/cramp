import { CrampErrorCode, CrampErrorMessage } from "../type-definitions/errors";
import { IComponent } from "../type-definitions/interfaces";
import { ComponentStateReplacer, Snapshot, SnapshotsData } from "../type-definitions/types";



export default class ComponentStateController {

    private static readonly _snapshots: Map<string, SnapshotsData[]> = new Map();

    public static get snapshots(): Map<string, SnapshotsData[]> {
        return this._snapshots;
    }

    public static Replacer: ComponentStateReplacer = (key: string, value: string) => {
        if(key === 'inCache' || key.indexOf('_') === 0) return undefined;
        return value;
    };

    public static takeSnapshot<TComponent extends IComponent>
        (entityId: string, component: TComponent, snapshotId: string = 'initial'): TComponent 
    {

        let snapshotsData: SnapshotsData[] = this._snapshots.get(entityId);

        if(!snapshotsData) {
            snapshotsData = [{component: component, snapshots: []}];
            this._snapshots.set(entityId, snapshotsData);
        }

        let snapShotDataItem: SnapshotsData = snapshotsData.find(snap => snap.component == component);

        if(!snapShotDataItem) {
            snapShotDataItem = {
                component: component, 
                snapshots: []
            }

            snapshotsData.push(snapShotDataItem);
        }

        let snapshot: Snapshot = snapShotDataItem.snapshots.find(snap => snap.key === snapshotId);

        if(!snapshot) {
            snapshot = { key: null, data: null };
            snapShotDataItem.snapshots.push(snapshot);
        }

        snapshot.key = snapshotId;
        snapshot.data = this._clone(component);

        return component;

    }

    public static setStateBySnapshot<TComponent extends IComponent>
        (entityId: string, component: TComponent, snapshotId: string = 'initial'): TComponent 
    {

        let snapshotsData: SnapshotsData[] = this._snapshots.get(entityId);
        if(!snapshotsData) {
            throw new Error(`${CrampErrorMessage.get(CrampErrorCode.ENTITY_SNAPSHOT_NOT_FOUND)} ${entityId}`);
        }

        let snapShotDataItem: SnapshotsData = snapshotsData.find(snap => snap.component == component);
        if(!snapShotDataItem) {
            throw new Error(`${CrampErrorMessage.get(CrampErrorCode.ENTITY_COMPONENT_SNAPSHOT_NOT_FOUND)} ${entityId} ${component.constructor.name}`);
        }

        let snapshot: Snapshot = snapShotDataItem.snapshots.find(snap => snap.key === snapshotId);
        if(!snapshot) {
            throw new Error(`${CrampErrorMessage.get(CrampErrorCode.SNAPSHOT_ID_NOT_FOUND)} ${snapshotId}`);
        }

        const data: any = this._clone(snapshot.data);

        for(let prop in data) {
            component[prop] = data[prop];
        }

        return component;

    }
    
    private static _clone(component: IComponent) {  
        return JSON.parse(JSON.stringify(component, this.Replacer));
    }

}