import { useState } from "react";

// custom hook universal function 
// Accepts a firstly defined default value
const useToggle = (defaultVal)=>{

    // set the defualt value
    const [value, setValue] = useState(defaultVal);

    // inside toggle function to toggle/change the value
    function toggleValue(val){

        // if function is directly passed just toggle/flip the value:
        if(typeof val != "boolean"){
            setValue(!value);
        }
        // otherwise set the value as per provided in the arg
        else{
            setValue(val);
        }

    }

    // the function returns the value and the function for toggling it 
    return [value, toggleValue];
}

export default useToggle;








