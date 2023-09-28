function footer() {
    return (
        <footer class="container  max-w-7xl mx-auto px-4 font-body undefined">
            <div class="fixed mt-7  w-full bg-orange-100 left-0 bottom-0  px-4 py-2 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                <nav class="flex flex-wrap justify-center -mx-5 -my-2">
                    <div class="flex px-5 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>

                        <a href="/" class="pl-2 leading-6 text-orange-600 no-underline font-bold text-lg font-serif animate-pulse hover:text-gray-900">
                            RIVER'S EDGE
                        </a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="/" class="leading-6 font-serif text-orange-600 no-underline font-bold  hover:text-gray-900">
                            Contact Us Now <span class="text-black font-serif animate-pulse text-lg"> - 077-1556157</span>
                        </a>
                    </div>

                </nav>

            </div>
        </footer>
    );
}

export default footer;