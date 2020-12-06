import { readFile } from "fs";

export function getTestData<T>(
    fileName: string,
    mapFunc: (el: string, index: number, array: string[]) => T
): Promise<T[]> {
    const NEW_LINE = "\n";

    return new Promise((resolve, reject) => {
        readFile(fileName, { encoding: "utf-8" }, function (error, data) {
            if (error) {
                return reject(error);
            }
            const mappedData = data
                .split(NEW_LINE)
                .filter((el) => el !== "")
                .map(mapFunc);

            resolve(mappedData);
        });
    });
}
