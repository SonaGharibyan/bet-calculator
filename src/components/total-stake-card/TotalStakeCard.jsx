import React, { useCallback, useMemo } from "react";
import { Card, InputNumber, Table } from "antd";
import { State } from "../../types/state";

function TotalStakeCard({ items, setItems, amount, setAmount }) {
  const onItemChange = useCallback(
    (id, key, value) => {
      const newItems = items.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );

      setItems(newItems);
    },
    [items, setItems]
  );

  const columns = useMemo(
    () => [
      {
        dataIndex: "name",
      },
      {
        title: "Odds",
        dataIndex: "odds",
        align: "center",
        render: (value, _, id) => {
          return (
            <InputNumber
              value={value}
              onChange={(value) => onItemChange(id, "odds", value)}
            />
          );
        },
      },
      {
        title: "Correct",
        dataIndex: "state",
        align: "center",
        render: (value, _, id) => {
          return (
            <input
              type={"radio"}
              checked={value === State.CORRECT}
              onChange={() => onItemChange(id, "state", State.CORRECT)}
            />
          );
        },
      },
      {
        title: "Incorrect",
        dataIndex: "state",
        align: "center",
        render: (value, _, id) => {
          return (
            <input
              type={"radio"}
              checked={value === State.INCORRECT}
              onChange={() => onItemChange(id, "state", State.INCORRECT)}
            />
          );
        },
      },
      {
        title: "Void",
        dataIndex: "state",
        align: "center",
        render: (value, _, id) => {
          return (
            <input
              type={"radio"}
              checked={value === State.VOID}
              onChange={() => onItemChange(id, "state", State.VOID)}
            />
          );
        },
      },
    ],
    [onItemChange]
  );

  const renderExtra = () => {
    return <InputNumber prefix={"$"} value={amount} onChange={setAmount} />;
  };

  return (
    <Card style={{ width: 700 }} title={"Total Stake"} extra={renderExtra()}>
      <Table columns={columns} dataSource={items} pagination={false} />
    </Card>
  );
}

export { TotalStakeCard };
