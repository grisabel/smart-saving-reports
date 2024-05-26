import { PureComponent } from "react";
import { Cell, Pie, PieChart } from "recharts";
import styles from "./CircleGraph.module.scss";

export interface CircleGraphData {
  name: string;
  value: number;
  background: string;
  nameCategory: string;
}

export interface CircleGraphProps {
  data: CircleGraphData[];
  isDots?: boolean;
}

class CircleGraph extends PureComponent<CircleGraphProps> {
  render() {
    let { data, isDots } = this.props;

    if (data.length == 0) {
      data.push({
        name: "empty",
        nameCategory: "empty",
        value: 100,
        background: "#545f70",
      });
      isDots = false;
    }

    return (
      <div className={styles.graphWp}>
        <PieChart width={170} height={170}>
          <Pie
            data={data}
            cx={85}
            cy={85}
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.background} />
            ))}
          </Pie>
        </PieChart>
        <>
          {isDots && (
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
