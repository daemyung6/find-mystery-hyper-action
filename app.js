// pakchunk1001-WindowsNoEditor.pak	2059141	ver001	1001	/Windows/pakchunk1001-WindowsNoEditor.pak
const config = require('./config.js');
const fs = require('fs');

//파일 이름 겟도 하기
fs.readdir(config.rootPath, function(err, list) {
    if(err) {
        console.err(err);
        return;
    }

    console.log(list);

    let count = 0;

    for (let i = 0; i < list.length; i++) {
        getFileInfo(list[i], function() {
            count++;
            console.log(count)
            if(count === list.length) {
                fileInfos.sort(function(a, b) {
                    return Number(a.id) - Number(b.id);
                })
                saveTXT();
            }
        });
    }
});


//파일 정보 겟도 하기
let fileInfos = [];
function getFileInfo(filename, callback) {
    fs.stat(config.rootPath + filename, function(err, info) {
        if(err) {
            console.error(err);
            return;
        }
        console.log(info.size);
        fileInfos.push({
            name: filename,
            size: info.size,
            id: filename.split('-')[0].substring(8)
        });
        callback()
    })
}


//파일 저장 하기
function saveTXT() {
    let txt = `$NUM_ENTRIES = ${fileInfos.length}\n`;
        txt+= '$BUILD_ID = PatchingDemoKey\n';
    for (let i = 0; i < fileInfos.length; i++) {
        txt+= `${fileInfos[i].name}	${fileInfos[i].size}	${config.ver}	${fileInfos[i].id}	${config.rootDirName}${fileInfos[i].name}\n`;
    }
    fs.writeFile(config.savePath, txt, function(err) {
        console.log(err);
    })
}