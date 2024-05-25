import { FC } from 'react';
import { useState } from 'react';
import { trpc } from "../utils/trpc";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
};

const PokemonTypeSelection: FC<PokemonTypeSelectionProps> = ({ selectedType, selectType }) => {
    const [types, setTypes] = useState<string[]>([]);
    const getAvailableTypesQuery = trpc.useQuery(['getAvailableTypes'],
    {
        enabled: true,
        onSuccess: (data) => setTypes(data)
    });

    const style: React.CSSProperties = {
        padding: "5px",
        margin: "8px"
    };

    return (
        <FormControl fullWidth>
            <InputLabel style={style}>Search by Type</InputLabel>
            <Select
                value={selectedType || ''}
                onChange={(e) => selectType(e.target.value || undefined)}
                style={style}
                variant="outlined"
            >
                {types?.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
    };

export default PokemonTypeSelection;
