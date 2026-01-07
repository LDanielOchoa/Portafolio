export const GET = async () => {
    const proyectos = [
        {
            id: "01",
            nombre: "Sitio Web SAO6",
            descripcion: "Diseño y desarrollo integral del portal institucional para Sistema Alimentador Oriental S.A.S. Optimización de rendimiento, arquitectura escalable y gestión de formularios estratégicos.",
            imagen: "/img/sao6_web.png",
            etiquetas: ["Arquitectura Web", "Rendimiento", "UI/UX"],
            year: "2025",
            link: "https://sao6.com.co/",
        },
    ];

    return new Response(JSON.stringify(proyectos), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
