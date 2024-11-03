import React, { useEffect, useState } from "react";
import { Card, Form, Select } from "antd";
import { ResultsCard } from "./components/results-card/ResultsCard";
import { TotalStakeCard } from "./components/total-stake-card/TotalStakeCard";
import { State } from "./types/state";
import "./App.css";

const options = [
  {
    label: "2 from 3",
    value: "2-3",
  },
  {
    label: "2 from 4",
    value: "2-4",
  },
  {
    label: "3 from 4",
    value: "3-4",
  },
  {
    label: "2 from 5",
    value: "2-5",
  },
  {
    label: "3 from 5",
    value: "3-5",
  },
];

const values = {
  "2-3": { items: 3, wins: 2 },
  "2-4": { items: 4, wins: 2 },
  "3-4": { items: 4, wins: 3 },
  "2-5": { items: 5, wins: 2 },
  "3-5": { items: 5, wins: 3 },
};


function App() {
  const [selectedSystem, setSelectedSystem] = useState("2-3");
  const [amount, setAmount] = useState(100);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsLength = values[selectedSystem]?.items ?? 0;
    const items = Array.from({ length: itemsLength }, (_, index) => ({
      id: index,
      name: index + 1,
      odds: 2,
      state: State.CORRECT,
    }));

    setItems(items);
  }, [selectedSystem]);

  return (
    <>
      <Card style={{ width: 300 }}>
        <Form.Item label={"System"}>
          <Select
            value={selectedSystem}
            options={options}
            onChange={setSelectedSystem}
          />
        </Form.Item>
      </Card>

      <TotalStakeCard
        items={items}
        setItems={setItems}
        amount={amount}
        setAmount={setAmount}
      />

      <ResultsCard
        items={items}
        system={values[selectedSystem]}
        amount={amount}
      />
    </>
  );
}

export default App;
