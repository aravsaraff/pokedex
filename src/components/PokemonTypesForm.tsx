import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface PokemonFormProps {
  onSubmit: (pokemonTypes: string[]) => void;
}

const PokemonTypesForm: React.FC<PokemonFormProps> = ({ onSubmit }) => {
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([""]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(pokemonTypes.filter(type => type.trim() !== ""));
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedPokemonNames = [...pokemonTypes];
    updatedPokemonNames[index] = value;
    setPokemonTypes(updatedPokemonNames);
  };

  const handleAddInput = () => {
    setPokemonTypes([...pokemonTypes, ""]);
  };

  const style: React.CSSProperties = {
    padding: "5px",
    marginTop: "12px" 
  };

  return (
    <form onSubmit={handleSubmit}>
      {pokemonTypes.map((type, index) => (
        <div key={index}>
          <TextField
            label={`Enter Pokémon Type ${index + 1}`}
            value={type}
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
        Add Type
      </Button>
    </form>
  );
};

export default PokemonTypesForm;
