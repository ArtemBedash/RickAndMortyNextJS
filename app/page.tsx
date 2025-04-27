import CharacterList from "@/app/components/CharacterList";


async function getCharacters() {

    const response = await fetch("https://rickandmortyapi.com/api/character", {next: {revalidate: 60}})
    const data = await response.json()
    return data.results
}


export default async function Home() {
    const characters = await getCharacters()
    return (
        <CharacterList initialCharacters={characters} />
    );
}
