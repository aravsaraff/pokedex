import React, { useState } from "react";
import { Container, Box, Table, TableBody, TableContainer, Paper, Button, Typography, CircularProgress, TextField } from "@mui/material";
import PokemonForm from "../components/PokemonForm";
import PokedexTable from "../components/PokedexTable";
import PokedexTablePaginated from "../components/PokedexTablePaginated";
import PokemonMultiForm from "../components/PokemonMultiForm";
import FilterablePokedexTable from "../components/FilterablePokedexTable";
import { trpc } from "../utils/trpc";

const IndexPage: React.FC = () => {
	const [allPokemonArray, setAllPokemonArray] = useState<any[]>([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState<number>(0);
	const limit = 3;

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const {data: allPokemons, isError, isLoading} = trpc.useQuery(["getAll", {page, limit}], {
		keepPreviousData: true
	});

	const createSampleRecordsMutation = trpc.useMutation(["createSample"]);

	// const handleGetAllPokemon = async () => {
	// 	try {
	// 	  // Call the query to get all Pokémon records
	// 	  const { data, error, isLoading } = await getAllPokemonQuery.refetch();
	// 	  data?.pokemons && setAllPokemonArray(data.pokemons || []);
	// 	  data?.total && setTotal(data.total);
	// 	} catch (error) {
	// 	  console.error("Failed to get all Pokémon records:", error);
	// 	}
	//   };

	const handleCreateSampleRecords = async () => {
		try {
		  // Call the mutation to create sample records
		  await createSampleRecordsMutation.mutateAsync();
		} catch (error) {
		  console.error("Failed to create sample records:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h2" gutterBottom>
				Pokedex
			</Typography>
			<Button onClick={handleCreateSampleRecords} variant="contained" color="primary">
				Create Sample Data
			</Button>
			{/* <Button onClick={handleGetAllPokemon} variant="contained" color="primary">
				View Sample Data
			</Button> */}
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
