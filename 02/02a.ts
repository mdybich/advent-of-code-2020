import { getTestData } from "../common/getTestData";

interface PasswordData {
    min: number;
    max: number;
    letter: string;
    password: string;
}

function parser(row: string): PasswordData {
    const [min, restWithoutMin] = row.split("-");
    const [max, [letter], password] = restWithoutMin.split(" ");

    return {
        min: parseInt(min, 10),
        max: parseInt(max, 10),
        letter,
        password,
    };
}

async function compute() {
    const data = await getTestData("02/input.txt", parser);

    const validPasswords = data.filter(({ letter, min, max, password }) => {
        const matchedLetters = password.match(new RegExp(letter, "gi"));

        if (matchedLetters === null) {
            return false;
        }

        return matchedLetters.length >= min && matchedLetters.length <= max;
    });

    console.log(validPasswords.length);
}

compute();
