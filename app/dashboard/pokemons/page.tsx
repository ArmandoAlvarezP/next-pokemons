import { PokemonsResponse, SimplePokemon } from "@/pokemons";
import { PokemonGrid } from "@/pokemons/components/PokemonGrid";



export const metadata = {
    title: 'Catálogo de Pokemones',
    description: 'Catálogo de Pokemones',
};


const getPokemons = async ( limit = 20, offset= 0) : Promise<SimplePokemon[]> => {
    const data: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then( res => res.json() );

        /**
         * Transforma y filtra una lista de Pokémon desde la API.
         * 
         * Mapea cada Pokémon extrayendo su ID de la URL (penúltimo segmento separado por /)
         * y su nombre, luego filtra aquellos con ID indefinido.
         * 
         * @remarks
         * - El ID se extrae de la URL del Pokémon usando `split('/')` y `at(-2)` para obtener el penúltimo elemento
         * - El operador `!` (non-null assertion) indica que el ID siempre existirá
         * - El filtro final es una medida de seguridad adicional
         * 
         * @example
         * // Input: { results: [{ name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" }] }
         * // Output: [{ id: "25", name: "pikachu" }]
         */
        const pokemons = data.results.map( pokemon => ({
            id: pokemon.url.split('/').at(-2)!,
            name: pokemon.name
        })).filter( pokemon => pokemon.id !== undefined)

    //throw new Error('Esto es un error que no debería de suceder');

    return pokemons;
}


export default async function PokemonsPage() {

    const pokemons = await getPokemons(151);

    return (

        <div className="flex flex-col">

            <span className="text-5xl my-2">Listado de Pokemons <small>estático</small></span>

                <PokemonGrid pokemons={pokemons} />
                
        </div>
    );
}