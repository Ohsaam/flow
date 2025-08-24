const seperator = '|';
let fixedExtensionList = [];

$(function() {

    $('.checkbox-row').on('change', 'input[type=checkbox]', function() {
        FileHelper.updateExtension(
            this.value,      
            EXTENSION.TYPE.FIXED,         
            this.checked 
        );
    });

    $('#customExtension').on('keyup', function(e) {
        const value = $(this).val().trim();
        if (e.key === 'Enter' && !!value) {  
            e.preventDefault();
            addCustomExtension();
        }
    });

    $('#addCustomBtn').on('click', addCustomExtension);

    $('.custom-items').on('click', '.custom-tag .remove', function() {
        const $tag = $(this).closest('.custom-tag');
        const extension = $tag.data('value');
        
        FileHelper.deleteExtension(extension, EXTENSION.TYPE.CUSTOM)
            .done(function() {
                $tag.remove();
                updateCustomCount();
            })
            .fail(function() {
                alert('확장자 삭제에 실패했습니다.');
            });
    });

    initFixedExtensions();

});

function initFixedExtensions() {
    FileHelper.selectAllExtension().done(function(data) {
        if (!data || data.length === 0)
            return;

        const fixedList = data.filter(it => it.extensionType === EXTENSION.TYPE.FIXED);
        const customList = data.filter(it => it.extensionType === EXTENSION.TYPE.CUSTOM);
        fixedExtensionList = fixedList.map(item => item.extensionName.toLowerCase());

        if (fixedList.length > 0) 
            createFiexedExtension(fixedList);
        if (customList.length > 0) 
            createCustomExtension(customList);
    });
}

function createFiexedExtension(fixedList) {
    const $row = $('.checkbox-row');
    
    fixedList.forEach(function(ext) {
        const id = ext.extensionType + seperator + ext.extensionName;
        const $item = $('<div>', { class: 'checkbox-item' });
        const $input = $('<input>', { 
            type: 'checkbox', 
            id: id, 
            value: ext.extensionName, 
            checked: ext.isChecked === EXTENSION.CHECK.Y
        }); 
        const $label = $('<label>', { for: id, text: ext.extensionName });

        $item.append($input, $label);
        $row.append($item);
    });     
}

function addCustomTag(extension) {
    const $tag = $('<span>', {
        class: 'custom-tag',
        'data-value': extension
    }).text(extension);
    
    const $remove = $('<span>', {
        class: 'remove',
        text: 'X'
    });
    
    $tag.append($remove);
    $('.custom-items').prepend($tag);
    updateCustomCount();
}

function updateCustomCount() {
    const count = $('.custom-items .custom-tag').length;
    $('.count').text(count + '/' + EXTENSION.LIMIT.MAX_COUNT);

    if (count > 0)
        $('.empty-message').hide();
    else
        $('.empty-message').show();
}

function createCustomExtension(customList) {
    customList.forEach(function(ext) {
        addCustomTag(ext.extensionName);
    });
    updateCustomCount();
}

function addCustomExtension() {
    const input = $('#customExtension');
    const extension = input.val().trim();
    
    if (!validationExtension(extension)) {
        return;
    }
    
    const currentCount = $('.custom-items .custom-tag').length;
    if (currentCount >= EXTENSION.LIMIT.MAX_COUNT) {
        alert(`커스텀 확장자는 최대 ${EXTENSION.LIMIT.MAX_COUNT}개까지만 추가할 수 있습니다.`);
        input.val('');
        return;
    }
    
    FileHelper.insertExtension(extension, EXTENSION.TYPE.CUSTOM)
        .done(function() {
            addCustomTag(extension);
            input.val(''); 
            updateCustomCount();
        })
        .fail(function() {
            alert('확장자 추가에 실패했습니다.');
        });
}

function validationExtension(extension) {

    const existingExtensions = $('.custom-items .custom-tag').map(function() {
        return $(this).data('value').toLowerCase();
    }).get();

    const currentCount = $('.custom-items .custom-tag').length;

    if (!extension) {
        alert('확장자를 입력해주세요.');
        return false;
    } else if (fixedExtensionList.includes(extension.toLowerCase())) {
        alert('고정확장자는 추가할 수 없습니다.');
        return false;
    } else if (existingExtensions.includes(extension.toLowerCase())) {
        alert('이미 존재하는 커스텀 확장자입니다.');
        return false;
    } else if (currentCount >= EXTENSION.LIMIT.MAX_COUNT) {
        alert(`커스텀 확장자는 최대 ${EXTENSION.LIMIT.MAX_COUNT}개까지만 추가할 수 있습니다.`);
        return false;
    } else if (/[\s\\/:*?"<>|]/.test(extension)) {
        alert('파일명에 사용할 수 없는 특수문자가 포함되어 있습니다. (\\, /, :, *, ?, ", <, >, |, 공백)');
        return false;
    }

    return true;
}
