import CircularProgress from "@mui/material/CircularProgress";
import { Loading } from "./styled";

export default function CircularIndeterminate() {
  return (
    <Loading sx={{ display: "flex" }}>
      <CircularProgress />
    </Loading>
  );
}
