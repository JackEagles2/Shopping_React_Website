import React from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

interface FilterProps {

    setFilter: React.Dispatch<React.SetStateAction<boolean>>;
}
const Filter: React.FC<FilterProps> = ({setFilter }) => { {
    const handleClick = () => {
        setFilter(true);
    }

    return <FilterAltIcon onClick={handleClick} fontSize="large" />;
}};

export default Filter;