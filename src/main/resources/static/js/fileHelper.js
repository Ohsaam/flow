const BASE_URL = '/api/file-extensions';   
const EXTENSION = {
    TYPE: {
        FIXED: 'FIXED',
        CUSTOM: 'CUSTOM'
    },
    CHECK: {
        Y: 'Y',
        N: 'N'
    },
    LIMIT: {
        MAX_COUNT: 200
    }
};


const FileHelper = {
    
    // 전체 조회
    selectAllExtension: function() {
        return $.ajax({
            url: BASE_URL,
            method: 'GET',
            dataType: 'json'
        });
    },

    // 추가
    insertExtension: function(extName, extType, isChecked) {
        return $.ajax({
            url: BASE_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                extensionName: extName,
                extensionType: extType,
                isChecked: EXTENSION.CHECK.Y
            })
        });
    },

    // 수정 
    updateExtension: function(extName, extType, isChecked) {
        return $.ajax({
            url: BASE_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                extensionName: extName,
                extensionType: extType,
                isChecked: isChecked ? EXTENSION.CHECK.Y : EXTENSION.CHECK.N
            })
        });
    },

    // 삭제
    deleteExtension: function(extName, extType) {
        return $.ajax({
            url: BASE_URL,
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({
                extensionName: extName,
                extensionType: extType
            })
        });
    }
};
