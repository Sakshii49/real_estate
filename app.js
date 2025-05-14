import React, { useState } from 'react';
import axios from 'axios';
import ChatBox from './components/ChatBox';
import ChartComponent from './components/ChartComponent';
import DataTable from './components/DataTable';

function App() {
  const [summary, setSummary] = useState('');
  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const handleQuery = async (query) => {
    try {
      const response = await axios.post('http://localhost:8000/analyze/', {
        query: query,
      });

      setSummary(response.data.summary);
      setChartData(response.data.chart);
      setTableData(response.data.table);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Real Estate Chatbot</h1>
      <ChatBox onSubmit={handleQuery} />
      {summary && <p><strong>Summary:</strong> {summary}</p>}
      {chartData && <ChartComponent data={chartData} />}
      {tableData.length > 0 && <DataTable data={tableData} />}
    </div>
  );
}

export default App;
