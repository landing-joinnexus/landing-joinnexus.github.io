import { TableCell, TableRow } from "@mui/material";
import { tableRowStyle } from "styles/table-row-style";

const RenderOption = (options: Record<string, Array<{ username: string }>>) => (option: string) => {
  const players = options[option].map(o => o.username).join(', ');
  return (
    <TableRow key={option} sx={tableRowStyle}>
      <TableCell component="th" scope="row">
        {option}
      </TableCell>
      <TableCell align="left">{players}</TableCell>
    </TableRow>
  );
};

export default RenderOption;
