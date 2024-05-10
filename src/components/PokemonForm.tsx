// components/PokemonForm.tsx
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface PokemonFormProps {
  onSubmit: (pokemonName: string) => void;
}

const PokemonForm: React.FC<PokemonFormProps> = ({ onSubmit }) => {
  const [pokemonName, setPokemonName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(pokemonName);
  };
  
  const style: React.CSSProperties = {
    padding: "5px",
    marginTop: "12px" 
  };

  return (
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
  );
};

export default PokemonForm;
