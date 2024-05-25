// components/PokemonForm.tsx
import React, { useState } from "react";
import PokemonRow from "../components/PokemonRow";
import { trpc } from "../utils/trpc";
import { Box, TextField, Button, Table, TableBody, TableContainer, Paper, Typography, CircularProgress } from "@mui/material";

const PokemonForm: React.FC = () => {
  const [pokemonName, setPokemonName] = useState("");

  const sanitizedPokemonName = pokemonName.trim();

  const singlePokemonQuery = trpc.useQuery(["get", { name: sanitizedPokemonName }], {
		enabled: false
	});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    singlePokemonQuery.refetch();
  };
  
  const style: React.CSSProperties = {
    padding: "5px",
    marginTop: "12px" 
  };

  return (
    <Box my={2}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Single Pokémon Name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          variant="outlined"
          style={style}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {singlePokemonQuery.isLoading && <CircularProgress />}
            {singlePokemonQuery.isError && <Typography color="error">Error fetching Pokemon data</Typography>}
            {singlePokemonQuery.data && <PokemonRow pokemon={singlePokemonQuery.data!} />}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PokemonForm;
