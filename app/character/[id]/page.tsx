import Image from "next/image";
import type {Metadata} from "next";


type Props = {
    params: Promise<{
        id: string
    }>
}

async function getData(id: string) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch character data");
    }

    return response.json();
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {id} = await params;
    const character = await getData(id);

    return {
        title: character.name,
    }


}



export default async function CharacterPage({params}: Props)     {
const {id} = await params
    const character = await getData(id);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">{character.name}</h1>
            <Image src={character.image}
                   alt={character.name}
                   width={300}
                   height={300}
                   className="w-full h-auto rounded-lg shadow-lg mb-4"/>
            <h2 className="text-xl text-center text-gray-600">{character.species}</h2>
        </div>
    );
}
