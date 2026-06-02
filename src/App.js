import "./App.css";
import Chart from "./components/Chart";
import Table from "./components/Table";
import buildings from "./buildings";

function App() {
  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>

      <Chart data={buildings} />

      <Table data={buildings} amountRows={100} />
    </div>
  );
}

export default App;