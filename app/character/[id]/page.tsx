import Image from "next/image";
import type {Metadata} from "next";
import Link from "next/link";


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


export default async function CharacterPage({params}: Props) {
    const {id} = await params
    const character = await getData(id);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
            <Link href="/">
                <button
                    type="button"
                    className="mb-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    To The Main Page
                </button>
            </Link>

            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
                <Image
                    src={character.image}
                    alt={character.name}
                    width={150} // меньше картинка
                    height={150}
                    className="mx-auto rounded-full mb-4"
                />
                <h1 className="text-2xl font-bold mb-2">{character.name}</h1>
                <h2 className="text-lg text-gray-600">Species: {character.species}</h2>
                <h2 className="text-lg text-gray-600">Location: {character.location.name}</h2>
            </div>
        </div>
    );
}
