/*
  компонент для фильтрации таблицы
  props:
  fullData - полные исходные данные
  filtering - функция обновления данных после фильтрации
  resetPage - функция возврата пагинации на первую страницу
*/
const Filter = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const textFilter = {
      'Название': form.structure.value.trim().toLowerCase(),
      'Тип': form.type.value.trim().toLowerCase(),
      'Страна': form.country.value.trim().toLowerCase(),
      'Город': form.city.value.trim().toLowerCase(),
    };

    const numberFilter = {
      'Год': [form.yearFrom.value, form.yearTo.value],
      'Высота': [form.heightFrom.value, form.heightTo.value],
    };

    let filteredData = props.fullData;

    for (const key in textFilter) {
      filteredData = filteredData.filter((item) =>
        String(item[key]).toLowerCase().includes(textFilter[key])
      );
    }

    for (const key in numberFilter) {
      const [minValue, maxValue] = numberFilter[key];

      filteredData = filteredData.filter((item) => {
        const value = Number(item[key]);
        const minOk = minValue === '' || value >= Number(minValue);
        const maxOk = maxValue === '' || value <= Number(maxValue);

        return minOk && maxOk;
      });
    }

    props.filtering(filteredData);
    props.resetPage();
  };

  const handleReset = () => {
    props.filtering(props.fullData);
    props.resetPage();
  };

  return (
    <form className="filter" onSubmit={handleSubmit} onReset={handleReset}>
      <p>
        <label htmlFor="structure">Название:</label>
        <input id="structure" name="structure" type="text" />
      </p>

      <p>
        <label htmlFor="type">Тип:</label>
        <input id="type" name="type" type="text" />
      </p>

      <p>
        <label htmlFor="country">Страна:</label>
        <input id="country" name="country" type="text" />
      </p>

      <p>
        <label htmlFor="city">Город:</label>
        <input id="city" name="city" type="text" />
      </p>

      <p>
        <label htmlFor="yearFrom">Год от:</label>
        <input id="yearFrom" name="yearFrom" type="number" />
      </p>

      <p>
        <label htmlFor="yearTo">Год до:</label>
        <input id="yearTo" name="yearTo" type="number" />
      </p>

      <p>
        <label htmlFor="heightFrom">Высота от:</label>
        <input id="heightFrom" name="heightFrom" type="number" step="0.1" />
      </p>

      <p>
        <label htmlFor="heightTo">Высота до:</label>
        <input id="heightTo" name="heightTo" type="number" step="0.1" />
      </p>

      <p className="buttons">
        <button type="submit">Фильтровать</button>
        <button type="reset">Очистить фильтры</button>
      </p>
    </form>
  );
};

export default Filter;
