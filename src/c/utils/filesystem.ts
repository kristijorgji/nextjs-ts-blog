import fs from 'fs';

type FileInfo = {
    name: string;
    fullPath: string;
};

export function walkDirFilesSync(dir: string, extension: string | null = null) {
    dir = normalizeDirName(dir);
    const files = fs.readdirSync(dir);
    const extPattern = new RegExp('.*.' + extension + '$', 'i');
    const fileList: FileInfo[] = [];

    files.forEach(function (file) {
        if (!fs.statSync(dir + file).isDirectory()) {
            if (extension === null || extPattern.test(file)) {
                fileList.push({
                    name: file,
                    fullPath: dir + file,
                });
            }
        }
    });

    return fileList;
}

export function walkDirFilesSyncRecursive(
    dir: string,
    fileList: FileInfo[] = [],
    extension: string | null = null
): FileInfo[] {
    dir = normalizeDirName(dir);
    const files = fs.readdirSync(dir);
    const extPattern = new RegExp('.*.' + extension + '$', 'i');

    files.forEach(function (file) {
        if (fs.statSync(dir + file).isDirectory()) {
            fileList.concat(walkDirFilesSyncRecursive(dir + file + '/', fileList, extension));
        } else {
            if (extension === null || extPattern.test(file)) {
                fileList.push({
                    name: file,
                    fullPath: dir + file,
                });
            }
        }
    });

    return fileList;
}

function normalizeDirName(dir: string) {
    const lastChar = dir.substr(-1);
    if (lastChar !== '/') {
        dir = dir + '/';
    }

    return dir;
}
