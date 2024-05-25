// components/PokedexTable.tsx
import React from "react";
import { Box, Pagination, Table, TableBody, TableContainer, Paper, Button } from "@mui/material";
import PokemonRow from "./PokemonRow";
import { Pokemon } from "@prisma/client";
import { useState } from 'react';

interface PokedexTablePaginatedProps {
  pokemonArray: Pokemon[],
  total: number,
  page: number,
  limit: number,
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void 
}

const PokedexTablePaginated: React.FC<PokedexTablePaginatedProps> = ({ pokemonArray, total, page, limit, handlePageChange }) => {
  
  return (
    <Box>
      {pokemonArray && (
        <>
          <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {pokemonArray.map((pokemon, index) => (
                pokemon && <PokemonRow key={index} pokemon={pokemon} />
              ))}
            </TableBody>
          </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(total / limit)}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 2 }}
          />
        </>
      )}
    </Box>
  );
};

export default PokedexTablePaginated;
