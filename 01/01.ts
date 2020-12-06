import { getTestData } from "../common/getTestData";
import { compose, filter, includes, reduce } from "ramda";

async function compute() {
    const data = await getTestData("01/input.txt", (el) => parseInt(el, 10));

    const filterFunc = filter<number>((el) => includes(2020 - el, data));
    const multiply = reduce<number, number>((acc, el) => acc * el, 1);
    const getResult = compose<number[], number[], number>(multiply, filterFunc);
    const result = getResult(data);

    console.log(result);
}

compute();
