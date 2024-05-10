// components/PokedexTable.tsx
import React from "react";
import { Table, TableBody, TableContainer, Paper, Button } from "@mui/material";
import PokemonRow from "./PokemonRow";

interface PokedexTableProps {
  pokemonArray: {
    id: number;
    name: string;
    type: string;
    sprite: string;
  }[];
}

const PokedexTable: React.FC<PokedexTableProps> = ({ pokemonArray }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {pokemonArray.map((pokemon, index) => (
            <PokemonRow key={index} pokemon={pokemon} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokedexTable;
