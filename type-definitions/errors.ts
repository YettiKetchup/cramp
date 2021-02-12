enum CrampErrorCode {
    COMPONENT_EXIST = 100,
    COMPONENT_NOT_FOUND_IN_CACHE = 101,

    ENTITY_SNAPSHOT_NOT_FOUND = 2000,
    ENTITY_COMPONENT_SNAPSHOT_NOT_FOUND = 2001,
    SNAPSHOT_ID_NOT_FOUND = 2002,
}

const CrampErrorMessage: Map<CrampErrorCode, string> = new Map();
CrampErrorMessage.set(CrampErrorCode.COMPONENT_EXIST, 'Component alredy exist in Entity: ');
CrampErrorMessage.set(CrampErrorCode.COMPONENT_NOT_FOUND_IN_CACHE, 'Can\'t find Component in cache!');
CrampErrorMessage.set(CrampErrorCode.ENTITY_SNAPSHOT_NOT_FOUND, 'Any snapshots not found for Entity: ');
CrampErrorMessage.set(CrampErrorCode.ENTITY_COMPONENT_SNAPSHOT_NOT_FOUND, 'Any snapshots not found for Component in Entity: ');
CrampErrorMessage.set(CrampErrorCode.SNAPSHOT_ID_NOT_FOUND, 'Snapshot not found! Snapshot id: ');



export {CrampErrorCode, CrampErrorMessage};