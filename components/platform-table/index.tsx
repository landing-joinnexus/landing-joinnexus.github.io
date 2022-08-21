import { PlatformTableColumn } from "./platform-table-column";
import { PlatformTableRow } from "./platform-table-row";
import Styles from "./index.module.css";

interface Props {
  header: Array<string>;
  body: Array<PlatformTableRow>;
  isLoading?: boolean;
}

export type { PlatformTableRow, PlatformTableColumn };

export const PlatformTable = (props: Props) => {
  return (
    <div className={Styles.container}>
      <table>
        <thead>
          <tr>
            {props.header.map(head => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.body.map(rows => (
            <tr key={rows.id}>
              {rows.columns.map(column => (
                <td key={column.id}>{column.content}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
