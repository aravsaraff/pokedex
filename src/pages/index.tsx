import React, { useState } from "react";
import { Container, Table, TableBody, TableContainer, Paper, Button } from "@mui/material";
import PokemonForm from "../components/PokemonForm";
import PokemonRow from "../components/PokemonRow";
import PokedexTable from "../components/PokedexTable";
import PokemonNamesForm from "../components/PokemonNamesForm";
import PokemonTypesForm from "../components/PokemonTypesForm";
import { trpc } from "../utils/trpc";
import { Pokemon } from "@prisma/client";

const IndexPage: React.FC = () => {
	const [pokemon, setPokemon] = useState<any>(null);
	const [pokemonName, setPokemonName] = useState<string>("");
	const [pokemonArrayByName, setPokemonArrayByName] = useState<any[]>([]);
	const [pokemonNames, setPokemonNames] = useState<string[]>([]);
	const [pokemonArrayByType, setPokemonArrayByType] = useState<any[]>([]);
	const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
	const [allPokemonArray, setAllPokemonArray] = useState<any[]>([]);

	const getAllPokemonQuery = trpc.useQuery(["getAll"], {
		enabled: false
	});

	const createSampleRecordsMutation = trpc.useMutation(["createSample"]);

	const pokemonResponse = trpc.useQuery(["get", { name: pokemonName }], {
		enabled: !!pokemonName,
	});

	const pokemonArrayByNameResponse = trpc.useQuery(["filterByName", { names: pokemonNames }], {
		enabled: !!pokemonNames.length,
	});

	const pokemonArrayByTypeResponse = trpc.useQuery(["filterByType", { types: pokemonTypes }], {
		enabled: !!pokemonTypes.length,
	});

	const handleGetAllPokemon = async () => {
		try {
		  // Call the query to get all Pokémon records
		  const pokemonRecords = await getAllPokemonQuery.refetch();
		  setAllPokemonArray(pokemonRecords.data || []);
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

	React.useEffect(() => {
		if (pokemonResponse.data) {
		  setPokemon(pokemonResponse.data);
		}
	}, [pokemonResponse.data]);

	const getPokemon = (pokemonName: string) => {
		setPokemonName(pokemonName);
	};

	React.useEffect(() => {
		if (pokemonArrayByNameResponse.data) {
			setPokemonArrayByName(pokemonArrayByNameResponse.data);
		}
	}, [pokemonArrayByNameResponse.data]);

	const getPokemonArrayByName = (pokemonNames: string[]) => {
		setPokemonNames(pokemonNames);
	};

	React.useEffect(() => {
		if (pokemonArrayByTypeResponse.data) {
			setPokemonArrayByType(pokemonArrayByTypeResponse.data);
		}
	}, [pokemonArrayByTypeResponse.data]);

	const getPokemonArrayByType = (pokemonTypes: string[]) => {
		setPokemonTypes(pokemonTypes);
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
			<PokemonForm onSubmit={getPokemon} />
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{pokemon && <PokemonRow pokemon={pokemon} />}
					</TableBody>
				</Table>
			</TableContainer>
			<PokemonNamesForm onSubmit={getPokemonArrayByName} />
			<PokedexTable pokemonArray={pokemonArrayByName} />
			<PokemonTypesForm onSubmit={getPokemonArrayByType} />
			<PokedexTable pokemonArray={pokemonArrayByType} />
		</Container>

	);
};

export default IndexPage;
