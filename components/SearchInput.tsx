
'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if(pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500)
    }, [searchQuery, router, searchParams, pathname]);

    return (
      <div className="flex items-center gap-2 border border-black rounded-full px-3 h-9 w-full max-w-sm bg-white">
      <Image src="/icons/search.svg" alt="search" width={16} height={16} />
      <input
        type="text"
        placeholder="Search companions..."
        className="flex-1 bg-transparent text-sm text-black placeholder:text-gray-500 outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    )
}
export default SearchInput
