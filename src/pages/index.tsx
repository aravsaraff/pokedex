import React, { useState } from "react";
import { Container, Table, TableBody, TableContainer, Paper, Button } from "@mui/material";
import PokemonForm from "../components/PokemonForm";
import PokemonRow from "../components/PokemonRow";
import PokedexTable from "../components/PokedexTable";
import PokemonNamesForm from "../components/PokemonNamesForm";
import PokemonTypesForm from "../components/PokemonTypesForm";
import { trpc } from "../utils/trpc";

const IndexPage: React.FC = () => {
	const [pokemonName, setPokemonName] = useState<string>("");
	const [pokemonNames, setPokemonNames] = useState<string[]>([]);
	const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
	const [allPokemonArray, setAllPokemonArray] = useState<any[]>([]);

	const getAllPokemonQuery = trpc.useQuery(["getAll"], {
		enabled: false
	});

	const createSampleRecordsMutation = trpc.useMutation(["createSample"]);

	const getPokemonQuery = trpc.useQuery(["get", { name: pokemonName }], {
		enabled: !!pokemonName
	});

	const getPokemonArrayByNameQuery = trpc.useQuery(["filterByName", { names: pokemonNames }], {
		enabled: !!pokemonNames.length
	});

	const getPokemonArrayByTypeQuery = trpc.useQuery(["filterByType", { types: pokemonTypes }], {
		enabled: !!pokemonTypes.length
	});

	const handleGetAllPokemon = async () => {
		try {
		  // Call the query to get all Pokémon records
		  const { data, error, isLoading } = await getAllPokemonQuery.refetch();
			// const pokemonRecords = await trpc.useQuery(['getAll']).refetch();
		  data && setAllPokemonArray(data || []);
		} catch (error) {
		  console.error("Failed to get all Pokémon records:", error);
		}
	  };

	const handleCreateSampleRecords = async () => {
		try {
		  // Call the mutation to create sample records
		  await createSampleRecordsMutation.mutateAsync();
		} catch (error) {
		  console.error("Failed to create sample records:", error);
		}
	};

	const handleGetPokemon = (formInput: string) => {
		setPokemonName(formInput)
	}

	const handleGetPokemonArrayByName = (formInput: string[]) => {
		setPokemonNames(formInput);
	};

	const handleGetPokemonArrayByType = (formInput: string[]) => {
		setPokemonTypes(formInput);
	};

	return (
		<Container>
			<Button onClick={handleCreateSampleRecords} variant="contained" color="primary">
				Create Sample Data
			</Button>
			<Button onClick={handleGetAllPokemon} variant="contained" color="primary">
				View Sample Data
			</Button>
			<PokedexTable pokemonArray={allPokemonArray} />
			<PokemonForm onSubmit={handleGetPokemon} />
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{getPokemonQuery.data && <PokemonRow pokemon={getPokemonQuery.data!} />}
					</TableBody>
				</Table>
			</TableContainer>
			<PokemonNamesForm onSubmit={handleGetPokemonArrayByName} />
			<PokedexTable pokemonArray={getPokemonArrayByNameQuery.data!} />
			<PokemonTypesForm onSubmit={handleGetPokemonArrayByType} />
			<PokedexTable pokemonArray={getPokemonArrayByTypeQuery.data!} />
		</Container>

	);
};

export default IndexPage;
