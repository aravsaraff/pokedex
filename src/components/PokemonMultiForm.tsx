import React, { useState } from "react";
import { Box, TextField, Button, CircularProgress, Typography } from "@mui/material";
import PokedexTable from "../components/PokedexTable";
import { trpc } from "../utils/trpc";

const PokemonNamesForm: React.FC = () => {
  const [pokemonNames, setPokemonNames] = useState<string[]>([""]);

  const sanitizedPokemonNames = pokemonNames.map(name => name.trim());

  const multiplePokemonQuery = trpc.useQuery(["filterByName", { names: sanitizedPokemonNames }], {
		enabled: false
	});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    multiplePokemonQuery.refetch();
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedPokemonNames = [...pokemonNames];
    updatedPokemonNames[index] = value;
    setPokemonNames(updatedPokemonNames);
  };

  const handleAddInput = () => {
    setPokemonNames([...pokemonNames, ""]);
  };

  const style: React.CSSProperties = {
    padding: "5px",
    marginTop: "12px" 
  };

  return (
    <Box my={2}>
      <form onSubmit={handleSubmit}>
        {pokemonNames.map((name, index) => (
          <div key={index}>
            <TextField
              label={`Enter Pokémon Name ${index + 1}`}
              value={name}
              style={style}
              onChange={(e) => handleInputChange(index, e.target.value)}
              variant="outlined"
              fullWidth
            />
          </div>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
        <Button onClick={handleAddInput} variant="contained">
          Add Pokémon
        </Button>
      </form>
      {multiplePokemonQuery.isLoading && <CircularProgress />}
      {multiplePokemonQuery.isError && <Typography color="error">Error fetching Pokemon data</Typography>}
      {multiplePokemonQuery.data && <PokedexTable pokemonArray={multiplePokemonQuery.data} />}
    </Box>
  );
};

export default PokemonNamesForm;
