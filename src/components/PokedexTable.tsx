// components/PokedexTable.tsx
import React from "react";
import { Table, TableBody, TableContainer, Paper, Button } from "@mui/material";
import PokemonRow from "./PokemonRow";
import { Pokemon } from "@prisma/client";

interface PokedexTableProps {
  pokemonArray: Pokemon[];
}

const PokedexTable: React.FC<PokedexTableProps> = ({ pokemonArray }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {pokemonArray && pokemonArray.map((pokemon, index) => (
            pokemon && <PokemonRow key={index} pokemon={pokemon} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokedexTable;
