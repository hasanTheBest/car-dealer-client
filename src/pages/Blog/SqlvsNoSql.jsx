import { Box, Typography } from "@mui/material";
import React from "react";
import CustomTable from "../../components/CustomTable";

const rows = [
  {
    item1:
      "Tables with fixed rows and columns and RDBMS or relational Database model",
    item2:
      "Document: JSON documents, Key-value: key-value pairs, Wide-column: tables with rows and dynamic columns, Graph: nodes and edges, not relational Database",
  },
  {
    item1: "Developed in the 1970s with a focus on reducing data duplication",
    item2:
      "Developed in the late 2000s with a focus on scaling and allowing for rapid application change driven by agile and DevOps practices.",
  },
  {
    item1: "Examples are Oracle, MySQL, Microsoft SQL Server, and PostgreSQL",
    item2:
      "Examples are Document: MongoDB and CouchDB, Key-value: Redis and DynamoDB, Wide-column: Cassandra and HBase, Graph: Neo4j and Amazon Neptune",
  },
  {
    item1: "Flexible for vertical (scale-up with a larger server)",
    item2: "Suitable for horizontal (scale-out across commodity servers)",
  },
  {
    item1:
      "Need to follow predefined schema and Structured Query Language(SQL) for data manipulation",
    item2:
      "There are no predefined schema or predefined language to operate database",
  },
  {
    item1:
      "An ideal choice for the complex query intensive environment and hierarchical data.",
    item2:
      "It is not good fit complex queries and best fit for hierarchical database",
  },
];

const SqlvsNoSql = () => {
  return (
    <Box p={2}>
      <Typography variant="h6" mb={3}>
        3. Difference Between SQL and NoSQL
      </Typography>

      <CustomTable data={rows} item1="SQL" item2="NoSQL" />
    </Box>
  );
};

export default SqlvsNoSql;
