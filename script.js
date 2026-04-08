const txt1 = `Не жалею, не зову, не плачу,
Всё пройдет, как с белых яблонь дым.
Увяданья золотом охваченный,
Я не буду больше молодым.
Ты теперь не так уж будешь биться,
Сердце, тронутое холодком,
И страна берёзового ситца
Не заманит шляться босиком.
Дух бродяжий! ты все реже, реже
Расшевеливаешь пламень уст
О моя утраченная свежесть,
Буйство глаз и половодье чувств.`

const txt2 = `Буря мглою небо кроет,
Вихри снежные крутя;
То, как зверь, она завоет,
То заплачет, как дитя,
То по кровле обветшалой
Вдруг соломой зашумит,
То, как путник запоздалый,
К нам в окошко застучит.
Наша ветхая лачужка
И печальна, и темна.
Что же ты, моя старушка,
Приумолкла у окна?
Или бури завываньем
Ты, мой друг, утомлена,
Или дремлешь под жужжаньем
Своего веретена?`

const txt3 = `Мой дядя самых честных правил,
Когда не в шутку занемог,
Он уважать себя заставил
И лучше выдумать не мог.
Его пример другим наука;
Но, боже мой, какая скука
С больным сидеть и день и ночь,
Не отходя ни шагу прочь!
Какое низкое коварство
Полуживого забавлять,
Ему подушки поправлять,
Печально подносить лекарство,
Вздыхать и думать про себя:
Когда же чёрт возьмёт тебя!`


function buildCyrillicMatrix(text) {
  const SIZE = 10;

  // Russian alphabet (lowercase)
  const alphabet = Array.from("абвгдеёжзийклмнопрстуфхцчшщъыьэюя");

  // 1. Split into lines and clean (keep only Cyrillic letters)
  const lines = text.split('\n').map(line =>
    (line.match(/[а-яё]/gi) || []).join('').toLowerCase()
  );

  // 2. Fill matrix row by row
  const matrix = [];
  for (let i = 0; i < SIZE; i++) {
    let row = (lines[i] || '').slice(0, SIZE).split('');

    // pad row if shorter than 10
    while (row.length < SIZE) {
      row.push('');
    }

    matrix.push(row);
  }

  // 3. Collect used letters
  const used = new Set();
  matrix.forEach(row => {
    row.forEach(char => {
      if (char) used.add(char);
    });
  });

  // 4. Find missing letters
  const missing = alphabet.filter(letter => !used.has(letter));

  // 5. Insert missing letters into last row (shift right)
  const lastRow = matrix[SIZE - 1];

  missing.forEach(letter => {
    lastRow.pop();           // remove last element
    lastRow.unshift(letter); // insert at beginning
  });

  return matrix;
}

const positions = [73, 40, 82, 73, 11, 65, 47, 41, 24, 73, 79, 36, 21, 20, 56, 66, 60, 99, 69, 73, 97, 11, 87, 36, 42, 63, 77, 96, 73, 61, 35, 29, 97, 11, 80, 11, 58, 68, 73, 23, 39, 48, 24, 87, 48, 22, 34, 26, 73, 64, 60, 40, 61, 77]

function extractFromMatrix(matrix) {
  return positions.map(pos => {
    // Ensure it's a string so we can safely split digits
    const str = String(pos).padStart(2, '0');

    const row = Number(str[0]);
    const col = Number(str[1]);

    return matrix[row]?.[col] || '';
  }).join('');
}

console.log(extractFromMatrix(buildCyrillicMatrix(txt1)))
console.log(extractFromMatrix(buildCyrillicMatrix(txt2)))
console.log(extractFromMatrix(buildCyrillicMatrix(txt3)))