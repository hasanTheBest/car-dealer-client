import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CustomTBody = ({ data }) => {
  return (
    <TableBody>
      {data.map(({ item1, item2 }, i) => (
        <TableRow
          key={i}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {i + 1}
          </TableCell>
          <TableCell>{item1}</TableCell>
          <TableCell>{item2}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

const CustomTable = ({ data, item1, item2 }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SN</TableCell>
            <TableCell align="center">{item1}</TableCell>
            <TableCell align="center">{item2}</TableCell>
          </TableRow>
        </TableHead>
        <CustomTBody data={data} />
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
