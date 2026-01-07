import { useQuery } from '@tanstack/react-query';
import React, { useState, useMemo } from 'react';
import '../../styles/projects.css';

interface Project {
    id: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    etiquetas: string[];
    year: string;
    link: string;
}

const fetchProjects = async (): Promise<Project[]> => {
    const res = await fetch('/api/projects.json');
    if (!res.ok) throw new Error('Error fetching projects');
    return res.json();
};

export default function ProjectsList() {
    const [activeFilter, setActiveFilter] = useState('Todos');

    const { data, isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });

    // Calculate unique tags dynamically from data
    const filters = useMemo(() => {
        if (!data) return ['Todos'];
        const tags = new Set(data.flatMap(p => p.etiquetas));
        return ['Todos', ...Array.from(tags)];
    }, [data]);

    // Filter projects based on active selection
    const filteredProjects = useMemo(() => {
        if (!data) return [];
        if (activeFilter === 'Todos') return data;
        return data.filter(p => p.etiquetas.includes(activeFilter));
    }, [data, activeFilter]);

    if (isLoading) {
        return (
            <ul className="projects-stack">
                {[1, 2, 3].map((i) => (
                    <li key={i} className="project-item" style={{ opacity: 0.6, pointerEvents: 'none' }}>
                        <div className="project-meta">
                            <span className="project-id" style={{ background: '#ddd', color: 'transparent', borderRadius: 4 }}>00</span>
                            <div className="meta-tags" style={{ background: '#ddd', color: 'transparent', borderRadius: 4, width: 100 }}>Tags</div>
                        </div>
                        <div className="image-container" style={{ background: 'var(--glass-border)' }}></div>
                    </li>
                ))}
            </ul>
        );
    }

    if (error) return <div style={{ padding: '2rem', textAlign: 'center' }}>Error al cargar proyectos.</div>;

    return (
        <div className="projects-wrapper">
            {/* Interactive Filter Bar (Only possible easily because this is an Island) */}
            <div className="filter-bar reveal active">
                {filters.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setActiveFilter(tag)}
                        className={`filter-btn ${activeFilter === tag ? 'active' : ''}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <ul className="projects-stack">
                {filteredProjects.map((p) => (
                    <li key={p.id} className="project-item reveal active">
                        {/* 1. Imagen Grande */}
                        <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                            aria-label={`Ver caso de estudio: ${p.nombre}`}
                        >
                            <div className="image-container">
                                <div className="overlay-read" aria-hidden="true"></div>
                                <img
                                    src={p.imagen}
                                    alt={`Vista previa de la interfaz de ${p.nombre}`}
                                    className="project-img"
                                    loading="lazy"
                                    decoding="async"
                                    width="800"
                                    height="600"
                                />
                            </div>
                        </a>

                        {/* 2. Información Clara */}
                        <div className="project-info">
                            <div className="project-inner-meta">
                                <span className="project-id-text">{p.id}</span>
                                <time className="project-year-badge" dateTime={p.year}>{p.year}</time>
                            </div>

                            <div className="meta-tags-inline">{p.etiquetas.join(" — ")}</div>

                            <h3 className="project-title">{p.nombre}</h3>
                            <p className="project-desc">{p.descripcion}</p>

                            <a
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-arrow"
                                aria-label={`Ir al proyecto ${p.nombre}`}
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                >
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
