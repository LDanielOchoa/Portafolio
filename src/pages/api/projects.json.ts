export const GET = async () => {
    const proyectos = [
        {
            id: "01",
            nombre: "Aura Meditation",
            descripcion: "Plataforma de bienestar y mindfulness con audio espacial.",
            imagen: "/img/project_mobile.png",
            etiquetas: ["React Native", "Node.js"],
            year: "2024",
            link: "#",
        },
        {
            id: "02",
            nombre: "Nexus Analytics",
            descripcion: "Sistema de dashboard en tiempo real para big data financiero.",
            imagen: "/img/portfolio_hero.png",
            etiquetas: ["Next.js", "D3.js"],
            year: "2023",
            link: "#",
        },
        {
            id: "03",
            nombre: "Cipher Explorer",
            descripcion: "Interfaz experimental para navegación de modelos LLM.",
            imagen: "/img/project_mobile.png",
            etiquetas: ["Python", "WebGL"],
            year: "2023",
            link: "#",
        },
    ];

    return new Response(JSON.stringify(proyectos), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
