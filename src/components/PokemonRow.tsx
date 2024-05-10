import React from "react";
import { TableRow, TableCell, Typography, Avatar } from "@mui/material";

interface PokemonRowProps {
  pokemon: {
    id: number;
    name: string;
    type: string;
    sprite: string;
  };
}

const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
  const cellStyle: React.CSSProperties = {
    padding: "8px", // Apply padding to all cells
  };
  return (
    <TableRow>
      <TableCell style={cellStyle}>{pokemon.id}</TableCell>
      <TableCell style={cellStyle}>{pokemon.name}</TableCell>
      <TableCell style={cellStyle}>{pokemon.type}</TableCell>
      <TableCell>
        <Avatar src={pokemon.sprite} alt={pokemon.name} />
      </TableCell>
    </TableRow>
  );
};

export default PokemonRow;