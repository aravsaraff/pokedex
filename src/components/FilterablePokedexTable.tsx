import { useState } from 'react';
import { trpc } from '../utils/trpc';
import { Box, CircularProgress, Typography } from '@mui/material';
import PokemonTypeSelection from './PokemonTypeSelection';
import PokedexTable from './PokedexTable';

const FilterablePokedexTable = () => {
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

  const getByTypeQuery = trpc.useQuery(['filterByType', {type: selectedType}], {
      enabled: !!selectedType
    }
  );

  return (
    <Box my={3}>
      <PokemonTypeSelection selectedType={selectedType} selectType={setSelectedType} />
      {getByTypeQuery.isLoading && <CircularProgress />}
      {getByTypeQuery.isError && <Typography color="error">Error fetching Pokemon data</Typography>}
      {getByTypeQuery.data && <PokedexTable pokemonArray={getByTypeQuery.data} />}
    </Box>
  );
};

export default FilterablePokedexTable;
