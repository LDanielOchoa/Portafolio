import React from 'react';
import QueryProvider from './QueryProvider';
import ProjectsList from './ProjectsList';

export default function ProjectsWrapper() {
    return (
        <QueryProvider>
            <ProjectsList />
        </QueryProvider>
    );
}
