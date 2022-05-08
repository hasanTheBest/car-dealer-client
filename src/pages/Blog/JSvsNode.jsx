import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import CustomTable from "../../components/CustomTable";

const rows = [
  {
    item1:
      "Javascript is a programming language running any web browser with proper browser engine",
    item2:
      "NodeJS is an interpreter environment for javaScript with some specific libraries",
  },
  {
    item1:
      "It running any engine like Spider Monkey(firefox), Javascript Core(safari), V8(chrome)",
    item2:
      "It only runs in V8 engine which is crated by Google and mainly used by Chrome",
  },
  {
    item1: "Mainly used for client side activity for web application",
    item2:
      "Mainly used for backend job, accessing or preforming of any non-blocking operation of any operating system",
  },
  {
    item1:
      "It is widely used for manipulating HTML DOM, validating client side form, refreshing page within specific interval or providing some dynamic changes in web pages without refreshing the entire page.",
    item2:
      "It is widely used for performing server-side task like inserting, updating, deleting data to database, accessing hardware related information, executing Shell command. ",
  },
  {
    item1:
      "Some of the javascript frameworks/libraries are React, Angular, Vue, Svelte, RamdaJS, TypedJS, etc",
    item2:
      "Some of the Nodejs modules are Lodash, express etc. These modules are to be imported from npm.",
  },
];

const JSvsNode = () => {
  return (
    <Box p={2}>
      <Typography variant="h6" mb={3}>
        1. Difference Between JS and Node
      </Typography>

      <CustomTable data={rows} item1="JavaScript" item2="NodeJS" />
    </Box>
  );
};

export default JSvsNode;
