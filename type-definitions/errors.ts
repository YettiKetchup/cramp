enum CrampErrorCode {
    COMPONENT_EXIST = '100',
    COMPONENT_NOT_FOUND_IN_CACHE = '101'
}

const CrampErrorMessage: Map<CrampErrorCode, string> = new Map();
CrampErrorMessage.set(CrampErrorCode.COMPONENT_EXIST, 'Component alredy exist in Entity: ');
CrampErrorMessage.set(CrampErrorCode.COMPONENT_NOT_FOUND_IN_CACHE, 'Can\'t find Component in cache!');



export {CrampErrorCode, CrampErrorMessage};