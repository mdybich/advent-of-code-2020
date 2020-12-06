import { getTestData } from "../common/getTestData";

interface PasswordDataWithProperPolicy {
    firstPosition: number;
    secondPosition: number;
    letter: string;
    password: string;
}

function parser(row: string): PasswordDataWithProperPolicy {
    const [firstPosition, restWithoutMin] = row.split("-");
    const [secondPosition, [letter], password] = restWithoutMin.split(" ");

    return {
        firstPosition: parseInt(firstPosition, 10),
        secondPosition: parseInt(secondPosition, 10),
        letter,
        password,
    };
}

async function compute() {
    const data = await getTestData("02/input.txt", parser);

    const validPasswords = data.filter(
        ({ letter, firstPosition, secondPosition, password }) => {
            const hasLetterInFirstPosition =
                password[firstPosition - 1] === letter;
            const hasLetterInSecondPosition =
                password[secondPosition - 1] === letter;

            return hasLetterInFirstPosition !== hasLetterInSecondPosition;
        }
    );

    console.log(validPasswords.length);
}

compute();
