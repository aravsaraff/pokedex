import React from "react";
import { TableRow, TableCell, Typography, Avatar } from "@mui/material";
import { Pokemon } from "@prisma/client";

interface PokemonRowProps {
  pokemon: Pokemon
}

const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
  const cellStyle: React.CSSProperties = {
    padding: "8px"
  };
  return (
    <TableRow>
      <TableCell style={cellStyle}>{pokemon.id}</TableCell>
      <TableCell style={cellStyle}>{pokemon.name}</TableCell>
      <TableCell style={cellStyle}>{pokemon.types.join(', ')}</TableCell>
      <TableCell>
        <Avatar src={pokemon.sprite} alt={pokemon.name} />
      </TableCell>
    </TableRow>
  );
};

export default PokemonRow;