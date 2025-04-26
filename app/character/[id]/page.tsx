

type Props = {
    params: {
        id: string
    }
}


async function getData(id: string) {
    console.log(id)
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
        cache: "no-store",
    });
    return response.json();

}

export default async function CharacterPage({params: {id}}: Props) {
    const character = await getData(id);
  // проверка id

    return (

        <div>
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name}/>
            <h2>{character.origin.url}</h2>

        </div>
    );
}

