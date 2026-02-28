import { SimplePokemon } from '@/pokemons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PokemonsFavState {
    favorites: { [key: string]: SimplePokemon };
}

// const getInitialState = (): PokemonsFavState => {
//     // if ( typeof localStorage === 'undefined' ) return {};

//     const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}')
//     return favorites;
// }

const initialState: PokemonsFavState = {
    favorites: {},
    // '1': { id: '1', name: 'bulbasaur'},
    // '3': { id: '3', name: 'venusaur'},
    // '4': { id: '4', name: 'charmander'},
    // ...getInitialState(),
}

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        setFavoritePokemons( state, action: PayloadAction<{ [key: string]: SimplePokemon }>){
            state.favorites = action.payload;
        },

        toggleFavorite(state, action : PayloadAction<SimplePokemon>) {
            const pokemon = action.payload;
            const { id } = pokemon;

            if( !!state.favorites[id] ) {
                delete state.favorites[id]
                // return;
            } else {
                state.favorites[id] = pokemon;
            }

            //! Esto no se debe de hacer en Redux 
            localStorage.setItem('favorite-pokemons', JSON.stringify( state.favorites ));
        }
    }
});

export const { toggleFavorite, setFavoritePokemons } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;