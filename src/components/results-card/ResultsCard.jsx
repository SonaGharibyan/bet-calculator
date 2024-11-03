import { Card, Table } from "antd";
import React, { useMemo } from "react";
import { State } from "../../types/state";
import { getUniqueCombinations } from "../../utils/combinations";

const ResultsCard = ({ items, system, amount }) => {
  const getData = () => {
    const combinations = getUniqueCombinations(items, system.wins);
    const data = combinations.map((combination, index) => {
      const oddsSum = combination.reduce((c1, c2) => {
        switch (c2.state) {
          case State.CORRECT:
            return c1 * c2.odds;
          case State.INCORRECT:
            return 0;
          case State.VOID:
          default:
            return c1;
        }
      }, 1);
      const odds = oddsSum < 0 ? 0 : oddsSum;
      const winning = (amount / combinations.length) * odds;

      return {
        name: index + 1,
        combination,
        odds,
        winning,
      };
    });

    return data;
  };

  const columns = useMemo(
    () => [
      {
        dataIndex: "name",
      },
      {
        title: "Combinations",
        key: "combinations",
        children: Array.from({ length: system.wins }, (_, index) => ({
          title: index + 1,
          align: "center",
          render: (_, data) => {
            return data.combination[index].odds;
          },
        })),
      },
      {
        title: "Odds",
        dataIndex: "odds",
        align: "center",
      },
      {
        title: "Winning",
        dataIndex: "winning",
        align: "center",
      },
    ],
    [system.wins]
  );

  return (
    <Card style={{ width: 700 }} title={"System Bets Calculator"}>
      <Table columns={columns} dataSource={getData()} pagination={false} />
    </Card>
  );
};

export { ResultsCard };
