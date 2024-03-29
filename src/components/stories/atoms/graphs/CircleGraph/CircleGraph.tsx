import React, { PureComponent } from "react";
import { Cell, Pie, PieChart } from "recharts";
import styles from "./CircleGraph.module.scss";

interface Data {
  name: string;
  value: number;
  background: string;
  nameCategory: string;
}

interface CircleGraphProps {
  data: Data[];
  isDots?: boolean;
}

class CircleGraph extends PureComponent<CircleGraphProps> {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.graphWp}>
        <PieChart width={320} height={320}>
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.background} />
            ))}
          </Pie>
        </PieChart>
        <>
          {this.props.isDots && (
            <div className={styles.info}>
              {data.map(
                (entry, index) =>
                  entry.value > 0 && (
                    <div key={`info-${index}`} className={styles.infoCategory}>
                      <div
                        className={styles.dot}
                        style={{ background: entry.background }}
                      ></div>
                      <p className={styles.category}>{entry.nameCategory}</p>
                    </div>
                  )
              )}
            </div>
          )}
        </>
      </div>
    );
  }
}

export default CircleGraph;
