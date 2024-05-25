import React, { useState } from "react";
import { Container, Box, Table, TableBody, TableContainer, Paper, Button, Typography, CircularProgress, TextField } from "@mui/material";
import PokemonForm from "../components/PokemonForm";
import PokedexTable from "../components/PokedexTable";
import PokedexTablePaginated from "../components/PokedexTablePaginated";
import PokemonMultiForm from "../components/PokemonMultiForm";
import FilterablePokedexTable from "../components/FilterablePokedexTable";
import { trpc } from "../utils/trpc";

const IndexPage: React.FC = () => {
	const [page, setPage] = useState(1);
	const limit = 3;

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const {data: allPokemons, isError, isLoading} = trpc.useQuery(["getAll", {page, limit}], {
		keepPreviousData: true
	});


	return (
		<Container>
			<Typography variant="h2" gutterBottom>
				Pokedex
			</Typography>
			{allPokemons && <PokedexTablePaginated 
				pokemonArray={allPokemons.pokemons}
				total={allPokemons.total} 
				page={page} 
				limit={limit} 
				handlePageChange={handlePageChange}
			/>}
			<PokemonForm />
			<PokemonMultiForm />
			<FilterablePokedexTable />
		</Container>
	);
};

export default IndexPage;
