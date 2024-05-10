import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface PokemonFormProps {
  onSubmit: (pokemonNames: string[]) => void;
}

const PokemonNamesForm: React.FC<PokemonFormProps> = ({ onSubmit }) => {
  const [pokemonNames, setPokemonNames] = useState<string[]>([""]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(pokemonNames.filter(name => name.trim() !== ""));
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
  );
};

export default PokemonNamesForm;
