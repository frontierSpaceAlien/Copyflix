import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function Media(props) {
  const { loading = false } = props;
  const [loaded, setLoading] = React.useState(false);

  return (
    <Grid container wrap="nowrap">
      {!loaded &&
        Array.from(new Array(7)).map((item, index) => (
          <Box key={index} sx={{ width: "100%", my: 0, padding: "1%" }}>
            <Skeleton
              sx={{
                bgcolor: "grey.900",
                paddingBottom: "90%",
                paddingTop: "50%",
              }}
              width={"100%"}
              variant="rectangular"
            />
          </Box>
        ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function TVShows() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media loading />
      <Media />
    </Box>
  );
}
