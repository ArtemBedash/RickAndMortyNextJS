"use client"

import Link from "next/link";
import {useEffect, useState} from "react";
import Image from "next/image";

type Character = {
    id: number;
    name: string;
    image: string;
};

export default function CharacterList({initialCharacters}: { initialCharacters: Character[] }) {

    const [page, setPage] = useState(1);
    const [characters, setCharacters] = useState<Character[]>(initialCharacters);

    const nextPage = () => {
        console.log(page)
        if (page < 42) {
            setPage(page + 1);
        }

    }
    const prevPage = () => {
        setPage(page - 1);
    }


    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await res.json();
            setCharacters(data.results)

        }
        getData()

    }, [page]);

    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-8">
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {characters.map((character) => (
                        <li
                            key={character.id}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition"
                        >
                            <Link href={`/character/${character.id}`}
                                  className="text-lg font-semibold mb-2 text-center hover:cursor-pointer hover:text-blue-500">
                                {character.name}
                            </Link>
                            <Image src={character.image}
                                alt={character.name}
                                   width={100}
                                   height={100}
                                className="w-32 h-32 rounded-full object-cover "
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    type="button"
                    onClick={prevPage}
                    disabled={page === 1}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Previous
                </button>
                <input type="number"
                       value={page}
                       min="1"
                       max="42"
                       onChange={(e) => {
                           const newValue = Number(e.currentTarget.value);
                           if ( newValue >= 1 && newValue <= 42) {
                               setPage(newValue);
                           }
                       }}
                       className="w-20 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"

                />
                <button
                    type="button"
                    onClick={nextPage}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

