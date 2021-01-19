enum CrampErrorCode {
    COMPONENT_EXIST = '100'
}

const CrampErrorMessage: Map<CrampErrorCode, string> = new Map();
CrampErrorMessage.set(CrampErrorCode.COMPONENT_EXIST, 'Component alredy exist in Entity: ');



export {CrampErrorCode, CrampErrorMessage};