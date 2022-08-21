import { PlatformTableColumn } from "./platform-table-column";

export interface PlatformTableRow {
  id: string;
  columns: Array<PlatformTableColumn>;
}
